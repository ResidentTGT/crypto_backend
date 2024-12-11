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

    async getPredictFunLeaderboard(seasonId: number): Promise<any[]> {
        const leaderboard = [];
        let cursor;
        while (leaderboard.length === 0 || cursor) {
            const data = await firstValueFrom(
                this.httpService
                    .post<any>(
                        'https://graphql.predict.fun/graphql',
                        {
                            query: 'query GetSeasonLeaderboard($seasonId: Int!, $pagination: ForwardPaginationInput) {\n  season(id: $seasonId) {\n    leaderboard(pagination: $pagination) {\n      pageInfo {\n        hasNextPage\n        startCursor\n        endCursor\n      }\n      edges {\n        cursor\n        node {\n          dailyRank\n          multiplier\n          dailyPoints\n          seasonPoints\n          epochPoints\n          account {\n            walletId\n            name\n            imageUrl\n            address\n          }\n        }\n      }\n    }\n  }\n}',
                            variables: {
                                seasonId: seasonId,
                                pagination: {
                                    first: 150,
                                    after: cursor,
                                },
                            },
                            operationName: 'GetSeasonLeaderboard',
                        },
                        {
                            headers: {
                                'user-agent':
                                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                                'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                                referer: 'https://predict.fun/',
                                'content-type': 'application/json',
                            },
                        },
                    )
                    .pipe(map((r) => r.data.data.season.leaderboard)),
            );

            leaderboard.push(...data.edges);
            if (data.edges.length === 150) {
                cursor = data.pageInfo.endCursor;
            } else {
                cursor = undefined;
            }
        }

        return leaderboard;
    }
}
