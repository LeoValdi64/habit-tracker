"use client";

import { Check, Flame, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HabitIconDisplay } from "@/components/IconPicker";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import type { Habit, HabitCategory } from "@/types/habit";

const categoryColorMap: Record<HabitCategory, string> = {
  Health: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Productivity: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Learning: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  Fitness: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Mindfulness: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

const completedIconColor: Record<HabitCategory, string> = {
  Health: "bg-emerald-500/15 text-emerald-400",
  Productivity: "bg-blue-500/15 text-blue-400",
  Learning: "bg-violet-500/15 text-violet-400",
  Fitness: "bg-orange-500/15 text-orange-400",
  Mindfulness: "bg-rose-500/15 text-rose-400",
};

const completedDotColor: Record<HabitCategory, string> = {
  Health: "bg-emerald-500",
  Productivity: "bg-blue-500",
  Learning: "bg-violet-500",
  Fitness: "bg-orange-500",
  Mindfulness: "bg-rose-500",
};

const completedCheckColor: Record<HabitCategory, string> = {
  Health: "bg-emerald-600 hover:bg-emerald-700 border-emerald-600",
  Productivity: "bg-blue-600 hover:bg-blue-700 border-blue-600",
  Learning: "bg-violet-600 hover:bg-violet-700 border-violet-600",
  Fitness: "bg-orange-600 hover:bg-orange-700 border-orange-600",
  Mindfulness: "bg-rose-600 hover:bg-rose-700 border-rose-600",
};

interface HabitCardProps {
  habit: Habit;
  streak: number;
  last7Days: string[];
  isCompletedOnDate: (habit: Habit, date: string) => boolean;
  onToggle: (id: string, date?: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({
  habit,
  streak,
  last7Days,
  isCompletedOnDate,
  onToggle,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const today = last7Days[last7Days.length - 1];
  const isCompletedToday = isCompletedOnDate(habit, today);

  const getDayLabel = (dateStr: string, index: number): string => {
    const date = new Date(dateStr + "T00:00:00");
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    if (index === last7Days.length - 1) return "T";
    return dayNames[date.getDay()];
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 py-0 transition-all hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
      <div className="flex items-center gap-3 px-4 py-3.5 sm:gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12",
            isCompletedToday
              ? completedIconColor[habit.category]
              : "bg-muted text-muted-foreground"
          )}
        >
          <HabitIconDisplay icon={habit.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold sm:text-base">
              {habit.name}
            </h3>
            <Badge
              variant="outline"
              className={cn(
                "hidden shrink-0 border px-1.5 py-0 text-[10px] font-medium sm:inline-flex",
                categoryColorMap[habit.category]
              )}
            >
              {habit.category}
            </Badge>
            {streak > 0 && (
              <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-orange-400">
                <Flame className="h-3 w-3" />
                <span>{streak}d</span>
              </div>
            )}
          </div>

          {/* Weekly grid */}
          <div className="flex gap-1">
            {last7Days.map((date, index) => {
              const completed = isCompletedOnDate(habit, date);
              const isToday = index === last7Days.length - 1;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => onToggle(habit.id, date)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-md px-1 py-0.5 transition-colors hover:bg-accent",
                    isToday && "bg-accent/50"
                  )}
                >
                  <span className="text-[9px] font-medium uppercase text-muted-foreground">
                    {getDayLabel(date, index)}
                  </span>
                  <div
                    className={cn(
                      "h-3 w-3 rounded-sm transition-all sm:h-3.5 sm:w-3.5",
                      completed
                        ? completedDotColor[habit.category]
                        : "bg-muted-foreground/15"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          {/* Dropdown for edit/delete */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 data-[state=open]:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(habit)}>
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(habit.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Check button */}
          <Button
            variant={isCompletedToday ? "default" : "outline"}
            size="icon"
            onClick={() => onToggle(habit.id)}
            className={cn(
              "h-9 w-9 rounded-full transition-all sm:h-10 sm:w-10",
              isCompletedToday
                ? completedCheckColor[habit.category]
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            <Check
              className={cn(
                "h-4 w-4 transition-transform sm:h-5 sm:w-5",
                isCompletedToday && "scale-110 text-white"
              )}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
