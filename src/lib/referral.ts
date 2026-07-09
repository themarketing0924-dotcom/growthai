// ============================================================
// referral.ts — 레퍼럴/커미션 유틸리티
// ============================================================
// 레퍼럴 코드 생성, 링크 생성, 커미션 티어 계산
//
// 커미션 티어:
//   일반 (0~4명 결제): 10%
//   실버 (5~9명 결제): 20%
//   골드 (10명+ 결제): 30%
// ============================================================

export type CommissionTier = 'normal' | 'silver' | 'gold';

export const COMMISSION_RATES: Record<CommissionTier, number> = {
  normal: 0.10, // 10%
  silver: 0.20, // 20%
  gold:   0.30, // 30%
};

export const COMMISSION_TIER_LABELS: Record<CommissionTier, string> = {
  normal: '🥉 일반 (10%)',
  silver: '🥈 실버 (20%)',
  gold:   '🥇 골드 (30%)',
};

export const COMMISSION_TIER_THRESHOLDS = {
  silver: 5,  // 5명 이상 결제 완료 → 실버
  gold:   10, // 10명 이상 결제 완료 → 골드
};

// ── 레퍼럴 코드 생성 ──
// Firebase UID 앞 8자를 대문자로 변환
export function generateReferralCode(uid: string): string {
  return uid.slice(0, 8).toUpperCase();
}

// ── 레퍼럴 링크 생성 ──
export function getReferralLink(referralCode: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}?ref=${referralCode}`;
}

// ── URL에서 레퍼럴 코드 추출 ──
export function getReferralCodeFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

// ── 커미션 티어 계산 ──
export function getCommissionTier(completedReferrals: number): CommissionTier {
  if (completedReferrals >= COMMISSION_TIER_THRESHOLDS.gold) return 'gold';
  if (completedReferrals >= COMMISSION_TIER_THRESHOLDS.silver) return 'silver';
  return 'normal';
}

// ── 커미션 금액 계산 ──
export function calculateCommission(
  saleAmount: number,
  tier: CommissionTier
): number {
  return Math.floor(saleAmount * COMMISSION_RATES[tier]);
}

// ── 클립보드 복사 ──
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    return success;
  }
}

// ── 다음 티어까지 남은 인원 계산 ──
export function getNextTierInfo(completedReferrals: number): {
  nextTier: CommissionTier | null;
  remaining: number;
} {
  if (completedReferrals >= COMMISSION_TIER_THRESHOLDS.gold) {
    return { nextTier: null, remaining: 0 };
  }
  if (completedReferrals >= COMMISSION_TIER_THRESHOLDS.silver) {
    return {
      nextTier: 'gold',
      remaining: COMMISSION_TIER_THRESHOLDS.gold - completedReferrals,
    };
  }
  return {
    nextTier: 'silver',
    remaining: COMMISSION_TIER_THRESHOLDS.silver - completedReferrals,
  };
}

// ── 금액 포맷 ──
export function formatKRW(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원';
}
