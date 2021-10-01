import { IsNumber, IsString } from 'class-validator';

export class PokemonCreateDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;
}
