export class TranscodingRequestEvent {
  videoId: string;
  videoLink: string;
  videoQuality: string;
  fileType: string;

  constructor (videoId: string, videoLink: string, videoQuality: string, fileType: string) {
    this.videoId = videoId;
    this.videoLink = videoLink;
    this.videoQuality = videoQuality;
    this.fileType = fileType;
  }

  toString (): string {
    return JSON.stringify({
      videoId: this.videoId,
      videoLink: this.videoLink,
      videoQuality: this.videoQuality,
      fileType: this.fileType,
    });
  }
}