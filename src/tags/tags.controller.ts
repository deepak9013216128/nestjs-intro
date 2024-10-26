import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Delete()
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }

  @Delete('soft-delete')
  softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.softDelete(id);
  }
}
