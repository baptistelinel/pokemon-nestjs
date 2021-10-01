import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
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

  @Get()
  getPokemons(): Promise<PokemonEntity[]> {
    return this.pokemonService.getList();
  }

  @Get(':name')
  getOnePokemon(@Param() params: { name: string }): Promise<PokemonEntity> {
    return this.pokemonService.getOne(params.name);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postPokemon(
    @Body() postedPokemon: PokemonCreateDto,
  ): Promise<PokemonEntity> {
    return this.pokemonService.store(postedPokemon);
  }

  @Delete(':name')
  deleteOnePokemon(@Param() params: { name: string }) {
    return this.pokemonService.deleteOne(params.name);
  }
}
