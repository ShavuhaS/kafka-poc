import { Controller, Get } from '@nestjs/common';
import { TranscodingService } from './transcoding.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventEnum } from '../../../lib/event.enum';
import { TranscodingRequestEvent } from '../../../lib/events/transcoding-request.event';

@Controller()
export class TranscodingController {
  constructor(private readonly transcodingServiceService: TranscodingService) {}

  @EventPattern(EventEnum.TRANSCODING_REQUEST)
  async handleTranscodingRequest(@Payload() req: TranscodingRequestEvent) {
    return this.transcodingServiceService.handleTranscodingRequest(req);
  }
}
