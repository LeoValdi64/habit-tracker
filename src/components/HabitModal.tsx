"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPicker } from "@/components/IconPicker";
import {
  Heart,
  Zap,
  BookOpen,
  Dumbbell,
  Brain,
  type LucideIcon,
} from "lucide-react";
import type { Habit, HabitIcon, HabitCategory } from "@/types/habit";
import { HABIT_CATEGORIES } from "@/types/habit";

const categoryIcons: Record<HabitCategory, LucideIcon> = {
  Health: Heart,
  Productivity: Zap,
  Learning: BookOpen,
  Fitness: Dumbbell,
  Mindfulness: Brain,
};

interface HabitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: Habit | null;
  onSave: (name: string, icon: HabitIcon, category: HabitCategory) => void;
}

function HabitForm({
  habit,
  onSave,
  onCancel,
}: {
  habit?: Habit | null;
  onSave: (name: string, icon: HabitIcon, category: HabitCategory) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(habit?.name ?? "");
  const [icon, setIcon] = useState<HabitIcon>(habit?.icon ?? "target");
  const [category, setCategory] = useState<HabitCategory>(
    habit?.category ?? "Health"
  );

  const isEditing = !!habit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), icon, category);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="habit-name">Habit Name</Label>
        <Input
          id="habit-name"
          placeholder="e.g., Exercise, Read, Meditate..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as HabitCategory)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {HABIT_CATEGORIES.map((cat) => {
              const CatIcon = categoryIcons[cat];
              return (
                <SelectItem key={cat} value={cat}>
                  <div className="flex items-center gap-2">
                    <CatIcon className="h-4 w-4" />
                    <span>{cat}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Icon</Label>
        <IconPicker selected={icon} onSelect={setIcon} />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name.trim()}>
          {isEditing ? "Save Changes" : "Create Habit"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function HabitModal({
  open,
  onOpenChange,
  habit,
  onSave,
}: HabitModalProps) {
  const isEditing = !!habit;

  const handleSave = (
    name: string,
    icon: HabitIcon,
    category: HabitCategory
  ) => {
    onSave(name, icon, category);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Habit" : "Create New Habit"}
          </DialogTitle>
        </DialogHeader>

        {/* Key resets form state when habit changes or dialog opens */}
        <HabitForm
          key={habit?.id ?? (open ? "new" : "closed")}
          habit={habit}
          onSave={handleSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
