import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({ unique: true })
  name: string;

  @Prop({ required: true })
  raw_url: string;

  @Prop({ type: Number, required: true, default: Date.now() })
  lastAccess: number;

  @Prop({ required: true, default: 0 })
  accessCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
