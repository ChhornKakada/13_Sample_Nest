import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [EpisodesModule, ConfigModule, TopicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
