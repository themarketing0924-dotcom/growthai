// ============================================================
// Site Content Configuration — 다국어(한/영) 텍스트 및 데이터 관리
// ============================================================

export interface Feature {
  title: string;
  desc: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface RoadmapLayer {
  num: number;
  name: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LanguageConfig {
  brandName: string;
  copyright: string;
  hero: {
    badge: string;
    titleLeft: string[];
    titleRight: string[];
    watermark: string;
    description: string;
  };
  cinematic: {
    text: string;
  };
  founder: {
    subtitle: string;
    name: string;
    title: string;
    philosophyQuote: string;
    description: string;
    booksHeader: string;
    photo: string;
    books: {
      title: string;
      desc: string;
      image: string;
    }[];
  };
  metrics: {
    subtitle: string;
    items: MetricItem[];
  };
  technology: {
    title: string[];
    description: string;
    features: Feature[];
  };
  architecture: {
    subtitle: string;
    heading: string;
    description: string;
    layers: RoadmapLayer[];
  };
  faq: {
    subtitle: string;
    heading: string;
    items: FAQItem[];
  };
  footer: {
    tagline: string;
  };
  nav: {
    links: { label: string; scrollMultiplier: number }[];
    downloadLabel: string;
  };
}

export const SITE_CONFIG: { ko: LanguageConfig; en: LanguageConfig } = {
  ko: {
    brandName: 'GrowthAI',
    copyright: '© 2026 GrowthAI. All rights reserved.',
    hero: {
      badge: 'GrowthAI · 마케팅 × AI 클래스',
      titleLeft: ['이 설득 구조 하나면', '팔릴 가능성이 높아집니다'],
      titleRight: ['문제는 AI가 아니라', '설득 구조가 없기 때문입니다'],
      watermark: 'FORMULA',
      description:
        '콘텐츠를 만들어도 반응이 없고, AI를 써도 매출이 붙지 않는다면\n도구보다 구조를 먼저 봐야 합니다.\n마케팅 거장들이 검증한 설득 프레임에 AI 실행력을 더하면\n혼자서도 더 빠르게 팔리는 콘텐츠와 제안을 만들 수 있습니다.',
    },
    cinematic: {
      text: '마케팅 거장들의 불변의 법칙이 AI라는 초강력 엔진과 만났습니다. 단순한 AI 툴 사용법을 넘어, 여러분의 실제 비즈니스에 AI를 접목하여 성과를 내는 실전 노하우와 강력한 자동화 수익 파이프라인을 구축하는 확실한 로드맵을 제시합니다.',
    },
    founder: {
      subtitle: '강사 소개',
      name: 'AI 멘토 KOI LEE',
      title: 'GrowthAI 소장 & 베스트셀러 저자',
      philosophyQuote: '"AI 기술 자체는 도구일 뿐입니다. 거장들의 마케팅 본질과 결합될 때 비로소 가치를 창출합니다."',
      description:
        'GrowthAI의 소장으로서 소상공인과 크리에이터들이 AI를 통해 비즈니스를 혁신하고 새로운 수익 구조를 창출할 수 있도록 돕고 있습니다. 기술 지식이 없는 초보자도 1인 기업가로 성장할 수 있는 실무 로드맵을 전수합니다.',
      booksHeader: '📖 대표 저서 (베스트셀러 2권)',
      photo: '/IMG_5545.PNG',
      books: [
        {
          title: 'YouTube로 알리고 Zoom으로 소통하라!',
          desc: '5G 마케팅 혁명 — 최강의 YouTube×Zoom 공략법을 담은 매일경제신문사 출간 마케팅 실전서.',
          image: '/9791164841240.jpg',
        },
        {
          title: 'Zoom 온라인 혁명',
          desc: 'Zoom 고객 모집으로 연 매출 2배를 거두는 마케팅 비법을 담은 매일경제신문사 베스트셀러.',
          image: '/9791164841615.jpg',
        },
      ],
    },
    metrics: {
      subtitle: '클래스 핵심 성과',
      items: [
        { value: '4.9 / 5.0', label: '수강생 만족도' },
        { value: '15,000+', label: '누적 글로벌 수강생' },
        { value: '25+', label: '실전 마스터 AI 툴' },
      ],
    },
    technology: {
      title: ['핵심', '커리큘럼'],
      description:
        '거장들의 마케팅 본질 위에 최신 AI 기술을 융합하여 실전 비즈니스 성장과 자동화 수익을 동시에 달성하는 3대 핵심 요소를 학습합니다.',
      features: [
        {
          title: '거장의 마케팅 + AI 결합',
          desc: '고전 마케팅 전략과 자연어 프롬프트 기법을 결합하여 소상공인 비즈니스 매출 극대화.',
        },
        {
          title: '쇼츠 & 롱폼 비디오 제작',
          desc: '대본 작성부터 컷 편집, AI 나레이션까지 클릭 몇 번으로 끝내는 초고속 영상 제작.',
        },
        {
          title: '유튜브 채널 수익화',
          desc: '조회수를 폭발시키는 알고리즘 분석과 애드센스 외 N잡 자동 수익 파이프라인 구축.',
        },
        {
          title: '글로벌 비즈니스 자동화',
          desc: '다국어 번역과 AI 에이전트를 활용한 해외 시장 타겟 마케팅 및 운영 자동화.',
        },
      ],
    },
    architecture: {
      subtitle: '로드맵',
      heading: '5단계 마스터 클래스로 설계된 변화',
      description:
        '기초 마케팅 이론부터 AI 도구 활용, 콘텐츠 제작, 자동화 시스템 구축, 글로벌 스케일업까지 단계별로 완성합니다.',
      layers: [
        { num: 1, name: 'AI & 마케팅 기본기 정립' },
        { num: 2, name: '숏폼·롱폼 영상 제작 실전' },
        { num: 3, name: '유튜브 채널 수익화 달성' },
        { num: 4, name: 'N8N 자동화 시스템 구축' },
        { num: 5, name: '글로벌 비즈니스 스케일업' },
      ],
    },
    faq: {
      subtitle: '자주 묻는 질문',
      heading: 'FAQ',
      items: [
        {
          question: '코딩을 전혀 모르는 초보자도 수강할 수 있나요?',
          answer:
            '네, 가능합니다! 본 아카데미의 모든 과정은 기술적인 코딩 지식이 없는 비개발자분들을 위해 준비되었습니다. ChatGPT, Gemini 등 자연어를 사용하는 AI 툴을 다루기 때문에 마우스 클릭과 간단한 타이핑만으로도 10분 만에 영상을 제작하고 나만의 웹 도구를 만들 수 있습니다.',
        },
        {
          question: '소상공인 매출 향상에 실제로 도움이 되나요?',
          answer:
            '매우 큰 도움이 됩니다. 단순히 AI 기능만 배우는 것이 아니라 마케팅 거장들의 고객 유치 및 매출 상승 공식을 AI 프롬프트에 이식해 활용하는 실전 비즈니스 기술을 가르칩니다. 실제로 오프라인 샵, 1인 쇼핑몰, 컨설팅 업종 등의 수강생분들이 매출 상승 효과를 보고 계십니다.',
        },
        {
          question: '유튜브 수익 창출까지 시간이 얼마나 걸리나요?',
          answer:
            '실전반 과정(Step 1)을 수강하시며 안내에 따라 하루 30분씩 꾸준히 적용하시면, 10일 이내에 나만의 채널을 완벽히 개설하고 AI로 제작된 첫 고품질 쇼츠 영상을 성공적으로 업로드하실 수 있습니다. 알고리즘 최적화를 통해 빠르게 채널을 활성화하는 비법을 아낌없이 제공합니다.',
        },
        {
          question: '해외 결제와 신용카드 할부가 가능한가요?',
          answer:
            '네, 그렇습니다. 국내 수강생분들은 토스페이먼츠(Toss) 결제창을 통해 신용카드(최대 12개월 무이자 할부 지원), 간편결제, 계좌이체 등을 이용하실 수 있으며, 해외 수강생분들은 페이팔(PayPal) 신용카드 결제 및 매월 정기 구독 결제를 안전하게 이용하실 수 있습니다.',
        },
        {
          question: 'N8N 자동화는 어렵지 않나요? 완전 초보도 할 수 있나요?',
          answer:
            '걱정 마세요. 본 과정에서는 N8N 설치부터 실제 소상공인 업종별 워크플로우 JSON 파일을 미리 만들어 제공합니다. 파일을 불러와서 본인 계정 정보만 입력하면 바로 실행되도록 거의 완성된 형태로 제공하기 때문에, 코딩 없이도 카카오 자동답장·SNS 자동 포스팅·텔레그램 알림 등을 하루 안에 세팅할 수 있습니다.',
        },
        {
          question: '강의 수강 후 실제로 1인으로 사업 운영이 가능한가요?',
          answer:
            '네, 그것이 본 과정의 핵심 목표입니다. AI 도구·N8N 자동화·콘텐츠 시스템을 결합하면 리드 수집, 고객 응대, SNS 홍보, 콘텐츠 발행, 결제·예약 관리까지 90% 이상 자동화가 가능합니다. 직원 없이 가족만으로도 중소기업 수준의 마케팅 시스템을 갖출 수 있도록 단계별로 안내합니다.',
        },
        {
          question: '강의 수강 기간과 업데이트는 어떻게 되나요?',
          answer:
            '실전 코스(₩390,000)와 VVIP 마스터클래스(₩2,900,000)는 평생 소장이며, AI 시장 변화에 맞춰 주요 업데이트 시 무료로 제공됩니다. 월간 멤버십(₩49,000/월)은 매주 신규 프롬프트 템플릿과 최신 트렌드 리포트를 정기적으로 받아보실 수 있습니다.',
        },
        {
          question: '글로벌(해외) 시장 진출도 배울 수 있나요?',
          answer:
            '네, 5단계 커리큘럼의 마지막 과정에서 다국어 AI 번역·더빙·해외 플랫폼(Udemy, Gumroad, TikTok Shop) 활용 전략을 다룹니다. 한국에서 검증한 콘텐츠와 자동화 시스템을 영어·스페인어 등으로 리메이크하여 추가 비용 없이 글로벌 수익을 창출하는 방법을 실전으로 가르칩니다.',
        },
      ],
    },
    footer: {
      tagline:
        '생성형 AI 시대, 단순 노동에서 벗어나 비즈니스 아키텍트가 되십시오. 당신의 직업과 크리에이터 라이프를 혁신하세요.',
    },
    nav: {
      links: [
        { label: '커리큘럼', scrollMultiplier: 1 },
        { label: '핵심지표', scrollMultiplier: 2 },
      ],
      downloadLabel: '수강 신청하기',
    },
  },
  en: {
    brandName: 'GrowthAI',
    copyright: '© 2026 GrowthAI. All rights reserved.',
    hero: {
      badge: 'GrowthAI · Marketing × AI Class',
      titleLeft: ['A persuasive structure', 'can improve sales odds'],
      titleRight: ['The problem is not AI', "it’s the missing structure"],
      watermark: 'ACADEMY',
      description:
        'A global online masterclass that combines classic marketing thinking with practical AI execution.\nIf your content gets little response and AI still is not moving revenue, the issue is usually the structure, not the tool.\nWith a proven persuasion framework and AI working together, you can create stronger content and offers faster.',
    },
    cinematic: {
      text: 'The unchanging laws of master marketers meet the superpower of AI. Beyond teaching how to use basic AI tools, we provide practical business automation blueprints and concrete roadmaps to build high-converting traffic and automated income pipelines.',
    },
    founder: {
      subtitle: 'INSTRUCTOR PROFILE',
      name: 'AI Mentor Koi',
      title: 'Director of GrowthAI & Best-selling Author',
      philosophyQuote: '"AI technology is just a tool. It only creates real wealth when combined with the timeless principles of master marketers."',
      description:
        'As the Director of GrowthAI, I help small business owners and creators innovate their businesses and create new revenue streams using AI. We provide practical blueprints for beginners with zero coding skills to grow into solopreneurs.',
      booksHeader: '📖 Major Books (2 Best-sellers)',
      photo: '/IMG_5545.PNG',
      books: [
        {
          title: 'Promote on YouTube, Connect on Zoom!',
          desc: 'The 5G Marketing Revolution — the ultimate YouTube×Zoom playbook, published by Maeil Business Newspaper.',
          image: '/9791164841240.jpg',
        },
        {
          title: 'The Zoom Online Revolution',
          desc: 'A Maeil Business Newspaper best-seller on doubling annual revenue by acquiring customers through Zoom.',
          image: '/9791164841615.jpg',
        },
      ],
    },
    metrics: {
      subtitle: 'Class Metrics',
      items: [
        { value: '4.9 / 5.0', label: 'Student Satisfaction' },
        { value: '15,000+', label: 'Global Students' },
        { value: '25+', label: 'AI Tools Covered' },
      ],
    },
    technology: {
      title: ['Core', 'Curriculum'],
      description:
        'Learn the three core pillars to achieve business scaling and automated revenue by combining classic marketing strategy with modern AI tools.',
      features: [
        {
          title: 'Master Marketing + AI',
          desc: 'Combine classical marketing strategies with natural language prompt engineering to maximize local business sales.',
        },
        {
          title: 'Shorts & Long-form Video',
          desc: 'Generate scripts, edit video, and add AI voiceovers in less than 10 minutes with just a few clicks.',
        },
        {
          title: 'YouTube Monetization',
          desc: 'Analyze algorithms to explode views and build automated monetization streams beyond Google AdSense.',
        },
        {
          title: 'Global Business Automation',
          desc: 'Use multi-language translations and autonomous AI agents to target international markets and automate operations.',
        },
      ],
    },
    architecture: {
      subtitle: 'Roadmap',
      heading: 'Designed for Real Transformation in 5 Steps',
      description:
        'From marketing fundamentals and AI tools to content creation, automation systems, and global scale-up — we guide you through every step.',
      layers: [
        { num: 1, name: 'AI & Marketing Fundamentals' },
        { num: 2, name: 'Shorts & Long-form Production' },
        { num: 3, name: 'YouTube Monetization' },
        { num: 4, name: 'N8N Automation System' },
        { num: 5, name: 'Global Business Scale-Up' },
      ],
    },
    faq: {
      subtitle: 'Frequently Asked Questions',
      heading: 'FAQ',
      items: [
        {
          question: 'Can beginners with absolutely no coding experience take this course?',
          answer:
            'Yes, absolutely! All classes in our academy are designed for non-technical users. Because modern AI tools like ChatGPT and Gemini use natural language, you can create professional videos and write automation tools in 10 minutes with simple mouse clicks and typing.',
        },
        {
          question: 'Does this actually help improve local business sales?',
          answer:
            'Yes, it is highly effective. Instead of just teaching AI button-clicking, we teach practical business tactics to embed master marketers\' client acquisition formulas directly into AI prompts. Many students running offline shops, online stores, and consulting agencies are experiencing significant revenue growth.',
        },
        {
          question: 'How long does it take to start earning from YouTube?',
          answer:
            'If you follow our Step 1 Bootcamp and apply it for 30 minutes a day, you will be able to set up your channel and successfully upload your first high-quality Shorts video within 10 days. We share all the algorithmic secrets to quickly activate and scale your channel.',
        },
        {
          question: 'Are global credit cards and installments supported?',
          answer:
            'Yes. South Korean students can pay via Toss Payments, which supports credit card interest-free installments (up to 12 months), bank transfers, and local mobile cards. International students can securely pay via PayPal for both one-time products and monthly recurring subscriptions.',
        },
        {
          question: 'Is N8N automation difficult? Can a complete beginner set it up?',
          answer:
            'Not at all. We provide pre-built N8N workflow JSON files tailored to different business types. Simply import the file, enter your account details, and your automation is live — no coding required. You can set up auto-replies, SNS posting, and Telegram alerts all in one day.',
        },
        {
          question: 'Can I really run a business solo after completing this course?',
          answer:
            'Yes, that is the core goal of this program. By combining AI tools, N8N automation, and a content system, you can automate 90%+ of lead collection, customer responses, SNS promotion, and payment management. We guide you step by step to operate a small-business-level marketing system without hiring staff.',
        },
        {
          question: 'How long do I have access and are updates included?',
          answer:
            'The Bootcamp (₩390,000) and VVIP Masterclass (₩2,900,000) include lifetime access with free major updates as the AI landscape evolves. The Monthly Membership (₩49,000/mo) delivers fresh prompt templates and trend reports every week.',
        },
        {
          question: 'Can I learn how to enter global markets?',
          answer:
            'Yes. The final Step 5 covers multilingual AI translation, dubbing, and strategies for international platforms like Udemy, Gumroad, and TikTok Shop. We teach you how to repurpose your Korean content into English or Spanish to generate global revenue at near-zero additional cost.',
        },
      ],
    },
    footer: {
      tagline:
        'In the age of Generative AI, move away from simple labor and become a business architect. Innovate your career and creator life today.',
    },
    nav: {
      links: [
        { label: 'Curriculum', scrollMultiplier: 1 },
        { label: 'Metrics', scrollMultiplier: 2 },
      ],
      downloadLabel: 'Register Now',
    },
  },
};
