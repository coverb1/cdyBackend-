import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  tittle!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsString()
  excerpt!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  coverImage!: string;

  @IsNotEmpty()
  @IsString()
  authorId!: string;

  @IsNotEmpty()
  @IsBoolean()
  published!: boolean;
}