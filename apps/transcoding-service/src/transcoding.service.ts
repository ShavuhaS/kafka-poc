import { Inject, Injectable } from '@nestjs/common';
import { TranscodingRequestEvent } from '@app/common/events/transcoding-request.event';
import { log } from '@app/common/logging';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { EventEnum } from '@app/common/event.enum';
import { TranscodingCompletedEvent } from '@app/common/events/transcoding-completed.event';

@Injectable()
export class TranscodingService {
  constructor (@Inject('KAFKA') private kafkaClient: ClientKafkaProxy) {}

  async handleTranscodingRequest(event: TranscodingRequestEvent) {
    log(`Transcoding request for movie with ID ${event.videoId} has been accepted`);
    log(event);

    const minSeconds = 2;
    const maxSeconds = 10;
    const seconds = minSeconds + Math.round(Math.random() * (maxSeconds - minSeconds));

    log(`Finish transcoding for ${event.videoId} in ${seconds} seconds`);
    setTimeout(() => {
      this.kafkaClient.emit(EventEnum.TRANSCODING_COMPLETED, {
        key: event.videoId,
        value: new TranscodingCompletedEvent(
          event.videoId,
          `https://some-cloud-storage.com/videos/${event.videoId}/manifest.mpd`,
          ['360p', '480p', '720p', '1080p'],
        ),
      });

      log(`Transcoding response for the movie with ID ${event.videoId} has been sent`);
    }, 1000 * seconds);
  }
}
