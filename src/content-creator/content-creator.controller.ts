import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ContentCreatorService } from './content-creator.service';
import { CreateContentCreatorDto } from './dto/create-content-creator.dto';
import { UpdateContentCreatorDto } from './dto/update-content-creator.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.config';

@Controller('content-creator')
export class ContentCreatorController {
  constructor(
    private readonly contentCreatorService: ContentCreatorService,
    private readonly cloudinaryservice: CloudinaryService,
  ) { }

  @Post('CreateCreator')
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        category: { type: 'string' },
        instagramUsername: { type: 'string' },
        instagramFollowers: { type: 'string' },
        tiktokUsername: { type: 'string' },
        tiktokFollowers: { type: 'string' },
        verified: { type: 'boolean' },
        profileImage: { type: 'string', format: 'binary' },
      },
    },
  })
  async create(
    @Body() createContentCreatorDto: CreateContentCreatorDto,
    @UploadedFile() file: any,
  ) {
    const imageUrl = file
      ? await this.cloudinaryservice.uploadImage(file)
      : undefined;
    return this.contentCreatorService.create(createContentCreatorDto, imageUrl);
  }

  @Get('AllCreators')
  findAll() {
    return this.contentCreatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentCreatorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContentCreatorDto: UpdateContentCreatorDto,
  ) {
    return this.contentCreatorService.update(id, updateContentCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentCreatorService.remove(id);
  }
}