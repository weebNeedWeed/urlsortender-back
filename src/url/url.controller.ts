import { SortUrlDto } from "./sort-url.dto";
import { UrlService } from "./url.service";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { SlugValidator } from "./slug-validator.pipe";

@Controller("url")
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  async sort(@Body(ValidationPipe) sortUrlDto: SortUrlDto): Promise<string> {
    return this.urlService.createSortUrl(sortUrlDto);
  }

  @Get("/:slug")
  async redirect(
    @Param("slug", SlugValidator) slug: string,
    @Res() res,
  ): Promise<void> {
    const url = await this.urlService.getUrl(slug);

    return res.redirect(url);
  }

  @Patch()
  async updateUrl(
    @Body(ValidationPipe) sortUrlDto: SortUrlDto,
  ): Promise<string> {
    return await this.urlService.updateUrl(sortUrlDto);
  }
}
