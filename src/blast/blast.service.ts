import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class BlastService {
    constructor(private readonly httpService: HttpService) {}

    async getLeaderboard(): Promise<string> {
        const data = await firstValueFrom(
            this.httpService.get<string>('https://waitlist-api.prod.blast.io/v1/s3/custom-dapps').pipe(map((r) => r.data)),
        );
        return data;
    }
}
