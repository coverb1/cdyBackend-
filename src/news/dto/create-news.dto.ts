import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateNewsDto {
    @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tittle!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  excerpt!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content!: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // coverImage!: string;

@ApiProperty()
  @IsNotEmpty()
  @IsString()
  authorId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({value})=>value==='true'||value===true)
  @IsBoolean()
  published!: boolean;
}