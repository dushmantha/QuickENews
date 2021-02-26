export type User = {
  /**
   * The user's display name (if available).
   */
  displayName: string | null;
  /**
   * - The user's email address (if available).
   */
  email: string | null;
  /**
   * - True if the user's email address has been verified.
   */
  emailVerified: boolean;

  /**
   * Returns the phone number of the user, as stored in the Firebase project's user database,
   * or null if none exists. This can be updated at any time by calling {@link auth.User#updatePhoneNumber}.
   */
  phoneNumber: string | null;

  /**
   * The URL of the user's profile picture (if available).
   */
  photoURL: string | null;

  /**
   *  The authentication provider ID for the current user.
   *  For example, 'facebook.com', or 'google.com'.
   */
  providerId: string;

  /**
   *  - The user's unique ID.
   */
  uid: string;
};
