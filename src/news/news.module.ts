import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.config';

@Module({
  controllers: [NewsController],
  providers: [NewsService,PrismaService,CloudinaryService],
})
export class NewsModule {}
