export type HabitCategory =
  | "Health"
  | "Productivity"
  | "Learning"
  | "Fitness"
  | "Mindfulness";

export const HABIT_CATEGORIES: HabitCategory[] = [
  "Health",
  "Productivity",
  "Learning",
  "Fitness",
  "Mindfulness",
];

export const CATEGORY_COLORS: Record<HabitCategory, string> = {
  Health: "emerald",
  Productivity: "blue",
  Learning: "violet",
  Fitness: "orange",
  Mindfulness: "rose",
};

export type HabitIcon =
  | "target"
  | "dumbbell"
  | "book-open"
  | "droplets"
  | "moon"
  | "apple"
  | "brain"
  | "heart"
  | "music"
  | "pencil"
  | "code"
  | "coffee"
  | "sun"
  | "bike"
  | "footprints"
  | "pill"
  | "flame"
  | "zap"
  | "leaf"
  | "eye";

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  category: HabitCategory;
  createdAt: string;
  completedDates: string[];
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  completionRateToday: number;
  longestStreak: number;
  totalCompletions: number;
}
