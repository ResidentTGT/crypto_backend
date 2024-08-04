import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlastModule } from './blast/blast.module';
import { LineaModule } from './linea/linea.module';

@Module({
    imports: [BlastModule, LineaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
