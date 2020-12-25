import { BadRequestException, PipeTransform } from "@nestjs/common";

export class SlugValidator implements PipeTransform {
  readonly invalidSlug = ["url[0].name"];

  transform(value: string) {
    if (this.invalidSlug.indexOf(value) > -1) {
      throw new BadRequestException("cannot redirect");
    }

    return value;
  }
}
