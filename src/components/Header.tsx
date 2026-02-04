"use client";

import {
  Plus,
  Moon,
  Sun,
  Flame,
  TrendingUp,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HabitStats } from "@/types/habit";

interface HeaderProps {
  stats: HabitStats;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onAddHabit: () => void;
}

export function Header({
  stats,
  theme,
  onThemeToggle,
  onAddHabit,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 sm:h-9 sm:w-9">
              <BarChart3 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                HabitForge
              </h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="h-8 w-8 text-muted-foreground hover:text-foreground sm:h-9 sm:w-9"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            <Button onClick={onAddHabit} size="sm" className="h-8 gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 sm:h-9 sm:gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden text-sm sm:inline">New Habit</span>
            </Button>
          </div>
        </div>

        {/* Stats bar */}
        {stats.totalHabits > 0 && (
          <div className="flex gap-4 overflow-x-auto border-t border-border/50 py-2.5 text-xs sm:gap-6 sm:text-sm">
            <div className="flex shrink-0 items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-muted-foreground">Today</span>
              <span className="font-semibold">
                {stats.completedToday}/{stats.totalHabits}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-muted-foreground">Rate</span>
              <span className="font-semibold">{stats.completionRateToday}%</span>
            </div>
            {stats.longestStreak > 0 && (
              <div className="flex shrink-0 items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-muted-foreground">Best</span>
                <span className="font-semibold">{stats.longestStreak}d</span>
              </div>
            )}
            {stats.totalCompletions > 0 && (
              <div className="flex shrink-0 items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-violet-500" />
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">{stats.totalCompletions}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
