import { Injectable } from '@nestjs/common';
import { TranscodingRequestEvent } from '../../../lib/events/transcoding-request.event';

@Injectable()
export class TranscodingService {
  constructor () {}

  async handleTranscodingRequest(req: TranscodingRequestEvent) {
    console.log(req);
  }
}
