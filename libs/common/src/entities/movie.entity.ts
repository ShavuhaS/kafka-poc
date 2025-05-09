export enum MovieStatus {
  PROCESSING = 'processing',
  READY = 'ready',
}

export class Movie {
  id: string;
  name: string;
  status: MovieStatus;
  link: string | null;
  videoQualities: string[] | null;
}