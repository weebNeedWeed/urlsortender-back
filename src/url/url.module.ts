import { Url, UrlSchema } from "./url.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlController } from "./url.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
  ],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
