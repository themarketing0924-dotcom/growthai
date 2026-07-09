// ============================================================
// 토스페이먼츠 Configuration
// ============================================================
//
// 설정 방법:
// 1. https://developers.tosspayments.com 에서 상점 등록
// 2. 테스트/실제 클라이언트 키를 .env 파일에 넣기:
//    VITE_TOSS_CLIENT_KEY=test_ck_... (테스트)
//    VITE_TOSS_CLIENT_KEY=live_ck_... (실서비스)
//
// 토스페이먼츠 SDK 문서:
// https://docs.tosspayments.com/reference/widget-sdk
// ============================================================

export const TOSS_CONFIG = {
  clientKey: import.meta.env.VITE_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq',
  customerKey: '', // 비회원은 빈 문자열, 회원은 고유 ID
  // 결제 성공/실패 시 리다이렉트 URL
  successUrl: `${window.location.origin}/payment/success`,
  failUrl: `${window.location.origin}/payment/fail`,
};

// ── 상품 타입 정의 ──

export interface TossProduct {
  id: string;
  name: string;       // 주문명 (토스 결제창에 표시)
  price: number;       // 원 단위 (예: 29900)
  currency: string;    // 'KRW'
}

// ── 예시 상품 목록 — 여기를 수정하세요 ──

export const TOSS_PRODUCTS: TossProduct[] = [
  {
    id: 'ai-marketing-basic-kr',
    name: 'AI 마케팅 & 유튜브 숏폼 실전반',
    price: 390000,
    currency: 'KRW',
  },
  {
    id: 'ai-marketing-master-kr',
    name: 'AI 비즈니스 VVIP 마스터클래스 (1:1 코칭 포함)',
    price: 2900000,
    currency: 'KRW',
  },
  {
    id: 'ai-marketing-monthly-kr',
    name: 'AI 아카데미 월간 멤버십 (구독)',
    price: 49000,
    currency: 'KRW',
  },
];

// ── 주문 ID 생성 헬퍼 ──

export function generateOrderId(): string {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `order_${now}_${random}`;
}
