import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[
    JwtModule.register({
      secret:'secretKey',
      signOptions:{expiresIn:'1D'}
    }),

    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        port:587,
        auth:{
          user:'cboy85096@gmail.com',
pass:'zbzu rcii nqoy yxkd'
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
})
export class AuthModule {}
