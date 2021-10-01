import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonRepository } from './pokemon.repository';
import { PokemonEntity, PokemonSchema } from './pokemon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonEntity.name, schema: PokemonSchema },
    ]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository],
})
export class PokemonModule {}
