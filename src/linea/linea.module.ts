import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LineaController } from './linea.controller';
import { LineaService } from './linea.service';

@Module({
    imports: [HttpModule],
    providers: [LineaService],
    controllers: [LineaController],
})
export class LineaModule {}
