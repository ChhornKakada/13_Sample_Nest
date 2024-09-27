import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {

  constructor(
    private episodesService: EpisodesService, 
    private configService: ConfigService,
  ) {};

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return {
      status: true,
      data: this.episodesService.findAll()
    };
  }

  @Get('featured')
  findFeatured() {
    return {
      status: true,
      data: this.episodesService.findFeatured()
    };
  }

  @Get(":id")
  findOne(@Param() id: string) {
    return {
      status: true,
      data: this.episodesService.findOne(id)
    };
  }

  @Post()
  create(@Body() input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
