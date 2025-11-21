export interface SchoolImage {
  id: string;
  url: string;
  description: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface NavLink {
  label: string;
  href: string;
}