import { Injectable } from '@nestjs/common';

@Injectable()
export class KbsService {
    getByDate(date:string):string[] {
        return ["hi"];
    }
}
