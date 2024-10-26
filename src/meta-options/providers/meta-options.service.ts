import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  async create(createMetaOptionsDto: CreateMetaOptionsDto) {
    const metaOption = this.metaOptionsRepository.create(createMetaOptionsDto);

    return await this.metaOptionsRepository.save(metaOption);
  }
}
