import { ConfigModule } from '@nestjs/config';
import { HhService } from './hh.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import getHhConfig from 'src/configs/hh.config';

@Module({
  providers: [HhService],
  imports: [HttpModule.registerAsync({ imports: [ConfigModule], useFactory: getHhConfig })],
  exports: [HhService],
})
export class HhModule {}
