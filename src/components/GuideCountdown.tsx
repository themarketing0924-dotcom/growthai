// ============================================================
// GuideCountdown — 5일 무료 강의 퍼널 전용 카운트다운 / 등록자 카운터
// localStorage에 마감 시각을 고정해, 새로고침해도 같은 마감이 유지되도록 함
// ============================================================
import { useEffect, useState } from 'react';

const GOLD = '#C9A84C';

function getOrSetDeadline(key: string, days: number): number {
  const stored = localStorage.getItem(key);
  if (stored) {
    const ts = Number(stored);
    if (ts > Date.now()) return ts;
  }
  const deadline = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(key, String(deadline));
  return deadline;
}

function splitRemaining(ms: number) {
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / (24 * 60 * 60 * 1000)),
    hours: Math.floor((clamped / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((clamped / (60 * 1000)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function useCountdown(storageKey: string, days: number) {
  const [deadline] = useState(() => getOrSetDeadline(storageKey, days));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return splitRemaining(deadline - now);
}

export function CountdownBadges({ storageKey, days, size = 'md' }: { storageKey: string; days: number; size?: 'sm' | 'md' }) {
  const t = useCountdown(storageKey, days);
  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    { label: '일', value: t.days },
    { label: '시간', value: t.hours },
    { label: '분', value: t.minutes },
    { label: '초', value: t.seconds },
  ];
  const box = size === 'sm' ? 'px-2 py-1 min-w-[38px]' : 'px-3 py-2 min-w-[52px]';
  const num = size === 'sm' ? 'text-[13px]' : 'text-[20px]';
  const lbl = size === 'sm' ? 'text-[8px]' : 'text-[10px]';

  return (
    <div className="flex items-center gap-1.5">
      {units.map((u) => (
        <div
          key={u.label}
          className={`flex flex-col items-center rounded-lg ${box}`}
          style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          <span className={`font-extrabold tabular-nums ${num}`} style={{ color: GOLD }}>{pad(u.value)}</span>
          <span className={`text-white/40 tracking-wide ${lbl}`}>{u.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── 등록자 수 시뮬레이션 (선착순 마감 긴박감 연출용) ──
const SEAT_LIMIT = 300;
const SEAT_KEY = 'guideRegisteredCount';
const SEAT_TS_KEY = 'guideRegisteredCountTs';

export function useRegisteredCount() {
  const [count, setCount] = useState(() => {
    const stored = Number(localStorage.getItem(SEAT_KEY) || 247);
    return Number.isFinite(stored) ? Math.min(stored, SEAT_LIMIT) : 247;
  });

  useEffect(() => {
    const tick = () => {
      const lastTs = Number(localStorage.getItem(SEAT_TS_KEY) || 0);
      if (Date.now() - lastTs < 25000) return;
      setCount((prev) => {
        if (prev >= SEAT_LIMIT) return prev;
        const next = Math.min(prev + 1, SEAT_LIMIT);
        localStorage.setItem(SEAT_KEY, String(next));
        localStorage.setItem(SEAT_TS_KEY, String(Date.now()));
        return next;
      });
    };
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return { count, remaining: Math.max(0, SEAT_LIMIT - count), limit: SEAT_LIMIT };
}
