import { IsArray, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'user',
    },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
