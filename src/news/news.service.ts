import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'src/prisma.service';
import slugify from 'slugify';

@Injectable()
export class NewsService {
  constructor(
    private prisma: PrismaService
  ) { }

  //create News
  create(createNewsDto: CreateNewsDto,coverImage:string) {
    const slug = slugify(createNewsDto.tittle);
    const readingTime = Math.ceil(
      createNewsDto.content.split(' ').length / 200); //How many minutes will it take someone to read this article
    return this.prisma.news.create({
      data: {
        ...createNewsDto,
        coverImage,
        slug,
        readingTime,
        publishedAt: createNewsDto.published ? new Date() : null
      }
    });
  }


  // get all Pusblished Post
  findAll() {
    return this.prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'asc' }
    })
  }

  //findByslug
  findByslug(slug: string) {
    return this.prisma.news.findUnique({
      where: { slug },
    })
  }

  //delete news

  delete(id: number) {
    return this.prisma.news.delete({
      where: { id }
    })
  }

  findById(id:number){
    return this.prisma.news.findUnique({
      where:{id}
    })
  }

  update(id:number,updateNewsDto:UpdateNewsDto){
    return this.prisma.news.update({
      where:{id},
      data:{
      ...updateNewsDto
      }
    })
  }
}
