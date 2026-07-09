import { useNavigate } from 'react-router-dom';
import { ConnectAILabLogo } from './ConnectAILabLogo';
import { NAV_GROUPS } from '../config/navGroups';
import { SITE_CONFIG } from '../config/content';
import { ScrollReveal, StaggerReveal, StaggerItem } from './ScrollReveal';

interface FooterProps {
  lang: 'ko' | 'en';
}

export function Footer({ lang }: FooterProps) {
  const navigate = useNavigate();
  const content = SITE_CONFIG[lang];

  return (
    <footer style={{ backgroundColor: '#18191b', color: '#ffffff' }} className="text-white border-t border-white/5">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-16">
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-6" staggerDelay={0.08}>

          {/* Nav 카테고리 4열 */}
          {NAV_GROUPS.map((group) => (
            <StaggerItem key={group.id}>
              <h4 className="font-bold text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: '#C9A84C' }}>
                {lang === 'ko' ? group.labelKo : group.labelEn}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-white/45 text-[13px] sm:text-[14px] hover:text-white transition-colors leading-relaxed text-left bg-transparent border-none cursor-pointer p-0"
                    >
                      {lang === 'ko' ? item.labelKo : item.labelEn}
                    </button>
                    <p className="text-white/20 text-[11px] mt-0.5 leading-snug">
                      {lang === 'ko' ? item.descKo : item.descEn}
                    </p>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}

          {/* Brand 열 */}
          <StaggerItem className="col-span-2 md:col-span-1 flex flex-col gap-4">
            {/* 로고 */}
            <div className="flex items-center gap-2">
              <ConnectAILabLogo size={20} className="text-white" />
              <span className="font-bold text-[15px] tracking-tight" style={{ color: '#C9A84C' }}>{content.brandName}</span>
            </div>

            <p className="text-white/75 text-[13px] leading-relaxed font-medium">
              {lang === 'ko'
                ? 'GrowthAI는 마케팅 거장들의 불변의 법칙과 최신 AI 기술을 결합하여 자동화 수익 파이프라인을 구축하도록 돕습니다.'
                : 'GrowthAI helps solopreneurs and creators build automated revenue pipelines by combining timeless marketing principles with cutting-edge AI.'}
            </p>
            <p className="text-white/40 text-[13px] leading-relaxed">
              {lang === 'ko'
                ? '코딩 없이도 소상공인과 1인 크리에이터가 AI로 비즈니스를 혁신하고 글로벌 수익을 창출할 수 있는 실전 로드맵을 제공합니다.'
                : 'We provide practical roadmaps so anyone — without coding skills — can innovate their business and generate global income with AI.'}
            </p>
          </StaggerItem>

        </StaggerReveal>
      </div>

      {/* 하단 바 */}
      <div className="border-t" style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
        <ScrollReveal as="div" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[12px]">{content.copyright}</p>
          <div className="flex items-center gap-5">
            {[
              { label: lang === 'ko' ? '이용약관' : 'Terms of Use', path: '/terms' },
              { label: lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy', path: '/privacy' },
              { label: lang === 'ko' ? '고객센터' : 'Support', path: '/contact' },
            ].map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="text-white/25 text-[12px] transition-colors bg-transparent border-none cursor-pointer p-0"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#C9A84C'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = ''; }}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
