import supabase from './db-client.js';

const normalize = (s) => String(s).toLowerCase();

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const INTENTS = [
  {
    keys: ['thank', 'thanks a lot', 'appreciate', 'awesome'],
    replies: [
      "Anytime \u2014 you're the one doing the hard work.\n\nWant to keep going? Ask about training, nutrition, or recovery \u2014 or open the Build Plan tab and let's create this week's program.",
    ],
  },
  {
    keys: ['make me a plan', 'create a plan', 'build a plan', 'build me', 'custom plan', 'make a plan', 'need a plan',
      'want a plan', 'personal plan', 'program for me'],
    replies: [
      "Let's do it. Switch to the Build Plan tab above:\n\n\u2022 Pick your goal: fat loss, muscle gain, or conditioning\n\u2022 Set your level and how many days you can train\n\u2022 Get a personal training + nutrition plan in about 10 seconds\n\nYour plan is saved to Calorais and adapts as you log progress.",
    ],
  },
  {
    keys: ['creatine', 'supplement', 'bcaa', 'caffeine', 'whey', 'protein powder', 'pre-workout', 'pre workout', 'vitamin'],
    replies: [
      "Supplements won't fix a broken strategy \u2014 but used right, they help.\n\n\u2022 Creatine monohydrate: 5 g daily, the strongest evidence in sports nutrition\n\u2022 Whey protein: a practical way to hit your daily protein target\n\u2022 Caffeine: 3\u20136 mg/kg pre-workout measurably boosts performance\n\u2022 Vitamin D + omega-3: worthwhile if you're deficient\n\nSkip BCAAs \u2014 with enough protein, they're wasted money. Start with creatine.",
    ],
  },
  {
    keys: ['plateau', 'not progressing', 'no progress', 'stuck', 'stopped growing', 'stalled'],
    replies: [
      "A plateau means your body adapted \u2014 good news: it's breakable.\n\n\u2022 Swap exercise variations (bench \u2192 dumbbell bench, squat \u2192 front squat)\n\u2022 Take one deload week: cut volume ~40%, then rebuild\n\u2022 Recheck sleep and calories \u2014 most plateaus are nutrition in disguise\n\u2022 Use double progression: top the rep range, then add weight\n\nPaste your current program and let's revise it together.",
    ],
  },
  {
    keys: ['sleep', 'tired', 'fatigue', 'insomnia', 'rest day importance'],
    replies: [
      "Sleep is the cheapest performance enhancer \u2014 and most athletes' biggest gap.\n\n\u2022 Target 7\u20139 h; under 6 h can cut explosive power by ~20%\n\u2022 Dim screens 60 min before bed; cool the room to 65\u201366\u00b0F (18\u201319\u00b0C)\n\u2022 Cut caffeine after 2 p.m.\n\u2022 A 20\u201330 min nap after hard sessions speeds recovery\n\nCalorais automatically trims training volume after a bad night \u2014 you rest, the system adjusts.",
    ],
  },
  {
    keys: ['sore', 'pain', 'injury', 'injured', 'recover', 'doms', 'hurt', 'rest', 'ache', 'strain'],
    replies: [
      "Soreness (DOMS) can mean the work landed \u2014 but training through sharp pain leads to injury.\n\n\u2022 Still hurting after 48\u201372 h? Rest that area\n\u2022 Active recovery \u2014 walks, light cycling, mobility \u2014 boosts blood flow\n\u2022 Protein + water + sleep cover 80% of recovery\n\u2022 Never lift heavy cold; warm up dynamically for 8\u201310 min\n\nWhere does it hurt? Tell me and I'll suggest a mobility routine for that area.",
    ],
  },
  {
    keys: ['motivation', 'give up', 'quit', 'lazy', 'no energy', 'hard to start', 'cant be bothered', "can't be bothered", 'discipline', 'lost my motivation'],
    replies: [
      "Motivation gets you started; systems get you there. Let's build the system:\n\n\u2022 Shrink the goal: today, just 20 minutes\n\u2022 Book workouts like meetings \u2014 remove decision fatigue\n\u2022 Start a 30-day streak; you won't want to break the chain\n\u2022 Bag, clothes, playlist: ready the night before\n\nNot feeling the gym today? I can build a 15-minute home routine instead. Want one?",
    ],
  },
  {
    keys: ['lose fat', 'fat loss', 'lose weight', 'weight loss', 'cut', 'cutting', 'belly fat', 'lean', 'shred'],
    replies: [
      "Fat loss is math plus patience: a sustainable deficit wins.\n\n\u2022 300\u2013500 kcal daily deficit \u2192 1\u20131.5 lb lost per week\n\u2022 Protein: 0.8\u20131 g per lb bodyweight \u2014 keep muscle, burn fat\n\u2022 Lift 3\u20134 days a week; dieting without training burns muscle too\n\u2022 8\u201310k steps a day + 2 HIIT sessions a week\n\u2022 One refeed day weekly keeps metabolism and sanity intact\n\nTell me your weight and I'll calculate exact calorie and macro targets \u2014 or let the Build Plan tab do it.",
    ],
  },
  {
    keys: ['build muscle', 'gain muscle', 'muscle gain', 'bulk', 'bulking', 'mass', 'hypertrophy', 'get bigger', 'grow muscle'],
    replies: [
      "Muscle gain lives by three rules: progressive overload, enough protein, patience.\n\n\u2022 Small surplus: +250\u2013350 kcal (more becomes fat)\n\u2022 Protein: 0.7\u20131 g per lb, split across 4 meals\n\u2022 Add weight or reps weekly on the big lifts (squat, deadlift, bench, row)\n\u2022 10\u201320 hard sets per muscle group per week\n\u2022 Sleep 7\u20139 h \u2014 growth hormone works the night shift\n\nTell me your level (beginner / intermediate / advanced) and I'll outline the right weekly split.",
    ],
  },
  {
    keys: ['protein', 'macro', 'carb', 'calorie', 'nutrition', 'meal', 'diet', 'what should i eat', 'eating', 'food'],
    replies: [
      "Nutrition drives ~70% of results \u2014 but it doesn't have to be complicated.\n\n\u2022 Protein: 0.7\u20131 g per lb bodyweight (170 lb \u2192 120\u2013170 g)\n\u2022 Anchor each meal with 25\u201340 g protein: eggs, chicken, yogurt, legumes\n\u2022 Plate rule: half vegetables, quarter protein, quarter carbs\n\u2022 Cluster carbs around training \u2014 fuel the work\n\u2022 Weigh in once a week, morning, fasted \u2014 daily noise lies\n\nYour goal: fat loss or muscle? Say the word and I'll set your macros.",
    ],
  },
  {
    keys: ['cardio', 'running', 'hiit', 'walk', 'endurance', 'stamina', 'heart rate', 'conditioning'],
    replies: [
      "Cardio isn't the enemy \u2014 in the right dose it accelerates fat loss and fitness.\n\n\u2022 Zone 2 (conversational pace): 2\u20133 \u00d7 30\u201345 min weekly \u2014 the base of fat metabolism\n\u2022 HIIT: 1\u20132 \u00d7 15\u201320 min (30s fast / 60s easy) \u2014 great when time is short\n\u2022 On lifting days, do cardio after weights, not before\n\u2022 Incline walking: joint-friendly, calorie-hungry\n\nAny knee or ankle issues? I'll convert options to low-impact versions.",
    ],
  },
  {
    keys: ['program', 'split', 'workout', 'training plan', 'how many days', 'routine', 'exercise', 'beginner', 'just started', 'new to', 'start training', 'schedule', 'gym plan'],
    replies: [
      "Weekly structure depends on your level and available days:\n\n\u2022 3 days: Full Body A/B/C \u2014 most efficient for beginners\n\u2022 4 days: Upper / Lower \u00d72 \u2014 balance of volume and recovery\n\u2022 5 days: Push / Pull / Legs + Upper + Conditioning \u2014 intermediate & advanced\n\u2022 Training each muscle twice weekly beats any once-a-week bro split\n\nTell me your days and level and I'll explain the logic. Or hit Build Plan and I'll write the full set-by-set program in about 10 seconds.",
    ],
  },
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'yo', 'sup', 'howdy'],
    replies: [
      "Hey \u2014 I'm Calorais, your AI coach.\n\nI give straight answers on:\n\u2022 Personal training programs\n\u2022 Nutrition and macro targets\n\u2022 Fat loss / muscle gain strategy\n\u2022 Recovery, sleep, and motivation\n\nWhat are we working on today?",
    ],
  },
];

