import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
    const keyFile = fs.readFileSync(__dirname + '/../ssl/cert.key');
    const certFile = fs.readFileSync(__dirname + '/../ssl/cert.crt');
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            allowedHeaders: '*',
            methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
            credentials: true,
        },
        httpsOptions: {
            key: keyFile,
            cert: certFile,
        },
    });

    await app.listen(3001);
}
bootstrap();
