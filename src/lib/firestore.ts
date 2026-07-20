// ============================================================
// Firestore Data Models & Helper Functions
// ============================================================
// Firestore 컬렉션 구조와 CRUD 헬퍼 함수 정의
//
// 컬렉션:
//   users         — 사용자 프로필 + 레퍼럴 정보
//   enrollments   — 강의 수강 접근권 (기간 관리)
//   referrals     — 레퍼럴 기록 + 커미션
//   orders        — 결제 주문
//   subscriptions — 구독 정보
// ============================================================

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import type { CommissionTier } from './referral';

// ── Collection Names ──
export const COLLECTIONS = {
  USERS: 'users',
  ORDERS: 'orders',
  SUBSCRIPTIONS: 'subscriptions',
  PRODUCTS: 'products',
  ENROLLMENTS: 'enrollments',
  REFERRALS: 'referrals',
  LEADS: 'leads',
} as const;

// ── Data Types ──

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // 레퍼럴 관련
  referralCode?: string;                      // 내 추천 코드 (UID 앞 8자 대문자)
  referredBy?: string;                        // 나를 초대한 사람의 UID
  referralTier?: CommissionTier;             // 커미션 등급 (normal/silver/gold)
  completedReferrals?: number;               // 누적 결제 완료된 레퍼럴 수
  totalCommission?: number;                  // 누적 커미션 합계 (원)
  unpaidCommission?: number;                 // 미지급 커미션 (원)
  subscription?: {
    planId: string;
    status: 'active' | 'cancelled' | 'expired';
    paypalSubscriptionId: string;
    startDate: Timestamp;
    endDate?: Timestamp;
  };
}

// ── 강의 수강 접근권 (Enrollment) ──
// 결제 완료 후 관리자가 등록, 기간 만료 시 자동 잠김
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;        // 강의 ID (예: 'youtube-shorts', 'n8n-automation')
  courseName: string;      // 강의명 (표시용)
  months: 3 | 6 | 12;     // 수강 기간 (개월)
  startDate: Timestamp;
  endDate: Timestamp;      // startDate + months 자동 계산
  status: 'active' | 'expired' | 'cancelled';
  createdAt: Timestamp;
  createdBy: string;       // 'admin' 또는 관리자 UID
  notes?: string;          // 관리자 메모
}

