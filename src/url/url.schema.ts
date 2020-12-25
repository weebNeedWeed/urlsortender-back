import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({ unique: true })
  name: string;

  @Prop()
  raw_url: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