const FALLBACKS = [
  "Let's angle that differently. Try one of these:\n\n\u2022 \"Suggest a 5-day program\"\n\u2022 \"How much protein should I eat?\"\n\u2022 \"I want to lose fat\"\n\u2022 \"I've lost motivation\"\n\nWhere should we start?",
  "Didn't quite catch that \u2014 let's keep it in training language.\n\nTry: 'training program', 'nutrition advice', 'should I take creatine', 'cardio strategy'.\n\nOr open the Build Plan tab for an instant custom program.",
  "Coach mode is always on. Write your goal in one line: lose fat, build muscle, get fitter...\n\nAdd your level (beginner / intermediate / advanced) for a sharper answer.",
];

function buildReply(message) {
  const n = normalize(message);
  for (const intent of INTENTS) {
    if (intent.keys.some((k) => n.includes(k))) {
      return pick(intent.replies);
    }
  }
  return pick(FALLBACKS);
}

function isMissingChatTable(error) {
  return error?.code === 'PGRST205';
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const sessionId = String(req.query.session_id || '').trim();
      if (!/^[A-Za-z0-9-]{8,80}$/.test(sessionId)) {
        return res.status(400).json({ error: 'A valid session_id is required' });
      }
      const { data, error } = await supabase
        .from('chat_messages')
        .select('role, content, created_at')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })
        .limit(50);
      // Chat history is optional on the marketing site. Keep the coach usable
      // when the persistence table has not been provisioned yet.
      if (isMissingChatTable(error)) return res.status(200).json([]);
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { session_id, message } = req.body || {};
      const sessionId = String(session_id || '').trim();
      const text = String(message || '').trim().slice(0, 1000);
      if (!/^[A-Za-z0-9-]{8,80}$/.test(sessionId) || !text) {
        return res.status(400).json({ error: 'A valid session_id and message are required' });
      }

      const now = new Date().toISOString();
      const { error: userError } = await supabase
        .from('chat_messages')
        .insert({ session_id: sessionId, role: 'user', content: text, created_at: now });
      if (userError && !isMissingChatTable(userError)) throw userError;

      const reply = buildReply(text);
      const replyAt = new Date(Date.now() + 1200).toISOString();
      // If the first insert established that persistence is unavailable, do
      // not make a second failing request. The reply itself is deterministic
      // and does not depend on stored history.
      if (!isMissingChatTable(userError)) {
        const { error: botError } = await supabase
          .from('chat_messages')
          .insert({ session_id: sessionId, role: 'assistant', content: reply, created_at: replyAt });
        if (botError && !isMissingChatTable(botError)) throw botError;
      }

      return res.status(201).json({ role: 'assistant', content: reply, created_at: replyAt });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('chat error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
