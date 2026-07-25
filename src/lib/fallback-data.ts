import type { DashboardData, Narrative, Plan } from './types';

export const FALLBACK_NARRATIVE: Narrative = {
  protocol: [
    { id: 1, time: '06:15', title: 'Readiness check', detail: 'Sleep and recovery set today’s training ceiling.', state: 'CLEAR' },
    { id: 2, time: '07:00', title: 'Fuel the session', detail: 'Protein-forward breakfast with 68 g carbohydrates.', state: 'READY' },
    { id: 3, time: '12:30', title: 'Upper strength', detail: 'Five movements · 52 minutes · controlled volume.', state: 'DRAFTED' },
    { id: 4, time: '18:40', title: 'Recovery meal', detail: 'The day’s remaining macros, already accounted for.', state: 'QUEUED' },
    { id: 5, time: '22:30', title: 'Wind-down', detail: 'Low light and an eight-hour sleep window.', state: 'SET' },
  ],
  pillars: [
    {
      id: 1,
      num: '01',
      name: 'Performance',
      line: 'Training that changes when you do.',
      description: 'Daily readiness, recent load and your long-term goal shape every session before it reaches you.',
      detail: 'ADAPTIVE TRAINING LOAD',
      image: '/images/pillar-performance.jpg',
    },
    {
      id: 2,
      num: '02',
      name: 'Nutrition',
      line: 'Fuel decisions made before hunger makes them.',
      description: 'Meals and macros are organized around the work ahead, not isolated from the rest of your day.',
      detail: 'CONTEXT-AWARE FUEL',
      image: '/images/pillar-nutrition.jpg',
    },
    {
      id: 3,
      num: '03',
      name: 'Recovery',
      line: 'Progress includes knowing when to hold back.',
      description: 'Sleep, soreness and accumulated fatigue quietly adjust the plan without breaking its direction.',
      detail: 'READINESS-LED RECOVERY',
      image: '/images/pillar-recovery.jpg',
    },
    {
      id: 4,
      num: '04',
      name: 'Progress',
      line: 'Patterns you can act on, not numbers to collect.',
      description: 'Calorais turns weeks of training and nutrition into a clear view of what is actually moving you forward.',
      detail: '12-WEEK SIGNALS',
      image: '/images/pillar-progress.jpg',
    },
  ],
  timeline: [
    { id: 1, time: '06:15', title: 'The day is issued', description: 'Your readiness, schedule and targets become one prepared protocol.', tag: 'SYSTEM' },
    { id: 2, time: '07:00', title: 'Breakfast fits the work', description: 'Fuel is sized for the session already waiting later in the day.', tag: 'FUEL' },
    { id: 3, time: '12:30', title: 'Training begins', description: 'Volume and intensity reflect how you recovered, not a rigid template.', tag: 'TRAIN' },
    { id: 4, time: '14:00', title: 'The plan recalibrates', description: 'Completed work updates the rest of the day automatically.', tag: 'ADAPT' },
    { id: 5, time: '18:40', title: 'Recovery is accounted for', description: 'Your evening meal closes the remaining protein and energy gap.', tag: 'RECOVER' },
    { id: 6, time: '22:30', title: 'Tomorrow starts tonight', description: 'The next protocol begins forming before you go to sleep.', tag: 'PREPARE' },
  ],
  principles: [
    { id: 1, num: '01', title: 'Preparation beats motivation.', description: 'The right action should be waiting before willpower is required.' },
    { id: 2, num: '02', title: 'One body, one system.', description: 'Training, fuel, recovery and progress should never contradict each other.' },
    { id: 3, num: '03', title: 'Adapt without drama.', description: 'A missed meal or poor night changes the plan, not the direction.' },
    { id: 4, num: '04', title: 'Show the signal.', description: 'Data earns screen space only when it changes what you do next.' },
  ],
  quotes: [
    { id: 1, quote: 'The hardest part used to be deciding what to do. Now the day is waiting for me.', athlete: 'Mara K.', sport: 'Hybrid athlete', theme: 'Preparation' },
    { id: 2, quote: 'My training and nutrition finally feel like parts of the same plan.', athlete: 'Leon R.', sport: 'Strength training', theme: 'Clarity' },
    { id: 3, quote: 'It adjusts quietly. I keep moving without feeling like I failed the program.', athlete: 'Derya A.', sport: 'Distance running', theme: 'Consistency' },
  ],
};

export const FALLBACK_DASHBOARD: DashboardData = {
  metrics: [
    { id: 1, label: 'Readiness', value: '82', sub: 'Good to train', icon: 'activity', accent: true },
    { id: 2, label: 'Training load', value: '468', sub: 'On target', icon: 'dumbbell', accent: false },
    { id: 3, label: 'Protein', value: '146 g', sub: '18 g remaining', icon: 'utensils', accent: false },
    { id: 4, label: 'Sleep', value: '7h 42m', sub: '+31 min this week', icon: 'moon', accent: false },
  ],
  activity: [
    { id: 1, day: 'MON', value: 78, workouts: 1 },
    { id: 2, day: 'TUE', value: 92, workouts: 1 },
    { id: 3, day: 'WED', value: 64, workouts: 1 },
    { id: 4, day: 'THU', value: 0, workouts: 0 },
    { id: 5, day: 'FRI', value: 86, workouts: 1 },
    { id: 6, day: 'SAT', value: 72, workouts: 1 },
    { id: 7, day: 'SUN', value: 0, workouts: 0 },
  ],
  workouts: [
    { id: 1, title: 'Upper strength', detail: 'Chest · back · shoulders', duration: '52 min', kcal: 428, intensity: 'High' },
    { id: 2, title: 'Zone 2 bike', detail: 'Aerobic base · steady output', duration: '41 min', kcal: 356, intensity: 'Medium' },
    { id: 3, title: 'Recovery walk', detail: 'Low load · outdoor', duration: '36 min', kcal: 174, intensity: 'Low' },
  ],
};

export const FALLBACK_PLANS: Plan[] = [
  {
    id: 1,
    name: 'START',
    price: 0,
    period: 'forever',
    description: 'See what a prepared day feels like.',
    features: ['Daily protocol', 'Training and fuel targets', 'Weekly progress view'],
    highlighted: false,
    button_text: 'Start free',
  },
  {
    id: 2,
    name: 'OPERATE',
    price: 19,
    period: 'month',
    description: 'The full system, adapting as you live.',
    features: ['Everything in Start', 'Adaptive training plans', 'Nutrition photo analysis', 'Recovery-led adjustments', 'Calorais console'],
    highlighted: true,
    button_text: 'Begin 14-day trial',
  },
  {
    id: 3,
    name: 'ANNUAL',
    price: 149,
    period: 'year',
    description: 'One year of uninterrupted preparation.',
    features: ['Everything in Operate', 'Two months included', 'Long-range progress reports', 'Priority access to new tools'],
    highlighted: false,
    button_text: 'Choose annual',
  },
];
