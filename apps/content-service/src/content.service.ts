import { Inject, Injectable } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { EventEnum } from '../../../lib/event.enum';
import { TranscodingRequestEvent } from '../../../lib/events/transcoding-request.event';


@Injectable()
export class ContentService {
  constructor (@Inject('KAFKA') private kafkaClient: ClientKafkaProxy) {}

  async uploadVideo (name: string) {
    name = name ?? `video_${Date.now()}`;
    name = `${name}_1080.mp4`;
    const videoId = randomUUID();
    console.log(`A new video has been uploaded: ${name}`);
    this.kafkaClient.emit(EventEnum.TRANSCODING_REQUEST, new TranscodingRequestEvent(
      videoId,
      `https://some-cloud-storage.com/videos/${name}`,
    ));
    console.log(`Request for transcoding video with ID ${videoId} has been sent`);
  }
}
