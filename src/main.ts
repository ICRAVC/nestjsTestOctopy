import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setVersion('0.0.1')
    .setTitle('api-test')
    .addBearerAuth()
    .build();

  const document: any = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions:{defaultModelsExpandDepth: -1}
  });
  await app.listen(AppModule.port);
}
bootstrap();
