/**
 * ScrollReveal — Toss.im 스타일 스크롤 애니메이션
 *
 * 토스가 쓰는 패턴:
 *  1. Y축 이동 (28-40px) + opacity fade
 *  2. blur(8px → 0) — 주요 헤딩에만
 *  3. scale(0.94 → 1) — 카드/이미지
 *  4. stagger delay — 자식 요소들 순차 등장
 *
 * 사용법:
 *  <ScrollReveal>          // 기본 fadeUp
 *  <ScrollReveal blur>     // blur + fadeUp (토스 헤딩 스타일)
 *  <ScrollReveal scale>    // 카드/섹션
 *  <ScrollReveal delay={0.2}>  // 딜레이
 *  <ScrollReveal stagger children={[...]} /> // 자식 순차 등장
 */

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

/* ─── 변형 프리셋 — Apple 스타일 ─── */
const VARIANTS: Record<string, Variants> = {
  // Apple: 블러 없이 조용한 fade + 약한 rise
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  // 기존 호환 (blur prop) — blur 크게 줄임
  fadeUpBlur: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  // Apple: scale은 미세하게
  scale: {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/* ─── Apple easing ─── */
const EASE = [0.4, 0, 0.15, 1] as const; // Apple 시그니처 easing

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;

  /** 애니메이션 종류 */
  variant?: keyof typeof VARIANTS;

  /** blur + fadeUp (토스 헤딩 스타일) */
  blur?: boolean;
  /** scale + fade (카드/이미지) */
  scale?: boolean;
  /** 왼쪽에서 슬라이드 */
  fromLeft?: boolean;
  /** 오른쪽에서 슬라이드 */
  fromRight?: boolean;

  /** 지연 시간 (초) */
  delay?: number;
  /** 애니메이션 지속 시간 */
  duration?: number;

  /** 뷰포트 마진 (미리 트리거) */
  margin?: string;

  /** 한번만 실행 여부 */
  once?: boolean;

  /** as 태그 (기본 div) */
  as?: keyof HTMLElementTagNameMap;
}

export function ScrollReveal({
  children,
  className = '',
  style,
  variant,
  blur,
  scale: scaleProp,
  fromLeft,
  fromRight,
  delay = 0,
  duration = 0.75,
  margin = '-80px',
  once = true,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: margin as any,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, controls, once]);

  /* 변형 선택 */
  let chosen: keyof typeof VARIANTS = variant ?? 'fadeUp';
  if (blur) chosen = 'fadeUpBlur';
  else if (scaleProp) chosen = 'scale';
  else if (fromLeft) chosen = 'slideLeft';
  else if (fromRight) chosen = 'slideRight';

  const MotionEl = motion[as as 'div'] as typeof motion.div;

  return (
    <MotionEl
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      variants={VARIANTS[chosen]}
      transition={{
        duration,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </MotionEl>
  );
}

/* ─────────────────────────────────────────
   StaggerReveal — 자식 요소 순차 등장
   토스: 카드 그리드, 기능 목록 등에 사용
─────────────────────────────────────────── */
const childVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.15, 1] },
  },
};

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  margin?: string;
  once?: boolean;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.12,
  margin = '-60px',
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, margin: margin as any });

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  useEffect(() => {
    if (inView) controls.start('visible');
    else if (!once) controls.start('hidden');
  }, [inView, controls, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — StaggerReveal 내부에 감싸는 자식 래퍼
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SectionTitle — 토스 스타일 섹션 제목 진입
   eyebrow → h2 순차 blur+up
─────────────────────────────────────────── */
interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  delay?: number;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  delay = 0,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  /* Apple easing */
  const appleEase = [0.4, 0, 0.15, 1] as const;

  return (
    <div ref={ref} className={center ? 'text-center' : ''}>
      {eyebrow && (
        <motion.p
          className="apple-eyebrow-gold mb-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay, ease: appleEase }}
        >
          {eyebrow}
        </motion.p>
      )}
      {/* Apple: 헤딩은 아래에서 조용히 올라옴 — 블러 없음 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: delay + 0.06, ease: appleEase }}
      >
        {title}
      </motion.div>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.16, ease: appleEase }}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
}
