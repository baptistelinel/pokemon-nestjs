import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonCreateDto } from './pokemon.dto';
import { PokemonRepository } from './pokemon.repository';
import { PokemonEntity } from './pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async deleteOne(name: string): Promise<PokemonEntity> {
    const pokemonDeleted = await this.pokemonRepository.deleteOneInDatabase(
      name,
    );
    if (null === pokemonDeleted) {
      throw new BadRequestException(`Unkwown pokemon with name ${name}`);
    }
    return pokemonDeleted;
  }

  async getList(): Promise<PokemonEntity[]> {
    return this.pokemonRepository.getListFromDatabase();
  }

  async getOne(name: string): Promise<PokemonEntity> {
    const pokemon = await this.pokemonRepository.getOneFromDatabase(name);
    if (!pokemon) {
      throw new BadRequestException(`Unkwown pokemon with name ${name}`);
    }
    return pokemon;
  }

  async store(postedPokemon: PokemonCreateDto): Promise<PokemonEntity> {
    const pokemon = await this.pokemonRepository.getOneFromDatabase(
      postedPokemon.name,
    );
    if (pokemon) {
      throw new BadRequestException(
        `A pokemon with ${postedPokemon.name}  already exists.`,
      );
    }
    return this.pokemonRepository.storeInDatabase(postedPokemon);
  }
}
