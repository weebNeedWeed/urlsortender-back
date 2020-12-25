import { SortUrlDto } from "./sort-url.dto";
import { UrlService } from "./url.service";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { SlugValidator } from "./slug-validator.pipe";

// Xóa "url"
@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  async sort(@Body(ValidationPipe) sortUrlDto: SortUrlDto): Promise<string> {
    return this.urlService.createSortUrl(sortUrlDto);
  }

  @Get("/r/:slug")
  async redirect(
    @Param("slug", SlugValidator) slug: string,
    @Res() res,
  ): Promise<void> {
    const url = await this.urlService.getUrl(slug);

    return res.redirect(url);
  }
}
