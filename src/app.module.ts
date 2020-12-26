import { DbConfig } from "./config/config";
import { Module } from "@nestjs/common";
import { UrlModule } from "./url/url.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot(DbConfig.url, DbConfig.options), UrlModule],
})
export class AppModule {}
