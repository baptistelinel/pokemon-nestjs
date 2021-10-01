import { Injectable } from '@nestjs/common';
import { PokemonCreateDto } from './pokemon.dto';
import { PokemonRepository } from './pokemon.repository';
import { PokemonEntity } from './pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async store(postedPokemon: PokemonCreateDto): Promise<PokemonEntity> {
    // Don't add new pokemon that already exists in db.
    return this.pokemonRepository.storeInDatabase(postedPokemon);
  }
}
