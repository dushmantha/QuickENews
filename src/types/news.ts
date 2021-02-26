export type News = {
  /**
   * - The news title.
   */
  title: string;
  /**
   * - The author name.
   */
  authorName: string;
  /**
   * - The author profile url (if available).
   */
  authorProfileImageUrl: string;
  /**
   * - The author email (if available).
   */
  authorEmails: string;
  /**
   * - The author Twitter profile (if available).
   */
  authorTwitter: string;
  /**
   * - The author ranking 1-5 (if available).
   */
  authorRanking: string;
  /**
   * - User should pay for this article for read
   */
  paid: boolean;
  /**
   * - Article description
   */
  description: string;
  /**
   * - Header image url
   */
  urlToImage: string;
  /**
   * - Header video url
   */
  video: string;
  /**
   * - Full article url
   */
  url: string;
  /**
   * - Category of article
   */
  category: string;
  /**
   * - The article publish date
   */
  publishedAt: string;
};
