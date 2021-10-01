import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PokemonCreateDto } from './pokemon.dto';
import { PokemonEntity } from './pokemon.schema';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectModel(PokemonEntity.name)
    private readonly pokemonEntity: Model<PokemonEntity>,
  ) {}

  async storeInDatabase(
    postedPokemon: PokemonCreateDto,
  ): Promise<PokemonEntity> {
    return this.pokemonEntity.create(postedPokemon);
  }
}
