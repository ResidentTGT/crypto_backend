import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const whitelist = ['*'];

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
    });
    app.enableCors({
        origin: function (origin, callback) {
            console.log(origin);
            if (whitelist.indexOf(origin) !== -1) {
                console.log('allowed cors for:', origin);
                callback(null, true);
            } else {
                console.log('blocked cors for:', origin);
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
