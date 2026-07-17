import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NewsService } from './news/news.service';
import { NewsModule } from './news/news.module';
import { ContentCreatorModule } from './content-creator/content-creator.module';
import { ContactModule } from './contact/contact.module';


@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule,
    NewsModule,
    ContentCreatorModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
 
})
export class AppModule {}
