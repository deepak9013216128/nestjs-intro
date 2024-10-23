import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class patchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: "The ID of post that need to updated",
  })
  @IsNotEmpty()
  @IsInt()
  id: string;
}
