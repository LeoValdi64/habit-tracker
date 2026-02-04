"use client";

import {
  Target,
  Dumbbell,
  BookOpen,
  Droplets,
  Moon,
  Apple,
  Brain,
  Heart,
  Music,
  Pencil,
  Code,
  Coffee,
  Sun,
  Bike,
  Footprints,
  Pill,
  Flame,
  Zap,
  Leaf,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { HabitIcon } from "@/types/habit";

export const iconMap: Record<HabitIcon, LucideIcon> = {
  target: Target,
  dumbbell: Dumbbell,
  "book-open": BookOpen,
  droplets: Droplets,
  moon: Moon,
  apple: Apple,
  brain: Brain,
  heart: Heart,
  music: Music,
  pencil: Pencil,
  code: Code,
  coffee: Coffee,
  sun: Sun,
  bike: Bike,
  footprints: Footprints,
  pill: Pill,
  flame: Flame,
  zap: Zap,
  leaf: Leaf,
  eye: Eye,
};

export const habitIcons: HabitIcon[] = [
  "target",
  "dumbbell",
  "book-open",
  "droplets",
  "moon",
  "apple",
  "brain",
  "heart",
  "music",
  "pencil",
  "code",
  "coffee",
  "sun",
  "bike",
  "footprints",
  "pill",
  "flame",
  "zap",
  "leaf",
  "eye",
];

interface IconPickerProps {
  selected: HabitIcon;
  onSelect: (icon: HabitIcon) => void;
}

export function IconPicker({ selected, onSelect }: IconPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {habitIcons.map((icon) => {
        const Icon = iconMap[icon];
        return (
          <button
            key={icon}
            type="button"
            onClick={() => onSelect(icon)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border transition-all",
              selected === icon
                ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-accent"
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}

interface HabitIconDisplayProps {
  icon: HabitIcon;
  className?: string;
}

export function HabitIconDisplay({ icon, className }: HabitIconDisplayProps) {
  const Icon = iconMap[icon];
  return <Icon className={cn("h-5 w-5", className)} />;
}
