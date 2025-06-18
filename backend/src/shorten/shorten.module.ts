import { Module } from '@nestjs/common';
import { ShortenController } from './shorten.controller';
import { ShortenService } from './shorten.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shorten } from './models/shorten.model';
import { ShortenLog } from './models/shorten-logs.model';

@Module({
  controllers: [ShortenController],
  providers: [ShortenService],
  imports: [SequelizeModule.forFeature([ Shorten, ShortenLog ])]
})

export class ShortenModule {}