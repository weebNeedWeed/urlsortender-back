import { SortUrlDto } from "./sort-url.dto";
import { Url, UrlDocument } from "./url.schema";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async createSortUrl(sortUrlDto: SortUrlDto): Promise<string> {
    let { name } = sortUrlDto;

    name =
      name === "" || typeof name === "undefined" ? uuidv4().slice(0, 8) : name;

    const newUrl = new this.urlModel({
      name,
      raw_url: sortUrlDto.rawUrl,
    });

    try {
      await newUrl.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException("Name already existed");
      }
    }

    return name;
  }

  async getUrl(slug: string): Promise<string> {
    const url = await this.urlModel
      .findOne({
        name: slug,
      })
      .exec();

    if (!url) {
      throw new BadRequestException("Url not found");
    }

    return url.raw_url;
  }
}
