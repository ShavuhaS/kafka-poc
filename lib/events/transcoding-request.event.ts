export class TranscodingRequestEvent {
  videoId: string;
  videoLink: string;

  constructor (videoId: string, videoLink: string) {
    this.videoId = videoId;
    this.videoLink = videoLink;
  }

  toString (): string {
    return JSON.stringify({
      videoId: this.videoId,
      videoLink: this.videoLink,
    });
  }
}