import { Module } from '@nestjs/common';
import { BlastService } from './blast.service';
import { BlastController } from './blast.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [BlastService],
    controllers: [BlastController],
})
export class BlastModule {}
