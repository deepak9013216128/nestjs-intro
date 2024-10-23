import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";
import { TagsService } from "src/tags/providers/tags.service";

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async create(createPostDto: CreatePostDto) {
    // find author
    const author = await this.userService.findOneById(createPostDto.authorId);

    if (!author) {
      return {
        message: "Not authorized",
      };
    }

    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
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
    const posts = await this.postRepository.find();
    return posts;
  }

  async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
