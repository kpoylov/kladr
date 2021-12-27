import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kladr api')
    .setDescription('Сервис по построению адресов кладр')
    .setVersion('1.0')
    .addTag('Kladr')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/app', app, document);

  await app.listen(3000);
}
bootstrap();