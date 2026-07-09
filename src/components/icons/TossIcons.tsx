/* ─────────────────────────────────────────────────────
   토스 스타일 SVG 아이콘
   - stroke 기반 / strokeWidth 1.6 / 라운드 캡
   - fill="none" / currentColor
───────────────────────────────────────────────────── */

interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* 전체 — 4분할 그리드 */
export function IconGrid({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

/* 기획 — 막대 차트 */
export function IconBarChart({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M6 20V14" />
      <path d="M12 20V4" />
      <path d="M18 20V10" />
    </svg>
  );
}

/* AI홈페이지 — 모니터 */
export function IconMonitor({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

/* SEO·콘텐츠 — 펜 편집 */
export function IconPen({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

/* 홍보 — 메가폰 */
export function IconMegaphone({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M22 12h-4" />
      <path d="M18 6.3L19.9 5M18 17.7l1.9 1.3" />
      <path d="M14 5L5.5 8.5H3a1 1 0 00-1 1v5a1 1 0 001 1h2.5L14 19V5z" />
      <path d="M6 8.5v7" />
    </svg>
  );
}

/* 수익화 — 원화 동전 */
export function IconWon({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8l1.5 8M15 8l-1.5 8" />
      <path d="M8 11h8M8 13h8" />
    </svg>
  );
}

/* 화살표 오른쪽 위 (Visit ↗) */
export function IconArrowUpRight({ size = 14, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

/* 체크 원형 (무료 뱃지) */
export function IconCheck({ size = 14, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  );
}

/* 재생 클래스 수 */
export function IconPlay({ size = 14, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5 3.5-5 3.5V8.5z" strokeWidth={1.4} />
    </svg>
  );
}

/* 시간 */
export function IconClock({ size = 14, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

/* 시간이 없다 — 모래시계 */
export function IconHourglass({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M5 3h14M5 21h14" />
      <path d="M6 3l6 8 6-8" />
      <path d="M6 21l6-8 6 8" />
      <path d="M9 13.5h6" />
    </svg>
  );
}

/* 수익 정체 — 하락 그래프 */
export function IconChartDown({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
      <path d="M3 20h18" strokeWidth={1.2} opacity={0.4} />
    </svg>
  );
}

/* AI 어렵다 — 연결된 노드 (AI 네트워크) */
export function IconAiNetwork({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6" />
      <path d="M8 14h8" strokeDasharray="2 1.5" />
    </svg>
  );
}

/* 카테고리별 아이콘 맵 */
export const CategoryIcon = {
  plan:    IconBarChart,
  build:   IconMonitor,
  seo:     IconPen,
  promote: IconMegaphone,
  revenue: IconWon,
} as const;
