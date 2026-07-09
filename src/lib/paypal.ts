// ============================================================
// PayPal Configuration — @paypal/react-paypal-js 기반
// ============================================================
// 
// 설정 방법:
// 1. https://developer.paypal.com/dashboard 에서 앱 생성
// 2. Client ID를 .env 파일에 넣기:
//    VITE_PAYPAL_CLIENT_ID=실제_클라이언트_ID
// 3. 프로덕션: VITE_PAYPAL_CLIENT_ID에 Live Client ID 사용
//
// ============================================================

export const PAYPAL_CONFIG = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  currency: 'USD',
  intent: 'capture' as const,
};

// ── 상품 타입 정의 ──

export interface PayPalProduct {
  id: string;
  name: string;
  description: string;
  price: string; // '29.99' 형식
  currency: string;
}

// ── 구독 플랜 타입 정의 ──

export interface PayPalSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  planId: string; // PayPal에서 생성한 구독 Plan ID
  price: string;
  currency: string;
  interval: 'MONTH' | 'YEAR';
}

// ── 예시 상품 목록 — 여기를 수정하세요 ──

export const PRODUCTS: PayPalProduct[] = [
  {
    id: 'ai-marketing-bootcamp',
    name: 'AI Marketing & Shorts BootCamp',
    description: 'Basic practical course for AI-driven marketing and YouTube shorts creation.',
    price: '290.00',
    currency: 'USD',
  },
  {
    id: 'ai-marketing-vvip-master',
    name: 'AI Business VVIP Masterclass',
    description: '1:1 VIP consulting, advanced monetization strategies, and private community access.',
    price: '2190.00',
    currency: 'USD',
  },
];

// ── 예시 구독 플랜 — 여기를 수정하세요 ──

export const SUBSCRIPTION_PLANS: PayPalSubscriptionPlan[] = [
  {
    id: 'ai-marketing-monthly',
    name: 'AI Academy Monthly Pass',
    description: 'Weekly updated AI trend updates, prompt libraries, and community access.',
    planId: 'YOUR_PAYPAL_PLAN_ID', // PayPal에서 생성한 구독 플랜 ID
    price: '39.00',
    currency: 'USD',
    interval: 'MONTH',
  },
  {
    id: 'ai-marketing-yearly',
    name: 'AI Academy Yearly Pass',
    description: 'Annual premium pass — save over 15%',
    planId: 'YOUR_PAYPAL_YEARLY_PLAN_ID',
    price: '390.00',
    currency: 'USD',
    interval: 'YEAR',
  },
];
