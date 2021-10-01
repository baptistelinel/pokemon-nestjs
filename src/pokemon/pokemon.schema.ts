import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PokemonEntity extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;
}

export const PokemonSchema = SchemaFactory.createForClass(PokemonEntity);
