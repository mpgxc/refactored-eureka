import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Clean Arquiteture Aproach!')
    .setDescription('ShortLy API')
    .setVersion('1.0')
    .addTag('links')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT || 3000);
})();
