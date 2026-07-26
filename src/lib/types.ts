export interface Plan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  button_text: string;
}

export interface DashboardMetric {
  id: number;
  label: string;
  value: string;
  sub: string;
  icon: string;
  accent: boolean;
}

export interface WeeklyActivity {
  id: number;
  day: string;
  value: number;
  workouts: number;
}

export interface RecentWorkout {
  id: number;
  title: string;
  detail: string;
  duration: string;
  kcal: number;
  intensity: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  activity: WeeklyActivity[];
  workouts: RecentWorkout[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export interface PlanExercise {
  name: string;
  sets: number;
  reps: string;
}

export interface PlanDay {
  name: string;
  focus: string;
  note: string;
  exercises: PlanExercise[];
}

export interface GeneratedPlan {
  goal: string;
  goal_label: string;
  level: string;
  level_label: string;
  days: number;
  weight: number | null;
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  summary: string;
  coach_note: string;
  split: PlanDay[];
  tips: string[];
}

export interface GeneratePlanResponse {
  id: number;
  plan: GeneratedPlan;
}

export interface WaitlistResponse {
  ok: boolean;
  count: number;
  email_sent: boolean;
}

export interface ProtocolItem {
  id: number;
  time: string;
  title: string;
  detail: string;
  state: string;
}

export interface PillarData {
  id: number;
  num: string;
  name: string;
  line: string;
  description: string;
  detail: string;
  image: string;
}

export interface DayEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  tag: string;
}

export interface Principle {
  id: number;
  num: string;
  title: string;
  description: string;
}

export interface Quote {
  id: number;
  quote: string;
  athlete: string;
  sport: string;
  theme: string;
}

export interface Narrative {
  protocol: ProtocolItem[];
  pillars: PillarData[];
  timeline: DayEvent[];
  principles: Principle[];
  quotes: Quote[];
}
