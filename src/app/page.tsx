"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { useTheme } from "@/hooks/useTheme";
import { Header } from "@/components/Header";
import { HabitCard } from "@/components/HabitCard";
import { HabitModal } from "@/components/HabitModal";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Heart,
  Zap,
  BookOpen,
  Dumbbell,
  Brain,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import type { Habit, HabitIcon, HabitCategory } from "@/types/habit";
import { HABIT_CATEGORIES } from "@/types/habit";

const categoryFilterIcons: Record<string, LucideIcon> = {
  All: LayoutGrid,
  Health: Heart,
  Productivity: Zap,
  Learning: BookOpen,
  Fitness: Dumbbell,
  Mindfulness: Brain,
};

const categoryFilterColors: Record<string, string> = {
  All: "data-[active=true]:bg-foreground data-[active=true]:text-background",
  Health: "data-[active=true]:bg-emerald-600 data-[active=true]:text-white",
  Productivity: "data-[active=true]:bg-blue-600 data-[active=true]:text-white",
  Learning: "data-[active=true]:bg-violet-600 data-[active=true]:text-white",
  Fitness: "data-[active=true]:bg-orange-600 data-[active=true]:text-white",
  Mindfulness: "data-[active=true]:bg-rose-600 data-[active=true]:text-white",
};

export default function Home() {
  const {
    habits,
    isLoaded,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    isCompletedOnDate,
    getStreak,
    getStats,
    getLast7Days,
  } = useHabits();

  const { theme, toggleTheme } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const handleAddHabit = () => {
    setEditingHabit(null);
    setModalOpen(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setModalOpen(true);
  };

  const handleSaveHabit = (
    name: string,
    icon: HabitIcon,
    category: HabitCategory
  ) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, name, icon, category);
    } else {
      addHabit(name, icon, category);
    }
  };

  const handleDeleteClick = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      setHabitToDelete(habit);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete.id);
      setHabitToDelete(null);
    }
  };

  const last7Days = getLast7Days();
  const stats = getStats();

  const filteredHabits =
    activeCategory === "All"
      ? habits
      : habits.filter((h) => h.category === activeCategory);

  const categoryCounts = habits.reduce(
    (acc, h) => {
      acc[h.category] = (acc[h.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-40 border-b border-border/50 bg-background">
          <div className="mx-auto max-w-2xl px-4">
            <div className="flex h-14 items-center justify-between sm:h-16">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
              <div className="flex gap-2">
                <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
                <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-2xl px-4 py-6">
          <div className="mb-4 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-20 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[76px] animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        stats={stats}
        theme={theme}
        onThemeToggle={toggleTheme}
        onAddHabit={handleAddHabit}
      />

      <main className="mx-auto max-w-2xl px-4 py-4 sm:py-6">
        {habits.length === 0 ? (
          <EmptyState onAddHabit={handleAddHabit} />
        ) : (
          <>
            {/* Category filter */}
            <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
              {["All", ...HABIT_CATEGORIES].map((cat) => {
                const Icon = categoryFilterIcons[cat];
                const isActive = activeCategory === cat;
                const count =
                  cat === "All" ? habits.length : categoryCounts[cat] || 0;

                if (cat !== "All" && count === 0) return null;

                return (
                  <Button
                    key={cat}
                    variant="outline"
                    size="sm"
                    data-active={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "h-8 shrink-0 gap-1 rounded-lg border-border/50 px-2.5 text-xs font-medium transition-all hover:bg-accent sm:px-3",
                      categoryFilterColors[cat],
                      isActive && "border-transparent"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{cat}</span>
                    <span className="text-[10px] opacity-60">
                      {count}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Habit list */}
            <div className="space-y-2.5">
              {filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  streak={getStreak(habit)}
                  last7Days={last7Days}
                  isCompletedOnDate={isCompletedOnDate}
                  onToggle={toggleHabitCompletion}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {filteredHabits.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <p className="text-sm">
                  No habits in this category yet.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <HabitModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        habit={editingHabit}
        onSave={handleSaveHabit}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        habitName={habitToDelete?.name ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
