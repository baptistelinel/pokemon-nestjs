import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonCreateDto } from './pokemon.dto';
import { PokemonRepository } from './pokemon.repository';
import { PokemonEntity } from './pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

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
