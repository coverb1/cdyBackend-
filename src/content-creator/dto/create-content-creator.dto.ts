import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContentCreatorDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string ;

  @IsOptional()
  @IsString()
  instagramUsername?: string;

  @IsOptional()
  @IsString()
  instagramFollowers?: string;

  @IsOptional()
  @IsString()
  tiktokUsername?: string;

  @IsOptional()
  @IsString()
  tiktokFollowers?: string;

  @IsOptional()
  @Transform(({value})=>value==='true'||value===true)
  @IsBoolean()
  verified?: boolean;
}