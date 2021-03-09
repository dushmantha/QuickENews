export type News = {
  _id: string;
  /**
   * - The news title.
   */
  title: string;
  /**
   * - The author name.
   */
  author_name: string;
  /**
   * - The author profile url (if available).
   */
  authorProfileImageUrl: string;
  /**
   * - The author email (if available).
   */
  author_emails: string;
  /**
   * - The author Twitter profile (if available).
   */
  author_twitter: string;
  /**
   * - The author ranking 1-5 (if available).
   */
  author_ranking: string;
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
  image: {
    src: string;
  };
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
  category_id: string;
  /**
   * - The article publish date
   */
  published_at: string;

  attachment: string;
};
