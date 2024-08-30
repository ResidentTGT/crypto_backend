import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const whitelist = ['https://crypto-resident.web.app/'];

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
    });
    app.enableCors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
        methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
    });
    await app.listen(3001);
}
bootstrap();
