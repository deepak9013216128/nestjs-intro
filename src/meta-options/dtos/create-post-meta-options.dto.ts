import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
