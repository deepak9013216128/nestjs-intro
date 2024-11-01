import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @Optional()
  //   @Type(() => Number)
  limit?: number = 10;

  @IsPositive()
  @Optional()
  //   @Type(() => Number)
  page?: number = 1;
}
