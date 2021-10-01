import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonCreateDto } from './pokemon.dto';
import { PokemonEntity } from './pokemon.schema';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  getPokemons(@Param() params: { name: string }): string {
    return 'This returns the list of Pokemons';
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postPokemon(
    @Body() postedPokemon: PokemonCreateDto,
  ): Promise<PokemonEntity> {
    return this.pokemonService.store(postedPokemon);
  }
}
