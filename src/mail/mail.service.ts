import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from 'src/contact/dto/create-contact.dto';
import { contactNotificationTemplate } from './templates/contact-notification.template';

@Injectable()
export class MailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });
  }

  async sendContactNotification(dto: CreateContactDto) {
    const adminEmail = this.config.get('SMTP_FROM_EMAIL'); // send to yourself

    return this.transporter.sendMail({
      from: `"CDY Agency Website" <${this.config.get('SMTP_FROM_EMAIL')}>`,
      to: adminEmail,
      subject: `New contact message: ${dto.subject || 'No subject'}`,
      html: contactNotificationTemplate(dto),
    });
  }
}