import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMetaOptionsDto } from 'src/meta-options/dtos/create-post-meta-options.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'this is title of post',
    example: 'this is title',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: "possible value are 'post', 'page', 'story', 'series'",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'For Example - "my-url"',
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiPropertyOptional({
    description:
      'Serialize your json object else a validation error will be thrown',
    example: '{"url":"http://google.com"}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'image url',
    example: 'http://google.com',
  })
  @IsUrl()
  @MaxLength(1024)
  @IsOptional()
  featuredImageUrl?: string;

  @ApiProperty({
    enum: postStatus,
    description: 'Possible values are "draft", "schedule","review","published"',
  })
  @IsEnum(postStatus)
  status: postStatus;

  @ApiPropertyOptional({
    description: 'this is content of post',
    example: 'this is content of my blog post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'this is date on blog post published',
    example: '2024-01-01',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passes as string',
    example: ['nestjs', 'typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'meta value is json string',
          example: '{"sidebarEnalbed": true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions?: CreateMetaOptionsDto | null;

  @ApiProperty({ type: 'integer', required: true, example: 1 })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
