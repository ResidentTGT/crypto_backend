import { Controller, Get, Param } from '@nestjs/common';
import { BlastService } from './blast.service';

@Controller('blast')
export class BlastController {
    constructor(private readonly blastService: BlastService) {}

    @Get('leaderboard')
    async getLeaderboard(): Promise<string> {
        return this.blastService.getLeaderboard();
    }

    @Get('predictfun/leaderboard/:seasonId')
    async getPredictFunLeaderboard(@Param('seasonId') seasonId): Promise<any[]> {
        return this.blastService.getPredictFunLeaderboard(seasonId);
    }
}
