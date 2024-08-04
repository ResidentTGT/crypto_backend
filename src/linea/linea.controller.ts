import { Controller, Get, Param } from '@nestjs/common';
import { LineaService } from './linea.service';

@Controller('linea')
export class LineaController {
    constructor(private readonly lineaService: LineaService) {}

    @Get('poh/:wallet')
    getPoh(@Param('wallet') wallet: string): Promise<any> {
        return this.lineaService.getPoh(wallet);
    }
}