// ── 레퍼럴 기록 ──
export interface ReferralRecord {
  id: string;
  referrerId: string;          // 초대한 사람 UID
  referrerCode: string;        // 초대한 사람의 레퍼럴 코드
  refereeId: string;           // 초대받은 사람 UID
  refereeEmail: string;        // 초대받은 사람 이메일 (표시용)
  courseId: string;            // 결제한 강의 ID
  saleAmount: number;          // 결제 금액 (원)
  commissionRate: number;      // 적용 커미션율 (0.10 / 0.20 / 0.30)
  commissionAmount: number;    // 커미션 금액 (원)
  status: 'pending' | 'paid' | 'cancelled'; // pending: 지급 대기, paid: 지급 완료
  createdAt: Timestamp;
  paidAt?: Timestamp;          // 커미션 지급 완료 시각
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paypalOrderId: string;
  paypalPayerId?: string;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

export interface SubscriptionRecord {
  id: string;
  userId: string;
  planId: string;
  paypalSubscriptionId: string;
  status: 'active' | 'cancelled' | 'suspended' | 'expired';
  startDate: Timestamp;
  nextBillingDate?: Timestamp;
  cancelledAt?: Timestamp;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  goal?: string;
  source: string;
  createdAt: Timestamp;
}

// ── User Helpers ──

export async function createUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const ref = doc(db, COLLECTIONS.USERS, uid);
  await setDoc(ref, {
    uid,
    email: data.email || null,
    displayName: data.displayName || null,
    photoURL: data.photoURL || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data,
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, COLLECTIONS.USERS, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const ref = doc(db, COLLECTIONS.USERS, uid);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── Order Helpers ──

export async function createOrder(order: Omit<Order, 'createdAt'>): Promise<void> {
  const ref = doc(db, COLLECTIONS.ORDERS, order.id);
  await setDoc(ref, {
    ...order,
    createdAt: serverTimestamp(),
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  paypalPayerId?: string
): Promise<void> {
  const ref = doc(db, COLLECTIONS.ORDERS, orderId);
  const updates: DocumentData = { status };
  if (status === 'completed') {
    updates.completedAt = serverTimestamp();
  }
  if (paypalPayerId) {
    updates.paypalPayerId = paypalPayerId;
  }
  await updateDoc(ref, updates);
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, COLLECTIONS.ORDERS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Order);
}

// ── Subscription Helpers ──

export async function createSubscriptionRecord(
  sub: Omit<SubscriptionRecord, 'startDate'>
): Promise<void> {
  const ref = doc(db, COLLECTIONS.SUBSCRIPTIONS, sub.id);
  await setDoc(ref, {
    ...sub,
    startDate: serverTimestamp(),
  });
}

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  const ref = doc(db, COLLECTIONS.SUBSCRIPTIONS, subscriptionId);
  await updateDoc(ref, {
    status: 'cancelled',
    cancelledAt: serverTimestamp(),
  });
}

export async function getActiveSubscription(
  userId: string
): Promise<SubscriptionRecord | null> {
  const q = query(
    collection(db, COLLECTIONS.SUBSCRIPTIONS),
    where('userId', '==', userId),
    where('status', '==', 'active'),
    limit(1)
  );
  const snap = await getDocs(q);
  return snap.empty ? null : (snap.docs[0].data() as SubscriptionRecord);
}

// ── Product Helpers ──

export async function deleteProduct(productId: string): Promise<void> {
  const ref = doc(db, COLLECTIONS.PRODUCTS, productId);
  await deleteDoc(ref);
}

// ── Lead Capture Helpers ──

export async function createLeadCapture(
  data: Omit<LeadRecord, 'id' | 'createdAt'>
): Promise<string> {
  const ref = doc(collection(db, COLLECTIONS.LEADS));
  await setDoc(ref, {
    ...data,
    id: ref.id,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ── Enrollment Helpers (강의 수강 접근권) ──

// 개월 수를 더한 Date 계산 (JS Date 기반)
function addMonthsToDate(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * 수강 접근권 생성
 * 관리자가 결제 확인 후 호출 → endDate 자동 계산
 */
export async function createEnrollment(
  userId: string,
  courseId: string,
  courseName: string,
  months: 3 | 6 | 12,
  createdBy: string = 'admin',
  notes?: string
): Promise<string> {
  const ref = doc(collection(db, COLLECTIONS.ENROLLMENTS));
  const now = new Date();
  const endDate = addMonthsToDate(now, months);

  await setDoc(ref, {
    id: ref.id,
    userId,
    courseId,
    courseName,
    months,
    startDate: Timestamp.fromDate(now),
    endDate: Timestamp.fromDate(endDate),
    status: 'active',
    createdAt: serverTimestamp(),
    createdBy,
    notes: notes || null,
  });
  return ref.id;
}

/**
 * 특정 유저의 특정 강의 수강 접근권 조회
 */
export async function getEnrollment(
  userId: string,
  courseId: string
): Promise<Enrollment | null> {
  const q = query(
    collection(db, COLLECTIONS.ENROLLMENTS),
    where('userId', '==', userId),
    where('courseId', '==', courseId),
    where('status', '==', 'active'),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as Enrollment;
}

/**
 * 수강 접근권 유효성 체크
 * active이고 endDate가 현재 시각 이후인지 확인
 */
export function isEnrollmentValid(enrollment: Enrollment): boolean {
  const now = Timestamp.now();
  return enrollment.status === 'active' && enrollment.endDate.seconds > now.seconds;
}

/**
 * 유저의 모든 수강 접근권 조회
 */
export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  const q = query(
    collection(db, COLLECTIONS.ENROLLMENTS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Enrollment);
}

// ── Referral Helpers ──

/**
 * 레퍼럴 기록 생성 + 레퍼러 통계 업데이트
 * 초대받은 사람이 결제 완료 시 호출
 */
export async function createReferralRecord(
  data: Omit<ReferralRecord, 'id' | 'createdAt'>
): Promise<void> {
  const ref = doc(collection(db, COLLECTIONS.REFERRALS));
  await setDoc(ref, {
    ...data,
    id: ref.id,
    createdAt: serverTimestamp(),
  });

  // 레퍼럴 제공자의 통계 업데이트
  const referrerRef = doc(db, COLLECTIONS.USERS, data.referrerId);
  const referrerSnap = await getDoc(referrerRef);
  if (referrerSnap.exists()) {
    const profile = referrerSnap.data() as UserProfile;
    const newCompleted = (profile.completedReferrals || 0) + 1;
    const newTotal = (profile.totalCommission || 0) + data.commissionAmount;
    const newUnpaid = (profile.unpaidCommission || 0) + data.commissionAmount;
    await updateDoc(referrerRef, {
      completedReferrals: newCompleted,
      totalCommission: newTotal,
      unpaidCommission: newUnpaid,
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * 특정 유저가 받은 레퍼럴 기록 조회
 */
export async function getReferralsByReferrer(userId: string): Promise<ReferralRecord[]> {
  const q = query(
    collection(db, COLLECTIONS.REFERRALS),
    where('referrerId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as ReferralRecord);
}

/**
 * 커미션 지급 완료 처리 (관리자용)
 */
export async function markReferralPaid(
  referralId: string,
  userId: string,
  amount: number
): Promise<void> {
  const refRef = doc(db, COLLECTIONS.REFERRALS, referralId);
  await updateDoc(refRef, {
    status: 'paid',
    paidAt: serverTimestamp(),
  });

  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const profile = userSnap.data() as UserProfile;
    const newUnpaid = Math.max(0, (profile.unpaidCommission || 0) - amount);
    await updateDoc(userRef, {
      unpaidCommission: newUnpaid,
      updatedAt: serverTimestamp(),
    });
  }
}
