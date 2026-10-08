export interface FeedbackItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  email?: string;
  avatar?: string;
  rating: number; // 1 to 5
  service?: string;
  comment: string;
  recommend: boolean;
  date: string;
  verified?: boolean;
  likes: number;
}

export interface FeedbackStats {
  averageRating: number;
  totalReviews: number;
  recommendPercentage: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Initialized to empty as requested by user
export const initialFeedbackList: FeedbackItem[] = [];

// Returns top N highest-rated and most-liked feedback items
export function getTopRatedFeedbacks(list: FeedbackItem[], limit = 5): FeedbackItem[] {
  if (!list || list.length === 0) return [];
  return [...list]
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating; // Highest rating first (5 star -> 4 star)
      }
      if (b.likes !== a.likes) {
        return b.likes - a.likes; // Most liked first
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Newest first
    })
    .slice(0, limit);
}

export function calculateFeedbackStats(list: FeedbackItem[]): FeedbackStats {
  if (!list || list.length === 0) {
    return {
      averageRating: 0.0,
      totalReviews: 0,
      recommendPercentage: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const totalReviews = list.length;
  const totalScore = list.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = Number((totalScore / totalReviews).toFixed(1));
  const recommendCount = list.filter((item) => item.recommend).length;
  const recommendPercentage = Math.round((recommendCount / totalReviews) * 100);

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  list.forEach((item) => {
    const r = Math.min(5, Math.max(1, Math.round(item.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[r] = (distribution[r] || 0) + 1;
  });

  return {
    averageRating,
    totalReviews,
    recommendPercentage,
    distribution,
  };
}
