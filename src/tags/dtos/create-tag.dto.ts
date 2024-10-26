import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1024)
  @IsUrl()
  featuredImageUrl?: string;
}
