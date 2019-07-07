import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_CONFIG, IMAGE_PATH } from './shared/constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors(CORS_CONFIG);
    app.useStaticAssets(join(__dirname, '..', IMAGE_PATH));

    await app.listen(3000);
}

bootstrap();
