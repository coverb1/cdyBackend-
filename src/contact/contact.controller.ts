import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // public: normal user sends a message from the website
  @Post('UserSendMessage')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  // admin: get all notifications
  // TODO: add @UseGuards(AdminGuard) once your admin auth is ready
  @Get('AdminAllnotifications')
  findAll() {
    return this.contactService.findAll();
  }

  // admin: get one notification
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(id);
  }

  // admin: mark as read
  @Patch(':id/read')
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.markAsRead(id);
  }

  // admin: delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(id);
  }
}