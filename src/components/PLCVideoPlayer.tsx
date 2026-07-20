// ============================================================
// PLCVideoPlayer — DAY1~3 예열 영상(PLC) 자리에 쓰는 플레이스홀더 플레이어
// 실제 영상 파일이 연결되기 전까지 재생 버튼 + 진행 바 UI만 보여줌
// ============================================================
import { useState } from 'react';
import { PlayCircle, Pause } from 'lucide-react';

const GOLD = '#C9A84C';

export function PLCVideoPlayer({ label, title, duration }: { label: string; title: string; duration: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div
        className="relative aspect-video flex items-center justify-center cursor-pointer group"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(201,168,76,0.14) 0%, #0a0a0a 75%)' }}
        onClick={() => setPlaying((p) => !p)}
      >
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
          <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: GOLD }}>
            {label}
          </span>
        </div>
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/40 text-[12px] font-semibold tabular-nums">
          {duration}
        </div>
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
          style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
        >
          {playing ? <Pause size={30} fill="#0a0a0a" /> : <PlayCircle size={34} strokeWidth={1.5} />}
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-7 pb-5">
          <p className="text-white font-bold text-[15px] sm:text-[18px] leading-snug">{title}</p>
        </div>
      </div>
      <div className="h-1 bg-white/5">
        <div className="h-full transition-all duration-500" style={{ width: playing ? '38%' : '0%', backgroundColor: GOLD }} />
      </div>
    </div>
  );
}
