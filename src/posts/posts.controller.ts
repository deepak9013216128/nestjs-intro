import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get(':userId?')
  getPosts(@Param('userId') userId: string, @Query() postQuery: GetPostsDto) {
    console.log(postQuery);
    return this.postService.findAll(userId, postQuery);
  }

  @ApiOperation({
    summary: 'Create new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'you get 201 response if your post is created successfully ',
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Update an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'you get 200 response if your post is updated successfully ',
  })
  @Patch()
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.update(patchPostDto);
  }

  @Delete()
  deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
