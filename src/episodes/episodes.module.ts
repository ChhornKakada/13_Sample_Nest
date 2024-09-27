import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [ConfigService],
  controllers: [EpisodesController],
  providers: [EpisodesService]
})
export class EpisodesModule {}
