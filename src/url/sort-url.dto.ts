import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class SortUrlDto {
  @Matches(/([^!@#$%^&*].)*/, { message: "Invalid name" })
  @IsString()
  @IsOptional()
  name: string;

  @Matches(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    { message: "Invalid url" },
  )
  @IsString()
  @IsNotEmpty()
  rawUrl: string;
}
