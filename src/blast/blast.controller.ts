import { Controller, Get } from '@nestjs/common';
import { BlastService } from './blast.service';

@Controller('blast')
export class BlastController {
    constructor(private readonly blastService: BlastService) {}

    @Get('leaderboard')
    getLeaderboard(): Promise<string> {
        return this.blastService.getLeaderboard();
    }
}
