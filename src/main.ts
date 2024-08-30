import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const whitelist = ['https://crypto-resident.web.app/'];

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            allowedHeaders: '*',
            methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
            credentials: true,
        },
    });

    await app.listen(3001);
}
bootstrap();
