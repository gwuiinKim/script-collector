import { Controller, Get, Param } from '@nestjs/common';
import { KbsService } from './kbs.service';

@Controller('kbs')
export class KbsController {
    constructor(private readonly kbsService: KbsService){}
    
    @Get(":date")
    getByDate(@Param("date") date:string) {
        return this.kbsService.getByDate(date);
    }
}
