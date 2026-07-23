import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, RotateCcw } from 'lucide-react';
import { api } from '../lib/api';
import type { ChatMessage } from '../lib/types';

function dayGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Up late';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function welcomeMsg(): ChatMessage {
  return {
    role: 'assistant',
    content: `${dayGreeting()} — I'm Calorais, your coach.\n\nReal talk, no fluff: training, nutrition, supplements, recovery — what's on your mind today? Tap a suggestion below or just type it like you'd text a friend.`,
  };
}

const QUICK_PROMPTS = [
  'Fat loss strategy, please',
  'How much protein do I need?',
  'Suggest a 5-day program',
  "I've lost my motivation",
];

function getSessionId(): string {
  try {
    let s = localStorage.getItem('calorais_session');
    if (!s) {
      s = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : 'sess-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('calorais_session', s);
    }
    return s;
  } catch {
    return 'sess-' + Math.random().toString(36).slice(2);
  }
}

const bubbleSpring = { type: 'spring' as const, stiffness: 320, damping: 26 };

interface Props {
  externalPrompt: string | null;
  onHandledExternal: () => void;
}

export default function ChatPanel({ externalPrompt, onHandledExternal }: Props) {
  const [sid] = useState(getSessionId);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [welcomeMsg()]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .chatHistory(sid)
      .then((rows) => {
        if (rows && rows.length > 0) {
          setMessages(rows.map((r) => ({ role: r.role, content: r.content })));
        }
      })
      .catch(() => {});
  }, [sid]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }, [messages, typing]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setTyping(true);
    try {
      const reply = await api.sendChat(sid, text);
      setMessages((m) => [...m, { role: 'assistant', content: reply.content }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Connection hiccup — could you try again in a few seconds?',
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    if (externalPrompt) {
      onHandledExternal();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void send(externalPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPrompt]);

  const resetChat = () => {
    try {
      localStorage.removeItem('calorais_session');
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
    setMessages([welcomeMsg()]);
  };

  return (
    <div className="rounded-2xl border border-line bg-carbon overflow-hidden flex flex-col h-[620px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-ink/60">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Calorais" className="w-8 h-8 rounded-lg" />
          <div>
            <div className="text-sm font-bold text-white leading-none">Calorais Console</div>
            <div className="text-[11px] text-mist mt-0.5">Calorais OS · quiet until you need it</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-mist">
            <span className="w-1.5 h-1.5 rounded-full bg-volt animate-pulseline" />
            LIVE
          </span>
          <button
            onClick={resetChat}
            title="Reset conversation"
            className="w-8 h-8 rounded-lg border border-line text-mist hover:text-volt hover:border-volt/50 flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-4 md:px-5 py-5 space-y-5">
        {messages.map((m, i) =>
          m.role === 'assistant' ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={bubbleSpring}
              className="flex gap-3"
            >
              <img src="/logo.png" alt="" className="w-7 h-7 shrink-0 rounded-lg mt-0.5" />
              <div className="rounded-2xl rounded-tl-md bg-steel/50 border border-line px-4 py-3 text-sm leading-relaxed text-white/90 whitespace-pre-line max-w-[85%]">
                {m.content}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={bubbleSpring}
              className="flex justify-end"
            >
              <div className="rounded-2xl rounded-tr-md bg-volt text-ink px-4 py-3 text-sm font-medium max-w-[85%]">
                {m.content}
              </div>
            </motion.div>
          )
        )}

        {typing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
            <img src="/logo.png" alt="" className="w-7 h-7 shrink-0 rounded-lg mt-0.5" />
            <div className="rounded-2xl rounded-tl-md bg-steel/50 border border-line px-5 py-4 flex items-center gap-1.5">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-mist" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-mist" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-mist" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="border-t border-line bg-ink/60 px-4 md:px-5 pt-3 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q}
              onClick={() => void send(q)}
              disabled={typing}
              className="font-mono text-[11px] border border-line rounded-full px-3.5 py-1.5 text-mist hover:text-volt hover:border-volt/50 transition-colors active:scale-95 disabled:opacity-40"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach — e.g. 'should I take creatine?'"
            className="flex-1 bg-carbon border border-line rounded-full px-5 py-3.5 text-sm text-white placeholder:text-mist/60 focus:outline-none focus:border-volt/60 focus:shadow-[0_0_0_3px_rgba(200,255,61,0.12)] transition-all"
          />
          <motion.button
            type="submit"
            disabled={typing || !input.trim()}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 shrink-0 rounded-full bg-volt text-ink flex items-center justify-center hover:shadow-[0_0_24px_rgba(200,255,61,0.4)] transition-all disabled:opacity-40 disabled:shadow-none"
            aria-label="Send"
          >
            <SendHorizonal className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
