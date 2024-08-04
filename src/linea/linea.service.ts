import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class LineaService {
    constructor(private readonly httpService: HttpService) {}

    async getPoh(wallet: string): Promise<any> {
        const data = await firstValueFrom(
            this.httpService.get<string>(`https://linea-xp-poh-api.linea.build/poh/${wallet}`).pipe(map((r) => r.data)),
        );
        return data;
    }
}
