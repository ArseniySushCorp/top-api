import { TopPageService } from './../top-page/top-page.service';
import { HhService } from './hh.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [HhService, TopPageService],
})
export class HhModule {}
