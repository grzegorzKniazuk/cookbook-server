import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImagePath } from './shared/constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({ credentials: true, origin: true, optionsSuccessStatus: 200 });
    app.useStaticAssets(join(__dirname, '..', ImagePath));

    await app.listen(3000);
}

bootstrap();
