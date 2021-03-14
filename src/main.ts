import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./config/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("Port: ", PORT);
  await app.listen(PORT);
}
bootstrap();
