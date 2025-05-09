export class TranscodingCompletedEvent {
  videoId: string;
  videoLink: string;
  videoQualities: string[];

  constructor (videoId: string, videoLink: string, videoQualities: string[]) {
    this.videoId = videoId;
    this.videoLink = videoLink;
    this.videoQualities = videoQualities;
  }

  toString(): string {
    return JSON.stringify({
      videoId: this.videoId,
      videoLink: this.videoLink,
      videoQualities: this.videoQualities,
    });
  }
}