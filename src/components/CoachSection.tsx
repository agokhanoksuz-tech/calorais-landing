import { useState } from 'react';
import { MessageSquareText, SlidersHorizontal, ChevronRight } from 'lucide-react';
import ChapterHeading from './ChapterHeading';
import ChatPanel from './ChatPanel';
import PlanBuilder from './PlanBuilder';

const TOPICS = [
  { label: 'I want to lose fat', q: 'Suggest a weekly fat loss strategy' },
  { label: 'I want to build muscle', q: 'How should I structure my training to build muscle?' },
  { label: 'Fix my nutrition', q: 'How should I set up my nutrition and macros?' },
  { label: 'Supplements are confusing', q: 'Should I take creatine?' },
  { label: 'Coming back from soreness', q: 'I have muscle soreness — should I rest?' },
  { label: 'Where do I start?', q: "I'm new to training — what program do you suggest?" },
];

const COACH_STATS: Array<[string, string]> = [
  ['Response time', '~2 s'],
  ['Movement library', '900+ exercises'],
  ['Meal patterns', '2,400+'],
  ['Engine', 'Calorais OS'],
];

export default function CoachSection() {
  const [tab, setTab] = useState<'chat' | 'plan'>('chat');
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);

  const askCoach = (q: string) => {
    setTab('chat');
    setExternalPrompt(q);
  };

  return (
    <section id="console" className="relative py-20 md:py-28 bg-coal/50 border-y border-line overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] bg-volt/[0.04] blur-[130px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <ChapterHeading
          eyebrow="The Console"
          title="Ask the system anything."
          description="A working console on the same engine — ask a question, or generate this week’s protocol in seconds."
        />

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl items-start">
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-2xl border border-line bg-carbon p-6">
              <div className="flex items-center gap-4">
                <span className="relative block w-12 h-12 shrink-0">
                  <img src="/logo.png" alt="Calorais" className="w-12 h-12 rounded-xl" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-70" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-volt border-2 border-carbon" />
                  </span>
                </span>
                <div>
                  <div className="font-display font-bold text-white tracking-tight">Calorais Console</div>
                  <div className="text-xs text-mist mt-0.5">quiet until you need it</div>
                </div>
              </div>
              <div className="mt-6">
                {COACH_STATS.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between py-2.5 border-t border-line/60 font-mono text-xs"
                  >
                    <span className="text-mist tracking-wider">{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-carbon p-6">
              <p className="font-mono text-[11px] tracking-[0.25em] text-mist uppercase mb-4">
                Common questions
              </p>
              <div className="space-y-2">
                {TOPICS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => askCoach(t.q)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-line bg-ink px-4 py-3 text-left text-sm text-white/90 hover:border-volt/50 hover:text-volt transition-all duration-200 group active:scale-[0.98]"
                  >
                    <span>{t.label}</span>
                    <ChevronRight className="w-4 h-4 text-mist group-hover:text-volt group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-mist leading-relaxed">
                No forms, no setup — just ask, like you’d ask a friend who happens to know
                everything about training.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="inline-flex bg-carbon border border-line rounded-full p-1 mb-5">
              <button
                onClick={() => setTab('chat')}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  tab === 'chat' ? 'bg-volt text-ink' : 'text-mist hover:text-white'
                }`}
              >
                <MessageSquareText className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={() => setTab('plan')}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  tab === 'plan' ? 'bg-volt text-ink' : 'text-mist hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Build a week
              </button>
            </div>

            {tab === 'chat' ? (
              <ChatPanel externalPrompt={externalPrompt} onHandledExternal={() => setExternalPrompt(null)} />
            ) : (
              <PlanBuilder onAskCoach={askCoach} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
