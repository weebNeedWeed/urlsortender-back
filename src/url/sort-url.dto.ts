import {
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class SortUrlDto {
  @IsString()
  @IsNotIn(["mongoose", "MONGOOSE"], { message: "Name already existed" })
  @IsOptional()
  @Matches(/([^!@#$%^&*].)*/g)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  )
  rawUrl: string;
}
