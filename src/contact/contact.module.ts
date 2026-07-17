import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from 'src/prisma.service';
import {MailService} from 'src/mail/mail.service'

@Module({
  controllers: [ContactController],
  providers: [ContactService,PrismaService,MailService],
})
export class ContactModule {}
