import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonCreateDto } from './pokemon_create.dto';
import { PokemonEntity } from './pokemon.schema';
import { PokemonUpdateDto } from './pokemon_update.dto';

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
  postPokemon(@Body() postedPokemon: PokemonCreateDto): Promise<PokemonEntity> {
    return this.pokemonService.store(postedPokemon);
  }

  @Delete(':name')
  deleteOnePokemon(@Param() params: { name: string }): Promise<PokemonEntity> {
    return this.pokemonService.delete(params.name);
  }

  @Put(':name')
  @UsePipes(new ValidationPipe())
  updateOnePokemon(
    @Param() params: { name: string },
    @Body() update: PokemonUpdateDto,
  ): Promise<PokemonEntity> {
    return this.pokemonService.update(params.name, update);
  }
}
