import { Controller, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('/videos')
  async uploadVideo (@Param('name') name: string) {
    return this.contentService.uploadVideo(name);
  }
}
