import { IsNumber, IsString, IsOptional } from 'class-validator';

export class PokemonUpdateDto {
  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString()
  @IsOptional()
  name!: string;

  @IsNumber()
  @IsOptional()
  height!: number;

  @IsNumber()
  @IsOptional()
  weight!: number;
}
