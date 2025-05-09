import { Controller, Get, Post, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventEnum } from '@app/common/event.enum';
import { TranscodingCompletedEvent } from '@app/common/events/transcoding-completed.event';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('/movies')
  getMovies () {
    return this.contentService.getMovies();
  }

  @Post('/movies')
  async uploadMovie (@Query('name') name: string) {
    return this.contentService.uploadMovie(name);
  }

  @EventPattern(EventEnum.TRANSCODING_COMPLETED)
  handleTranscodingCompletion (@Payload() event: TranscodingCompletedEvent) {
    return this.contentService.handleTranscodingCompletion(event);
  }
}
