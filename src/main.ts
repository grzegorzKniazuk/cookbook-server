import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionLogger } from './shared/loggers/exception.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ExceptionLogger(),
        cors: { credentials: true, origin: 'http://localhost:4200', optionsSuccessStatus: 200 },
    });

    await app.listen(3000);
}

bootstrap();
