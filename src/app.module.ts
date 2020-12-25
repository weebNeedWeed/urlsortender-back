import { Module } from "@nestjs/common";
import { UrlModule } from "./url/url.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/tasks", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UrlModule,
  ],
})
export class AppModule {}
