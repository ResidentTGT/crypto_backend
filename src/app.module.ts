import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlastModule } from './blast/blast.module';

@Module({
    imports: [BlastModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
