import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const whitelist = ['*'];

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
    });
    app.enableCors({
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: whitelist,
    });
    await app.listen(3001);
}
bootstrap();
