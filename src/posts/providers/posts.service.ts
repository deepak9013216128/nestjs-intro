import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async create(createPostDto: CreatePostDto) {
    // find author
    let author = undefined,
      tags = undefined;
    try {
      author = await this.userService.findOneById(createPostDto.authorId);
    } catch (error) {
      throw new ForbiddenException('Not authorized');
    }

    try {
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }
    console.log(tags, tags.length, createPostDto.tags.length);
    if (!tags || tags.length !== createPostDto.tags.length) {
      throw new BadRequestException(
        'please check your tags ids and ensure they are correct',
      );
    }

    // create post
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    // return post to the user

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: error,
        },
      );
    }
    return post;
  }

  async findAll(
    userId: string,
    postQuery: GetPostsDto,
  ): Promise<Paginated<Post>> {
    let posts = undefined;
    try {
      posts = await this.paginationProvider.paginateQuery(
        { limit: postQuery.limit, page: postQuery.page },
        this.postRepository,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }
    return posts;
  }

  async update(patchPostDto: PatchPostDto) {
    // find tags
    let tags = undefined,
      post = undefined;

    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'please check your tags ids and ensure they are correct',
      );
    }

    // find post
    try {
      post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }
    if (!post) {
      throw new BadRequestException('Post does not exist');
    }

    // update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.schema = patchPostDto.schema ?? post.schema;
    // post.metaOptions = patchPostDto.metaOptions ?? post.metaOptions;

    // assign the new tags
    post.tags = tags;

    // save the post and return
    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }
    return post;
  }

  async delete(id: number) {
    try {
      await this.postRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }

    return { deleted: true, id };
  }
}
