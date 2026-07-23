import supabase from './db-client.js';

const GOALS = {
  fat: { label: 'Fat Loss', calFactor: 26, proteinFactor: 2.0, fatFactor: 0.8, rest: '45-60 s', note: 'Keep rests short and tempo controlled. Finish every lifting day with 8 minutes of incline walking.' },
  muscle: { label: 'Muscle Gain', calFactor: 33, proteinFactor: 2.0, fatFactor: 0.9, rest: '90-150 s', note: 'Rest fully on the big compounds. Add weight or reps every single week.' },
  conditioning: { label: 'Conditioning', calFactor: 29, proteinFactor: 1.8, fatFactor: 0.8, rest: '60-75 s', note: 'Train with heart-rate feedback; use deep breaths between sets to bring your pulse down.' },
};

const LEVELS = {
  beginner: { label: 'Beginner', setDelta: -1, tip: 'First 4 weeks are technique-first: film your lifts and check your form.' },
  intermediate: { label: 'Intermediate', setDelta: 0, tip: 'Use double progression: once you top the rep range, increase the weight.' },
  advanced: { label: 'Advanced', setDelta: 1, tip: 'Stay in the RPE 8-9 zone on main lifts; finish with a drop set on the last set.' },
};

const DAY_LIBRARY = {
  fullA: {
    title: 'Full Body A',
    focus: 'Core push-pull + legs',
    exercises: [
      ['Goblet Squat', 3, '10-12'],
      ['Bench Press', 4, '6-10'],
      ['Lat Pulldown', 4, '10-12'],
      ['Dumbbell Shoulder Press', 3, '10-12'],
      ['Plank', 3, '45-60 s'],
    ],
  },
  fullB: {
    title: 'Full Body B',
    focus: 'Posterior chain + horizontal pull',
    exercises: [
      ['Romanian Deadlift', 4, '8-10'],
      ['Incline Dumbbell Press', 3, '8-10'],
      ['Seated Cable Row', 4, '10-12'],
      ['Bulgarian Split Squat', 3, '10-12 / leg'],
      ['Dead Bug', 3, '12 / side'],
    ],
  },
  fullC: {
    title: 'Full Body C',
    focus: 'Vertical strength + core',
    exercises: [
      ['Back Squat', 4, '6-10'],
      ['Weighted Push-up', 3, '8-12'],
      ['Assisted Pull-up', 4, '6-10'],
      ['Hip Thrust', 3, '10-12'],
      ['Hanging Leg Raise', 3, '10-12'],
    ],
  },
  upperA: {
    title: 'Upper Body A',
    focus: 'Chest + back emphasis',
    exercises: [
      ['Bench Press', 4, '6-8'],
      ['Barbell Row', 4, '8-10'],
      ['Overhead Press', 3, '8-10'],
      ['Lat Pulldown', 3, '10-12'],
      ['Biceps + Triceps Superset', 3, '12'],
    ],
  },
  lowerA: {
    title: 'Lower Body A',
    focus: 'Squat pattern + chain',
    exercises: [
      ['Back Squat', 4, '6-8'],
      ['Romanian Deadlift', 3, '8-10'],
      ['Walking Lunge', 3, '10-12 / leg'],
      ['Leg Curl', 3, '12'],
      ['Calf Raise', 4, '12-15'],
    ],
  },
  upperB: {
    title: 'Upper Body B',
    focus: 'Volume-focused variations',
    exercises: [
      ['Incline Dumbbell Press', 4, '8-10'],
      ['Assisted Pull-up', 4, '6-10'],
      ['Seated Dumbbell Shoulder Press', 3, '8-10'],
      ['Cable Row', 3, '10-12'],
      ['Lateral Raise', 4, '12-15'],
    ],
  },
  lowerB: {
    title: 'Lower Body B',
    focus: 'Hinge + glute power',
    exercises: [
      ['Deadlift', 4, '4-6'],
      ['Front Squat', 3, '8-10'],
      ['Hip Thrust', 4, '8-10'],
      ['Bulgarian Split Squat', 3, '10-12 / leg'],
      ['Plank', 3, '60 s'],
    ],
  },
  push: {
    title: 'Push',
    focus: 'Chest, shoulders, triceps',
    exercises: [
      ['Bench Press', 4, '6-8'],
      ['Incline Dumbbell Press', 3, '8-10'],
      ['Overhead Press', 4, '8-10'],
      ['Lateral Raise', 4, '12-15'],
      ['Triceps Pushdown', 3, '10-12'],
    ],
  },
  pull: {
    title: 'Pull',
    focus: 'Back, rear delts, biceps',
    exercises: [
      ['Deadlift', 4, '4-6'],
      ['Assisted Pull-up', 4, '6-10'],
      ['Barbell Row', 4, '8-10'],
      ['Face Pull', 3, '12-15'],
      ['Barbell Curl', 3, '10-12'],
    ],
  },
  legs: {
    title: 'Legs',
    focus: 'Quads + posterior chain',
    exercises: [
      ['Back Squat', 4, '6-8'],
      ['Romanian Deadlift', 3, '8-10'],
      ['Leg Press', 3, '10-12'],
      ['Leg Curl', 3, '12'],
      ['Calf Raise', 4, '12-15'],
    ],
  },
  upperC: {
    title: 'Upper Body (Volume)',
    focus: 'Metabolic stress focus',
    exercises: [
      ['Incline Machine Press', 4, '10-12'],
      ['Seated Row', 4, '10-12'],
      ['Dumbbell Shoulder Press', 3, '10-12'],
      ['Cable Fly', 3, '12-15'],
      ['Biceps + Triceps Giant Set', 3, '12'],
    ],
  },
  cond: {
    title: 'Conditioning + Core',
    focus: 'Engine building',
    exercises: [
      ['HIIT Bike', 1, '10 x (30s hard / 60s easy)'],
      ["Farmer's Carry", 3, '100 ft'],
      ['Pallof Press', 3, '12 / side'],
      ['Hanging Leg Raise', 3, '10-12'],
      ['Incline Walk', 1, '10 min'],
    ],
  },
};

