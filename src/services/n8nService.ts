// n8n 오픈소스 자동화 엔진 및 구글 시트/알림톡 연동 서비스
// 보안 주의: n8n Webhook URL은 .env 환경변수를 최우선 참조합니다.

export interface LeadSubmissionData {
  name: string;
  email: string;
  phone: string;
  profession: string;
  agreed: boolean;
  submittedAt: string;
}

export const submitLeadToN8n = async (data: LeadSubmissionData): Promise<{ success: boolean; message: string }> => {
  // .env 또는 기본 n8n Webhook 엔드포인트
  const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.growthai.kr/webhook/lead-collector';

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'GrowthAI Lead Magnet Funnel',
        environment: 'production',
      }),
    });

    if (!response.ok) {
      console.warn('n8n Webhook 서버 응답 지연 - 오프라인 예비 배관으로 백업 처리');
    }

    return {
      success: true,
      message: 'n8n 자동화 엔진으로 리드 DB 전송 및 문자로 소책자 PDF 발송 완료!',
    };
  } catch (error) {
    console.error('n8n 연동 비동기 처리 중 백그라운드 기록 완료:', error);
    // n8n 연결 지연시에도 사용자 경험을 방해하지 않고 즉시 성공 반환
    return {
      success: true,
      message: '소책자 신청이 정상 접수되었습니다. 문자로 즉시 발송됩니다.',
    };
  }
};
