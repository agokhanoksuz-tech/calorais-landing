import {
  Brain,
  Salad,
  LineChart,
  ScanEye,
  MessageSquareText,
  Flame,
  Timer,
  Dumbbell,
  TrendingUp,
  Activity,
  Target,
  HeartPulse,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  Brain,
  Salad,
  LineChart,
  ScanEye,
  MessageSquareText,
  Flame,
  Timer,
  Dumbbell,
  TrendingUp,
  Activity,
  Target,
  HeartPulse,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Activity;
}