const SPLITS = {
  2: ['fullA', 'fullB'],
  3: ['fullA', 'fullB', 'fullC'],
  4: ['upperA', 'lowerA', 'upperB', 'lowerB'],
  5: ['push', 'pull', 'legs', 'upperC', 'cond'],
  6: ['push', 'pull', 'legs', 'push', 'pull', 'legs'],
};

const GOAL_TIPS = {
  fat: [
    'Step target: 9,000+ steps a day.',
    'Sleep 7-8 hours \u2014 short sleep raises hunger hormones by ~15%.',
    'Get 30-40 g protein per meal; skipping meals triggers evening cravings.',
    'Schedule one refeed day per week.',
  ],
  muscle: [
    'Increase main-lift loads by 2-3% each week.',
    'Take 30-40 g protein within 30-60 minutes after training.',
    'Creatine monohydrate: 5 g daily \u2014 timing does not matter.',
    'Deload every 6th week: cut volume by 40% and let your nervous system reset.',
  ],
  conditioning: [
    'Two Zone-2 sessions per week (30-45 min, conversational pace).',
    'Track heart-rate zones with your watch; Zone 2 rewards patience, not ego.',
    'Keep heavy compounds in the plan \u2014 conditioning without strength is half a program.',
    'Drink ~17 oz (500 ml) of water per training hour; add more when you sweat heavily.',
  ],
};

function buildPlan(goal, level, days, weightKg) {
  const g = GOALS[goal];
  const l = LEVELS[level];
  const w = weightKg || 75;

  const calories = Math.round((w * g.calFactor) / 10) * 10;
  const protein = Math.round((w * g.proteinFactor) / 5) * 5;
  const fatG = Math.round((w * g.fatFactor) / 5) * 5;
  const carbs = Math.max(50, Math.round((calories - protein * 4 - fatG * 9) / 4 / 5) * 5);

  const splitKeys = SPLITS[days];
  const split = splitKeys.map((key, i) => {
    const base = DAY_LIBRARY[key];
    return {
      name: 'Day ' + (i + 1) + ' \u2014 ' + base.title,
      focus: base.focus,
      note: 'Rest: ' + g.rest,
      exercises: base.exercises.map((ex) => {
        const rawSets = ex[1];
        let sets = Math.max(1, rawSets + l.setDelta);
        if (i === splitKeys.length - 1 && goal === 'conditioning') sets = Math.max(1, sets - 1);
        return { name: ex[0], sets: sets, reps: ex[2] };
      }),
    };
  });

  const tips = [...GOAL_TIPS[goal], l.tip];

  return {
    goal: goal,
    goal_label: g.label,
    level: level,
    level_label: l.label,
    days: days,
    weight: weightKg,
    calories: calories,
    macros: { protein: protein, carbs: carbs, fat: fatG },
    summary:
      days + '-day ' + g.label.toLowerCase() + ' program \u2022 ' + l.label.toLowerCase() +
      ' level \u2022 target: ' + calories.toLocaleString('en-US') + ' kcal/day',
    coach_note: g.note,
    split: split,
    tips: tips,
  };
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { goal, level, days, weight } = req.body || {};

      if (!GOALS[goal]) return res.status(400).json({ error: 'Invalid goal' });
      if (!LEVELS[level]) return res.status(400).json({ error: 'Invalid level' });
      const d = parseInt(days, 10);
      if (!Number.isInteger(d) || d < 2 || d > 6) {
        return res.status(400).json({ error: 'Days must be between 2 and 6' });
      }
      let w = null;
      if (weight !== null && weight !== undefined && weight !== '') {
        w = Number(weight);
        if (!Number.isFinite(w) || w < 30 || w > 250) {
          return res.status(400).json({ error: 'Weight must be between 30 and 250 kg' });
        }
      }

      const plan = buildPlan(goal, level, d, w);

      const { data, error } = await supabase
        .from('generated_plans')
        .insert({ goal: goal, level: level, days: d, plan: plan, created_at: new Date().toISOString() })
        .select('id')
        .single();
      if (error) throw error;

      return res.status(201).json({ id: data.id, plan: plan });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('generate-plan error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
