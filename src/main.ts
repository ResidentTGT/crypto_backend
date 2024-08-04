import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotException } from '@nestjs/common';
const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:8000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://10.0.2.2:3000',
];

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
            origin: function (origin, callback) {
                if (!origin) {
                    callback(null, true);
                    return;
                }
                if (
                    whitelist.includes(origin) || // Checks your whitelist
                    !!origin.match(/yourdomain\.com$/) // Overall check for your domain
                ) {
                    console.log('allowed cors for:', origin);
                    callback(null, true);
                } else {
                    console.log('blocked cors for:', origin);
                    callback(new ImATeapotException('Not allowed by CORS'), false);
                }
            },
        },
    });
    await app.listen(3001);
}
bootstrap();
