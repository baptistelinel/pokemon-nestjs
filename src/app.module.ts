import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PokemonModule,
    MongooseModule.forRoot(
      'mongodb://admin:password123@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
