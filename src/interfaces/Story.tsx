import { Comment } from './Comment';

export interface Story {
  by: string,
  kids: Array<string>, // kids are commentIDs
  comments: any,
  title: string,
  url: string,
}
