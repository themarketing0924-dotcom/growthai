import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const SECTIONS = [
  {
    title: '제1조 (목적)',
    body: '이 약관은 GrowthAI(이하 "회사")가 제공하는 온라인 강의, 콘텐츠, 커뮤니티 등 일체의 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 (용어의 정의)',
    body: '① "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.\n② "회원"이란 회사에 개인정보를 제공하여 회원가입을 한 자로서, 서비스를 계속적으로 이용할 수 있는 자를 말합니다.\n③ "콘텐츠"란 회사가 서비스를 통해 제공하는 강의 영상, 교재, 프롬프트, 자료 등 일체를 말합니다.',
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    body: '① 이 약관은 서비스 화면 또는 홈페이지에 게시함으로써 효력이 발생합니다.\n② 회사는 관련 법령을 위반하지 않는 범위에서 이 약관을 변경할 수 있으며, 변경 시 적용일자 및 변경사유를 명시하여 최소 7일 전에 공지합니다. 이용자에게 불리한 변경의 경우 30일 전에 공지합니다.',
  },
  {
    title: '제4조 (서비스의 제공 및 변경)',
    body: '① 회사는 온라인 강의, 프롬프트 템플릿, 커뮤니티, 자동화 자료 등을 제공합니다.\n② 회사는 운영상, 기술상의 필요에 따라 제공하는 서비스의 내용을 변경할 수 있으며, 이 경우 사전에 공지합니다.\n③ 회사는 콘텐츠의 품질 향상을 위해 강의 자료를 업데이트할 수 있으며, 상품별 안내된 정책에 따라 무료로 제공됩니다.',
  },
  {
    title: '제5조 (결제 및 환불)',
    body: '① 서비스 이용 요금은 각 상품 페이지에 안내된 금액에 따르며, 국내 결제는 토스페이먼츠, 해외 결제는 PayPal을 통해 처리됩니다.\n② 콘텐츠 특성상 수강 시작(콘텐츠 접근) 후에는 전자상거래법 등 관련 법령이 정하는 청약철회 제한 사유에 해당할 수 있습니다.\n③ 환불 정책은 상품 페이지에 안내된 조건(예: 30일 성과 보장 등)을 따르며, 세부 절차는 고객센터 문의를 통해 안내합니다.',
  },
  {
    title: '제6조 (회원의 의무)',
    body: '① 이용자는 관계 법령, 이 약관의 규정, 이용안내 등 회사가 공지한 사항을 준수하여야 합니다.\n② 이용자는 회사의 콘텐츠를 회사의 사전 동의 없이 복제, 배포, 재판매, 전송하여서는 안 됩니다.\n③ 이용자는 계정을 타인과 공유하거나 양도할 수 없습니다.',
  },
  {
    title: '제7조 (지식재산권)',
    body: '서비스 내 모든 콘텐츠(강의 영상, 교재, 프롬프트, 디자인 등)에 대한 저작권 및 지식재산권은 회사 또는 정당한 권리자에게 귀속되며, 이용자는 서비스 이용을 통해 얻은 정보를 회사의 사전 동의 없이 상업적으로 이용할 수 없습니다.',
  },
  {
    title: '제8조 (면책조항)',
    body: '① 회사는 천재지변, 전쟁, 서비스 제공자의 귀책사유 없는 시스템 장애 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.\n② 회사는 강의 내용을 참고하여 이용자가 수행한 사업적 의사결정 및 그 결과(매출, 수익 등)에 대해 보증하지 않으며, 이에 대한 책임을 지지 않습니다.',
  },
  {
    title: '제9조 (분쟁 해결)',
    body: '이 약관과 관련하여 분쟁이 발생할 경우, 회사와 이용자는 원만한 해결을 위해 성실히 협의하며, 협의가 이루어지지 않을 경우 관련 법령 및 상관례에 따릅니다.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 px-6">
      <Seo
        title="이용약관 | GrowthAI"
        description="GrowthAI 서비스 이용약관입니다."
        canonical="/terms"
        image={DEFAULT_OG_IMAGE}
        noindex
      />
      <div className="max-w-3xl mx-auto">
        <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">LEGAL</p>
        <h1 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
          이용약관
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
          본 약관은 일반적인 온라인 강의 서비스 표준 조항을 바탕으로 작성된 초안입니다. 사업자등록번호, 통신판매업 신고번호 등 정확한 사업자 정보 반영과 법률 검토 후 최종 게시하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
