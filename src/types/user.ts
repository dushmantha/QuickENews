export type User = {
  _id: string;
  breaking_news: boolean;
  morning_briefing: boolean;
  business_and_technology: boolean;
  evening_briefing: boolean;
  politics: boolean;
  sport: boolean;
  live_politics_update: boolean;
  health: boolean;
  email: string | null;
  is_active: boolean;
  first_name: string;
  subs_type: '28 days' | '7 days' | 'free';
};
