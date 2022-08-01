import { Module } from '@nestjs/common';
import { KbsController } from './kbs/kbs.controller';
import { KbsService } from './kbs/kbs.service';

@Module({
  imports: [],
  controllers: [ KbsController],
  providers: [ KbsService],
})
export class AppModule {}
