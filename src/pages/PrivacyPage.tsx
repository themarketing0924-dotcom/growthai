import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const SECTIONS = [
  {
    title: '1. 수집하는 개인정보 항목',
    body: '회사는 회원가입, 강의 신청, 결제, 고객상담 과정에서 아래 항목을 수집합니다.\n- 필수: 이름, 이메일 주소, 로그인 인증 정보(Google/Apple/이메일)\n- 결제 시: 결제 수단 정보(카드사·PayPal 처리 결과값, 카드번호 등 민감정보는 회사가 직접 저장하지 않으며 토스페이먼츠·PayPal이 처리합니다)\n- 자동 수집: 접속 로그, 쿠키, 기기 정보, 서비스 이용 기록',
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    body: '- 회원 식별 및 서비스 제공(강의 수강, 커뮤니티 이용)\n- 결제 처리 및 환불·정산 관리\n- 공지사항 전달, 고객 문의 응대\n- 서비스 개선 및 통계 분석(비식별 처리)',
  },
  {
    title: '3. 개인정보의 보유 및 이용 기간',
    body: '회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 전자상거래법 등 관계 법령에 따라 아래와 같이 보관합니다.\n- 계약 또는 청약철회 등에 관한 기록: 5년\n- 대금결제 및 재화 등의 공급에 관한 기록: 5년\n- 소비자 불만 또는 분쟁처리에 관한 기록: 3년',
  },
  {
    title: '4. 개인정보의 제3자 제공',
    body: '회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 결제 처리를 위해 토스페이먼츠(국내), PayPal(해외)에 결제에 필요한 최소한의 정보가 전달되며, 법령에 근거하거나 수사기관의 요청이 있는 경우 예외로 합니다.',
  },
  {
    title: '5. 개인정보 처리 위탁',
    body: '회사는 서비스 운영을 위해 아래와 같이 개인정보 처리를 위탁하고 있습니다.\n- Firebase(Google): 회원 인증 및 데이터베이스 운영\n- 토스페이먼츠: 국내 결제 처리\n- PayPal: 해외 결제 처리',
  },
  {
    title: '6. 이용자의 권리와 행사 방법',
    body: '이용자는 언제든지 등록된 자신의 개인정보를 조회, 수정, 삭제, 처리정지를 요청할 수 있으며, 회원 탈퇴를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다. 요청은 고객센터(contact@growthai.kr)를 통해 접수됩니다.',
  },
  {
    title: '7. 개인정보의 안전성 확보 조치',
    body: '회사는 개인정보 보호를 위해 접근권한 관리, 데이터 암호화, 접속기록 보관 등 관리적·기술적 조치를 취하고 있습니다.',
  },
  {
    title: '8. 개인정보 보호책임자',
    body: '회사는 개인정보 처리에 관한 업무를 총괄하는 개인정보 보호책임자를 지정하고 있습니다.\n- 이메일: contact@growthai.kr',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 px-6">
      <Seo
        title="개인정보처리방침 | GrowthAI"
        description="GrowthAI 개인정보처리방침입니다."
        canonical="/privacy"
        image={DEFAULT_OG_IMAGE}
        noindex
      />
      <div className="max-w-3xl mx-auto">
        <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">LEGAL</p>
        <h1 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
          개인정보처리방침
        </h1>
        <p className="text-white/40 text-[13px] mb-14">시행일: 2026년 1월 1일</p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-white font-bold text-[17px] mb-3">{s.title}</h2>
              <p className="text-white/55 text-[14px] leading-relaxed whitespace-pre-line">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="text-white/25 text-[12px] mt-16 leading-relaxed border-t border-white/10 pt-6">
          본 방침은 일반적인 온라인 서비스 표준 조항을 바탕으로 작성된 초안입니다. 개인정보 보호책임자 성명, 사업자 정보 등 정확한 사항 반영과 법률 검토 후 최종 게시하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
