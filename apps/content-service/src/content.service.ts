import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { EventEnum } from '@app/common/event.enum';
import { log } from '@app/common/logging';
import { TranscodingRequestEvent } from '@app/common/events/transcoding-request.event';
import { TranscodingCompletedEvent } from '@app/common/events/transcoding-completed.event';
import { Movie, MovieStatus } from '@app/common/entities/movie.entity';


@Injectable()
export class ContentService implements OnApplicationBootstrap {
  private movies: Movie[] = [];

  constructor (@Inject('KAFKA') private kafkaClient: ClientKafkaProxy) {}

  async onApplicationBootstrap () {
    await this.kafkaClient.connect();
  }

  getMovies (): Movie[] {
    return this.movies;
  }

  async uploadMovie (name: string) {
    const movieName = name ?? `movie_${Date.now()}`;
    const fileName = `${movieName}_1080.mp4`;

    const videoId = randomUUID();
    const videoLink = `https://some-cloud-storage.com/videos/unprocessed/${fileName}`;
    const videoQuality = '1080p';
    const fileType = 'mp4';

    log(`A new movie has been uploaded: ${movieName}`);
    this.movies.push({
      id: videoId,
      name: movieName,
      status: MovieStatus.PROCESSING,
      link: null,
      videoQualities: null,
    });

    this.kafkaClient.emit(EventEnum.TRANSCODING_REQUEST, {
      key: videoId,
      value: new TranscodingRequestEvent(videoId, videoLink, videoQuality, fileType),
    });

    log(`Request for transcoding movie with ID ${videoId} has been sent`);
  }

  handleTranscodingCompletion (event: TranscodingCompletedEvent) {
    log(`Received transcoded movie with ID ${event.videoId}`);
    log(event);
    log(`Updating movie with ID ${event.videoId} in database...`);

    const movie = this.movies.find((m) => m.id === event.videoId);
    if (!movie) {
      throw new Error(`Movie with id ${event.videoId} not found`);
    }

    movie.status = MovieStatus.READY;
    movie.link = event.videoLink;
    movie.videoQualities = event.videoQualities;
  }
}
