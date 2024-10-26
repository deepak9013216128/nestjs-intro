import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    // find author
    const author = await this.userService.findOneById(createPostDto.authorId);

    if (!author) {
      return {
        message: 'Not authorized',
      };
    }

    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    console.log(createPostDto);
    // create post
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    // return post to the user

    return await this.postRepository.save(post);
  }

  async findAll(userId: string) {
    const posts = await this.postRepository.find({
      relations: {
        // tags: true
      },
    });
    return posts;
  }

  async update(patchPostDto: PatchPostDto) {
    // find tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    // find post
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });
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
    return await this.postRepository.save(post);
  }

  async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
