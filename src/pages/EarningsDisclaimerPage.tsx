import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

const SECTIONS = [
  {
    title: '제1조 (수익 및 성과 보장의 한계)',
    body: 'GrowthAI(이하 "회사")가 제공하는 교육 강좌, VOD 영상, 마케팅 프롬프트, 템플릿 및 관련 수강생 후기에 언급된 수익, 매출 수치, 리드 전환 수치는 특정 결과를 개인에게 일률적으로 보장하는 것이 아닙니다. 모든 사례는 개별 사용자의 특수한 조건과 실행 결과에 기반한 예시입니다.',
  },
  {
    title: '제2조 (개인의 노력 및 사업적 위험)',
    body: '본 서비스를 통해 학습한 마케팅 프레임워크 및 자동화 도구를 실행하여 얻는 최종 사업 성과는 개별 사용자의 실습 의지, 상품의 시장 적합성, 타깃 시장 상황, 지속적인 고객 관리 능력 등 다수의 외부 요인에 의존합니다. 사용자는 비즈니스 운영 및 마케팅 활동에 항상 위험 요소가 동반됨을 이해하고 동의합니다.',
  },
  {
    title: '제3조 (전문가 자문 대체 불가)',
    body: '회사에서 제공하는 강의 및 학습 자료는 마케팅 교육 및 정보 제공 목적으로 작성되었으며, 세무·법률·금융 관련 전문 자문을 대체하지 않습니다. 복잡한 계약이나 법률/세무 문제는 반드시 해당 분야 전문가의 자문을 받아야 합니다.',
  },
  {
    title: '제4조 (독립적 의사결정 및 면책)',
    body: '이용자는 회사의 콘텐츠를 참고하여 수행한 모든 사업적 투자, 마케팅 실행, 광고 집행, 제반 의사결정에 대해 스스로 전적으로 책임을 집니다. 회사는 이용자의 서비스 이용 결과 발생한 직접적, 간접적, 부수적 손실이나 손해에 대해 관련 법령이 허용하는 최대 범위 내에서 법적 책임을 지지 않습니다.',
  },
];

export default function EarningsDisclaimerPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 px-6">
      <Seo
        title="수익 및 성과 고지 | GrowthAI"
        description="GrowthAI 수익 및 성과 책임 한계 고지사항입니다."
        canonical="/earnings-disclaimer"
        image={DEFAULT_OG_IMAGE}
        noindex
      />
      <div className="max-w-3xl mx-auto">
        <p className="text-white/30 text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">LEGAL DISCLAIMER</p>
        <h1 className="apple-white-gradient font-extrabold tracking-tight leading-[1.1] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
          수익 및 성과 고지
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
      </div>
    </div>
  );
}
