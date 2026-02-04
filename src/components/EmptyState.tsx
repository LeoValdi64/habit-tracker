"use client";

import { Plus, BarChart3, Flame, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddHabit: () => void;
}

export function EmptyState({ onAddHabit }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 ring-1 ring-violet-500/20">
        <BarChart3 className="h-10 w-10 text-violet-400" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">Start Your Journey</h2>
      <p className="mb-8 max-w-sm text-muted-foreground">
        Build better habits one day at a time. Track your progress, maintain
        streaks, and watch yourself grow.
      </p>

      <Button
        onClick={onAddHabit}
        size="lg"
        className="gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
      >
        <Plus className="h-5 w-5" />
        Create Your First Habit
      </Button>

      <div className="mt-12 grid w-full max-w-sm grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          <span className="text-xs text-muted-foreground">Daily Check-off</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4">
          <Flame className="h-6 w-6 text-orange-500" />
          <span className="text-xs text-muted-foreground">Streak Tracking</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4">
          <BarChart3 className="h-6 w-6 text-violet-500" />
          <span className="text-xs text-muted-foreground">Weekly Stats</span>
        </div>
      </div>
    </div>
  );
}
