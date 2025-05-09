import { Controller, Get } from '@nestjs/common';
import { TranscodingService } from './transcoding.service';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { EventEnum } from '@app/common/event.enum';
import { TranscodingRequestEvent } from '@app/common/events/transcoding-request.event';

@Controller()
export class TranscodingController {
  constructor(private readonly transcodingServiceService: TranscodingService) {}

  @EventPattern(EventEnum.TRANSCODING_REQUEST)
  async handleTranscodingRequest(
    @Payload() event: TranscodingRequestEvent,
  ) {
    return this.transcodingServiceService.handleTranscodingRequest(event);
  }
}
