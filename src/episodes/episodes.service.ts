import { Injectable } from '@nestjs/common';
import { Episode } from './entity/Episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  // * find all
  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);
    return sort === 'asc' 
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  // * find features
  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  // * find one
  async findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  // * create
  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = {...createEpisodeDto, id: randomUUID()};
    this.episodes.push(newEpisode);
  }
}
