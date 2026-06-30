import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('createNews')
  create(@Body() createNewsDto: CreateNewsDto) {
   return this.newsService.create(createNewsDto)
  }

  @Get()
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
