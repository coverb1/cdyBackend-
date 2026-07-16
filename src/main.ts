import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:3001'
  })
  app.useGlobalPipes(new ValidationPipe({transform:true}))
  const config=new DocumentBuilder()
  .setTitle('NewsAPI')
  .setDescription('APi for managing  news')
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`App is running on: http://localhost:${port}`);
  console.log(`Swagger is available on: http://localhost:${port}/api`);
}
bootstrap();
