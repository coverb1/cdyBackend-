import { Injectable } from '@nestjs/common';
import { CreateContentCreatorDto } from './dto/create-content-creator.dto';
import { UpdateContentCreatorDto } from './dto/update-content-creator.dto';
import { PrismaService } from 'src/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ContentCreatorService {
  constructor(private prisma: PrismaService) {}

  // create Creator
  create(createContentCreatorDto: CreateContentCreatorDto, profileImage?: string) {
    const slug = slugify(createContentCreatorDto.name);

    return this.prisma.creator.create({
      data: {
        ...createContentCreatorDto,
        profileImage,
        slug,
      },
    });
  }

  // get all creators
  findAll() {
    return this.prisma.creator.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // find by slug
  findBySlug(slug: string) {
    return this.prisma.creator.findUnique({
      where: { slug },
    });
  }

  // find by id
  findOne(id: number) {
    return this.prisma.creator.findUnique({
      where: { id },
    });
  }

  update(id: number, updateContentCreatorDto: UpdateContentCreatorDto) {
    return this.prisma.creator.update({
      where: { id },
      data: {
        ...updateContentCreatorDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.creator.delete({
      where: { id },
    });
  }
}