import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('episodes')
export class EpisodesController {

  constructor(
    private episodesService: EpisodesService, 
  ) {};

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number,
  ) {
    return {
      status: true,
      data: this.episodesService.findAll(),
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
  async findOne(@Param() id: string)  {
    console.log(id);
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found')
    }
    return {
      data: episode
    }
  }

  @Post()
  // * used validationPipe in @Body to valid the createEpisodeDto
  async create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return await this.episodesService.create(input);
  }
}
