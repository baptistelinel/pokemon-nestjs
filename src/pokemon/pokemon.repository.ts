import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PokemonCreateDto } from './pokemon_create.dto';
import { PokemonEntity } from './pokemon.schema';
import { PokemonUpdateDto } from './pokemon_update.dto';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectModel(PokemonEntity.name)
    private readonly pokemonEntity: Model<PokemonEntity>,
  ) {}

  async deleteOneInDatabase(name: string) {
    return this.pokemonEntity.findOneAndDelete({ name });
  }

  async storeInDatabase(
    postedPokemon: PokemonCreateDto,
  ): Promise<PokemonEntity> {
    return this.pokemonEntity.create(postedPokemon);
  }

  async getListFromDatabase(): Promise<PokemonEntity[]> {
    return this.pokemonEntity.find();
  }

  async getOneFromDatabase(name: string): Promise<PokemonEntity> {
    return this.pokemonEntity.findOne({ name });
  }

  async updateOneFromDatabase(
    name: string,
    update: PokemonUpdateDto,
  ): Promise<PokemonEntity> {
    return this.pokemonEntity.findOneAndUpdate({ name }, update, { new: true });
  }
}
