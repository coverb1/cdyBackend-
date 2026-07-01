import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthorService {
  constructor(
    private prisma:PrismaService
  ){}
  create(createAuthorDto: CreateAuthorDto) {
return this.prisma.author.create({
data:createAuthorDto
})
  }

  findAll() {
   return this.prisma.author.findMany({
    include:{posts:true}
   })
  }

  findOne(id: string) {
    return this.prisma.author.findUnique({
      where:{id},
      include:{posts:true}
    })
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
return this.prisma.author.update({
  where:{id},
  data:{
    ...updateAuthorDto
  }
})
  }

  remove(id: string) {
   return this.prisma.author.delete({
    where:{id}
   })
  }


}
