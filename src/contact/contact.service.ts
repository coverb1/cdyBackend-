import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  // called when a normal user submits the contact form
  async create(createContactDto: CreateContactDto) {
    const message = await this.prisma.contactMessage.create({
      data: { ...createContactDto },
    });

    // fire-and-forget so a slow SMTP server doesn't delay the response
    this.mailService.sendContactNotification(createContactDto).catch((err) => {
      console.error('Failed to send contact notification email:', err);
    });

    return message;
  }

  // admin: list all notifications
  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // admin: view one message
  async findOne(id: number) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  // admin: mark as read
  markAsRead(id: number) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  // admin: delete a message
  remove(id: number) {
    return this.prisma.contactMessage.delete({ where: { id } });
  }
}