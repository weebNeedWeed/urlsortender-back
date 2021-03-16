import { SortUrlDto } from "./sort-url.dto";
import { Url, UrlDocument } from "./url.schema";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
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
      throw new BadRequestException("Not found");
    }

    const lastAccess: number = url.lastAccess;
    const remainTime: number = Date.now() - lastAccess;

    if (url.accessCount === 10) {
      if (remainTime < 86400000) {
        throw new ForbiddenException(
          `Can not be used in the next ${
            24 - Math.floor(remainTime * 2.77777778 * Math.pow(10, -7))
          } hours`,
        );
      }

      url.accessCount = 0;
      url.lastAccess = Date.now();
    }

    if (url.accessCount < 10) {
      url.accessCount = 1 + url.accessCount;

      await url.save();
    }

    return url.raw_url;
  }

  async updateUrl(sortUrlDto: SortUrlDto): Promise<string> {
    const url = await this.urlModel
      .findOne({
        name: sortUrlDto.name,
      })
      .exec();

    if (!url) {
      throw new BadRequestException("Not found");
    }

    url.raw_url = sortUrlDto.rawUrl;

    await url.save();

    return sortUrlDto.name;
  }
}
