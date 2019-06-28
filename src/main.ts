import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionLogger } from './shared/loggers/exception.logger';
import { ORIGIN } from './shared/constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ExceptionLogger(),
        cors: { credentials: true, origin: ORIGIN, optionsSuccessStatus: 200 },
    });

    await app.listen(3000);
}

bootstrap();
