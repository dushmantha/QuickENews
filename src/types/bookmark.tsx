import {News} from './';

export type Bookmark = {
  _id: string;
  /**
   * - The news.
   */
  news: News;
};
