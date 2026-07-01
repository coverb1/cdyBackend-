import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.config';
import type { Express } from 'express';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly cloudinaryservice:CloudinaryService
  ) {}

  @Post()
@UseInterceptors(FileInterceptor('coverImage'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      tittle: { type: 'string' },
      category: { type: 'string' },
      excerpt: { type: 'string' },
      content: { type: 'string' },
      authorId: { type: 'string' },
      published: { type: 'boolean' },
      coverImage: { type: 'string', format: 'binary' },
    },
  },
})
async create(
  @Body() createNewsDto: CreateNewsDto,
  @UploadedFile() file: any
) {
  const imageUrl = await this.cloudinaryservice.uploadImage(file);
  return this.newsService.create(createNewsDto, imageUrl);
}

  @Get('AllNews')
  findAll() {
return this.newsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newsService.findById(id)
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newsService.findById(id);
  }
}
