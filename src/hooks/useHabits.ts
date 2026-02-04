"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import type { Habit, HabitIcon, HabitCategory, HabitStats } from "@/types/habit";

const STORAGE_KEY = "habit-tracker-data";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(getDateString(date));
  }
  return days;
}

function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort().reverse();
  const today = getDateString();
  const yesterday = getDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));

  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(sortedDates[0] + "T00:00:00");

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateString = getDateString(prevDate);

    if (sortedDates[i] === prevDateString) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): string {
  return "[]";
}

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

export function useHabits() {
  // Use useSyncExternalStore to read initial value without lint error
  const rawStored = useSyncExternalStore(subscribeStorage, getSnapshot, getServerSnapshot);
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const parsed = JSON.parse(rawStored) as Habit[];
      return parsed.map((h) => ({
        ...h,
        category: h.category || ("Health" as HabitCategory),
      }));
    } catch {
      return [];
    }
  });
  const isLoaded = true;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = useCallback(
    (name: string, icon: HabitIcon, category: HabitCategory) => {
      const newHabit: Habit = {
        id: generateId(),
        name,
        icon,
        category,
        createdAt: getDateString(),
        completedDates: [],
      };
      setHabits((prev) => [...prev, newHabit]);
    },
    []
  );

  const updateHabit = useCallback(
    (id: string, name: string, icon: HabitIcon, category: HabitCategory) => {
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === id ? { ...habit, name, icon, category } : habit
        )
      );
    },
    []
  );

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const toggleHabitCompletion = useCallback(
    (id: string, date: string = getDateString()) => {
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id !== id) return habit;
          const isCompleted = habit.completedDates.includes(date);
          const completedDates = isCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date];
          return { ...habit, completedDates };
        })
      );
    },
    []
  );

  const isCompletedOnDate = useCallback(
    (habit: Habit, date: string): boolean => {
      return habit.completedDates.includes(date);
    },
    []
  );

  const getStreak = useCallback((habit: Habit): number => {
    return calculateStreak(habit.completedDates);
  }, []);

  const getCompletionRate7Days = useCallback((habit: Habit): number => {
    const days = getLast7Days();
    const completed = days.filter((d) =>
      habit.completedDates.includes(d)
    ).length;
    return Math.round((completed / 7) * 100);
  }, []);

  const getStats = useCallback((): HabitStats => {
    const today = getDateString();
    const completedToday = habits.filter((h) =>
      h.completedDates.includes(today)
    ).length;
    const completionRateToday =
      habits.length > 0
        ? Math.round((completedToday / habits.length) * 100)
        : 0;

    const longestStreak = habits.reduce((max, habit) => {
      const streak = calculateStreak(habit.completedDates);
      return Math.max(max, streak);
    }, 0);

    const totalCompletions = habits.reduce(
      (sum, h) => sum + h.completedDates.length,
      0
    );

    return {
      totalHabits: habits.length,
      completedToday,
      completionRateToday,
      longestStreak,
      totalCompletions,
    };
  }, [habits]);

  return {
    habits,
    isLoaded,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    isCompletedOnDate,
    getStreak,
    getCompletionRate7Days,
    getStats,
    getLast7Days,
    getDateString,
  };
}
