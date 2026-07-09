/**
 * PromptsPage — 무료 AI 프롬프트 맛보기
 * /prompts — 8개 무료 공개, 나머지 잠금 처리
 * aicitybuilders.com/chatgpt-prompts-40plus 구조 벤치마킹
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Copy, Check, Zap,
  ArrowRight, Tag, BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Seo, DEFAULT_OG_IMAGE } from '../components/Seo';

/* ─── 데이터 타입 (CourseAIPage 에서 import) ─── */
export interface PromptTool {
  id: string;
  no: number;
  title: string;
  catId: string;
  desc: string;
  usage: string[];
  tags: string[];
  tips?: string;
  samplePrompt?: string;
}

export interface ToolCategory {
  id: string;
  label: string;
  emoji: string;
  tools: PromptTool[];
}

/* ─── 33개 GPT 프롬프트 도구 데이터 ─── */
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'ebook', label: '전자책·논문', emoji: '📚',
    tools: [
      { id: 'pt1', no: 1, catId: 'ebook', title: '전자책 출판 지원 솔루션', desc: '아이디어를 완성된 전자책으로 변환하는 단계별 출판 지원 솔루션입니다. 목차 설계부터 원고 작성, 표지 기획까지 AI가 전 과정을 안내합니다.', usage: ['출판할 주제와 타겟 독자를 상세히 입력', '목차 구조 자동 생성 (챕터·소제목 포함)', '각 챕터별 본문 초고 작성', '최종 편집 및 출판 형식 준비'], tags: ['전자책', '출판', '목차설계'], tips: '주제를 구체적으로 입력할수록 더 정확한 구조가 생성됩니다.', samplePrompt: '나는 [주제]에 대한 전자책을 쓰고 싶습니다. 타겟 독자는 [독자층]이며, 이 책을 통해 [해결할 문제]를 해결해주고 싶습니다. 10챕터 구성의 목차를 만들어주세요.' },
      { id: 'pt2', no: 2, catId: 'ebook', title: '전자책 출간 코치', desc: '전자책 출간 경험이 없는 초보자를 위한 단계별 코칭 GPT. 기획부터 마케팅까지 전자책 비즈니스 전체를 함께 설계합니다.', usage: ['현재 상황과 출간 목표 공유', '개인화된 출간 로드맵 수령', '주차별 실행 계획 확인 및 피드백', '출간 후 마케팅 전략 수립'], tags: ['코칭', '초보자', '로드맵'], samplePrompt: '저는 [분야] 전문가인데 처음으로 전자책을 쓰려고 합니다. 현재 블로그 글 20개가 있고, 3개월 안에 출간하고 싶습니다. 어떻게 시작해야 할까요?' },
      { id: 'pt3', no: 3, catId: 'ebook', title: '기존 원고 기반 전자책 제작', desc: '이미 가지고 있는 원고, 블로그 포스트, 강의 자료를 전자책 형식으로 빠르게 재편집하고 완성합니다.', usage: ['기존 원고나 자료 텍스트 붙여넣기', '전자책 구조로 재편집 요청', '챕터별 내용 보강 및 연결', '서론·결론 추가 작성'], tags: ['원고변환', '블로그재활용', '재편집'], samplePrompt: '아래 블로그 글들을 하나의 전자책으로 재구성해 주세요. [글 내용 붙여넣기]' },
      { id: 'pt4', no: 4, catId: 'ebook', title: '처음부터 전자책 제작 1', desc: '아무것도 없는 상태에서 전자책을 만드는 첫 번째 GPT. 주제 선정부터 완전한 목차까지 진행합니다.', usage: ['관심 분야 또는 전문 영역 입력', '베스트셀러 분석 기반 주제 3개 추천', '선택한 주제로 목차 및 소제목 완성', '각 챕터 핵심 포인트 정리'], tags: ['처음시작', '주제선정', '목차'], tips: '전문성이 없어도 괜찮습니다. 내가 배운 것, 경험한 것이 콘텐츠가 됩니다.', samplePrompt: '저는 [관심 분야/직업]입니다. 이 분야에서 전자책을 내고 싶은데, 어떤 주제가 잘 팔릴지 분석해주고 목차까지 만들어주세요.' },
      { id: 'pt5', no: 5, catId: 'ebook', title: '처음부터 전자책 제작 2', desc: '목차가 완성된 후 본문 챕터를 빠르게 채워나가는 두 번째 단계. 챕터별 상세 내용과 사례를 자동 작성합니다.', usage: ['완성된 목차 입력', '챕터 1개씩 본문 자동 생성', '사례·데이터 추가 요청', '전체 분량 조절 및 마무리'], tags: ['본문작성', '챕터완성', '사례추가'], samplePrompt: '아래 목차의 챕터 [번호]를 써주세요. 각 소제목마다 400~600자 분량으로, 실제 사례나 예시를 포함해서 작성해주세요. [목차 붙여넣기]' },
      { id: 'pt6', no: 6, catId: 'ebook', title: '전자책 삽화 생성기', desc: '전자책 내용에 맞는 삽화와 이미지 프롬프트를 자동 생성합니다. DALL-E, Midjourney에 바로 사용 가능한 영어 프롬프트 제공.', usage: ['챕터 내용 또는 설명할 개념 입력', '스타일 선택 (미니멀·인포그래픽·일러스트)', '영어 이미지 프롬프트 즉시 생성', 'DALL-E나 Midjourney에 복사 붙여넣기'], tags: ['삽화', '이미지프롬프트', 'DALL-E'], samplePrompt: '전자책 챕터에서 [개념/내용]을 설명하는 삽화가 필요합니다. 미니멀하고 전문적인 스타일로, DALL-E에서 사용할 수 있는 영어 프롬프트를 3가지 만들어주세요.' },
      { id: 'pt7', no: 7, catId: 'ebook', title: '논문 작성 — AI·공학·데이터 연구', desc: 'AI, 공학, 데이터 과학 분야 논문 작성을 위한 전문 GPT. 연구 방법론부터 결과 분석, 참고문헌까지 단계별 지원.', usage: ['연구 주제와 가설 명확히 입력', '연구 방법론 설계 및 검토', '결과 분석·해석 작성 지원', '참고문헌 형식 자동 정리 (APA/IEEE)'], tags: ['논문', 'AI연구', '방법론'], samplePrompt: '[연구 주제]에 관한 논문을 쓰려 합니다. 연구 목적은 [목적]이며, 데이터는 [데이터 설명]을 사용합니다. 서론부터 연구 방법론 섹션을 작성해주세요.' },
      { id: 'pt8', no: 8, catId: 'ebook', title: '논문 작성 솔루션 — 교육·인문·공학', desc: '교육학, 인문학, 공학 계열 논문 특성에 맞춘 전문 작성 솔루션. 분야별 논문 형식과 인용 스타일을 자동 적용합니다.', usage: ['전공 분야와 연구 주제 입력', '분야별 논문 구조 자동 설계', '문헌 검토 초안 작성', '인용 및 참고문헌 APA·MLA 정리'], tags: ['논문', '교육학', '인문학'], samplePrompt: '[교육학/인문학] 분야 석사 논문을 쓰고 있습니다. 주제는 [주제]이며, 연구 대상은 [대상]입니다. 문헌 검토(Literature Review) 섹션을 작성해주세요.' },
    ],
  },
  {
    id: 'shortform', label: '쇼트폼·홍보', emoji: '🎬',
    tools: [
      { id: 'pt9', no: 9, catId: 'shortform', title: '쇼트폼 60 프레임워크', desc: '60초 쇼트폼 영상을 위한 완전한 대본 프레임워크. 훅 → 본문 → CTA 구조로 알고리즘에 최적화된 대본을 즉시 만듭니다.', usage: ['영상 주제와 타겟 시청자 입력', '첫 3초 훅 문장 3개 생성', '본문 스크립트 (30초) 자동 작성', 'CTA 문구 및 화면 연출 가이드'], tags: ['쇼트폼', '60초대본', '훅'], tips: '첫 3초 훅이 조회수를 결정합니다.', samplePrompt: '[주제]에 대한 60초 유튜브 쇼츠 대본을 써주세요. 타겟은 [타겟]이고, 첫 3초 훅은 최대한 강력하게, 마지막에는 구독 유도 CTA를 넣어주세요.' },
      { id: 'pt10', no: 10, catId: 'shortform', title: '바이럴 숏폼 대본 자동화 STEP 1', desc: '바이럴 가능성이 높은 쇼트폼 아이디어 발굴 및 대본 초안 작성. 현재 트렌드를 분석해 최적화된 콘텐츠를 기획합니다.', usage: ['업종·카테고리 또는 키워드 입력', '현재 트렌드 기반 아이디어 10개 생성', '가장 바이럴 가능성 높은 아이디어 분석', '선택한 아이디어의 대본 초안 작성'], tags: ['바이럴', '트렌드', '아이디어발굴'], samplePrompt: '[업종/분야]에서 요즘 잘 되는 쇼트폼 콘텐츠 아이디어 10개를 분석해주세요.' },
      { id: 'pt11', no: 11, catId: 'shortform', title: '쇼츠 영상 프롬프트 마스터 STEP 2', desc: 'STEP 1에서 선택한 아이디어를 완성된 영상 스크립트와 연출 가이드로 발전시킵니다.', usage: ['STEP 1에서 선택한 아이디어 입력', '씬별 완성 대본 생성', '카메라 앵글·자막·편집 포인트 가이드', '최종 스크립트 검토 및 수정'], tags: ['스크립트', '연출가이드', '완성대본'], samplePrompt: 'STEP 1에서 선정한 아이디어: [아이디어]. 이 내용으로 60초 완성 대본을 써주세요.' },
      { id: 'pt12', no: 12, catId: 'shortform', title: '쇼츠 설정 수집기', desc: '유튜브 쇼츠 최적 메타데이터를 자동으로 생성합니다. 제목, 해시태그, 설명란, 썸네일 텍스트 일괄 완성.', usage: ['영상 내용 요약 2~3줄 입력', 'SEO 최적화 제목 10개 생성', '해시태그 20개 + 설명란 자동 완성', '썸네일 텍스트 후보 5개'], tags: ['메타데이터', '유튜브SEO', '해시태그'], samplePrompt: '다음 유튜브 쇼츠 영상의 메타데이터를 만들어주세요. 영상 내용: [요약].' },
      { id: 'pt13', no: 13, catId: 'shortform', title: '소상공인 홍보물 제작 솔루션', desc: '소상공인을 위한 맞춤형 홍보 콘텐츠 제작 GPT. 전단지, SNS 포스팅, 이벤트 배너 텍스트를 자동 생성합니다.', usage: ['업종, 홍보 목적, 타겟 고객 입력', '매체 선택 (인스타·블로그·전단지)', '홍보 문구 3가지 버전 생성', '이미지 생성 프롬프트도 함께 제공'], tags: ['소상공인', '홍보', 'SNS'], samplePrompt: '저는 [업종]을 운영하고 있습니다. [행사/이벤트 내용]을 홍보하려 합니다. 인스타그램 포스팅용 문구 3가지와 어울리는 이미지 프롬프트도 만들어주세요.' },
      { id: 'pt14', no: 14, catId: 'shortform', title: '기독교 홍보물 제작 솔루션', desc: '교회 및 기독교 단체를 위한 홍보 콘텐츠 특화 GPT. 주보, 현수막, SNS 포스팅, 예배 광고 문구를 제작합니다.', usage: ['행사·예배 정보 및 일시 입력', '홍보 매체 선택 (주보·현수막·SNS)', '성경적 메시지가 담긴 홍보문구 생성', '디자인 방향 제안'], tags: ['교회', '기독교', '주보'], samplePrompt: '우리 교회에서 [행사명]을 [날짜]에 진행합니다. 주제 성경 구절은 [구절]입니다. 주보 광고 문구와 SNS 포스팅 문구를 각각 작성해주세요.' },
    ],
  },
  {
    id: 'image', label: '이미지·비주얼', emoji: '🎨',
    tools: [
      { id: 'pt15', no: 15, catId: 'image', title: 'ChatGPT 이미지 수정', desc: '기존 이미지를 ChatGPT로 정밀하게 수정하는 프롬프트 가이드. 배경 제거, 색상 변경, 요소 추가/제거 등을 정확한 영어 프롬프트로 지시합니다.', usage: ['원본 이미지 업로드 및 수정 목적 설명', '수정 요청사항 구체화', '정확한 영어 프롬프트 자동 생성', 'ChatGPT 이미지 편집에 바로 사용'], tags: ['이미지수정', 'ChatGPT', '배경제거'], samplePrompt: '이 이미지에서 [수정할 요소]를 [원하는 방식으로] 변경해주세요.' },
      { id: 'pt16', no: 16, catId: 'image', title: '이미지 속 글자 수정', desc: '이미지 내 텍스트를 정확하게 수정하거나 교체하는 AI 프롬프트 솔루션. 간판, 배너, 포스터 텍스트 변경에 최적화.', usage: ['원본 이미지와 변경할 텍스트 명시', '새 텍스트 내용 및 스타일 지정', '폰트·색상·크기 지정 프롬프트 생성', 'ChatGPT 또는 Firefly에 적용'], tags: ['텍스트수정', '글자교체', '간판'], samplePrompt: '이미지에 있는 "[원래 텍스트]"를 "[새 텍스트]"로 바꿔주세요.' },
      { id: 'pt17', no: 17, catId: 'image', title: '만화 프롬프트 메이커', desc: '웹툰, 카툰, 만화 스타일의 이미지를 생성하는 전문 프롬프트 제작기. 캐릭터 설정부터 배경까지 일관된 스타일을 유지합니다.', usage: ['캐릭터 외모·성격 설명 입력', '원하는 만화 스타일 선택', '장면 묘사 입력 후 프롬프트 생성', '시드 번호로 캐릭터 일관성 유지'], tags: ['만화', '웹툰', '캐릭터'], tips: '일관된 캐릭터를 유지하려면 첫 번째 생성 이미지의 시드 번호를 저장하세요.', samplePrompt: '[캐릭터 이름]은 [외모 특징]의 [나이]살 캐릭터입니다. [장면 묘사]. 한국 웹툰 스타일로 그려주세요.' },
      { id: 'pt19', no: 19, catId: 'image', title: '문장 기반 삽화 생성', desc: '텍스트 문장에서 자동으로 삽화용 이미지 프롬프트를 추출합니다.', usage: ['삽화가 필요한 문장이나 단락 붙여넣기', '스타일 지정', '이미지 프롬프트 자동 생성', 'DALL-E 또는 Midjourney에 적용'], tags: ['삽화', '텍스트기반', '블로그'], samplePrompt: '다음 텍스트 내용을 시각화하는 삽화를 만들고 싶습니다: "[텍스트 내용]". 미니멀한 인포그래픽 스타일로 DALL-E 프롬프트를 만들어주세요.' },
      { id: 'pt23', no: 23, catId: 'image', title: '비포애프터 이미지 프롬프트', desc: '마케팅에서 가장 강력한 비포-애프터 이미지를 AI로 제작하는 전문 프롬프트 메이커.', usage: ['비포 상태 구체적으로 설명', '애프터 목표 상태 설명', '대비 효과 극대화 프롬프트 생성', '마케팅 카피와 함께 활용'], tags: ['비포애프터', '마케팅', '설득'], samplePrompt: '비포: [현재 상태 설명]. 애프터: [개선된 상태 설명]. 이 변화를 극적으로 보여주는 이미지 프롬프트를 만들어주세요.' },
      { id: 'pt27', no: 27, catId: 'image', title: '대표 이미지 프롬프트 빌더', desc: '블로그 대표 이미지, 유튜브 썸네일, SNS 커버 이미지를 위한 고품질 프롬프트 빌더.', usage: ['콘텐츠 주제와 원하는 분위기 입력', '매체별 사이즈와 용도 선택', '클릭률 높은 구도의 프롬프트 생성', '텍스트 오버레이 가이드 포함'], tags: ['썸네일', 'SNS', '블로그'], samplePrompt: '[주제]에 관한 유튜브 썸네일을 만들려고 합니다. 클릭을 유도하는 강렬한 비주얼로 프롬프트를 만들어주세요.' },
      { id: 'pt28', no: 28, catId: 'image', title: '도식화 프롬프트 설계', desc: '복잡한 개념을 다이어그램, 인포그래픽, 플로우차트로 시각화하는 프롬프트를 설계합니다.', usage: ['시각화할 개념이나 프로세스 설명', '도식 유형 선택', '색상 테마와 스타일 지정', '완성 프롬프트 생성 및 적용'], tags: ['도식화', '인포그래픽', '플로우차트'], samplePrompt: '[복잡한 개념이나 프로세스]를 누구나 이해할 수 있는 인포그래픽으로 만들고 싶습니다.' },
      { id: 'pt29', no: 29, catId: 'image', title: '헤더·도해 이미지 생성기', desc: '웹사이트 헤더, 강의 자료 도해, 발표 슬라이드용 이미지를 생성하는 전문 프롬프트 GPT.', usage: ['헤더 또는 도해의 용도와 내용 입력', '색상 테마와 브랜드 분위기 설정', '완성 프롬프트 생성', 'Canva·DALL-E에 바로 적용'], tags: ['헤더이미지', '도해', '웹디자인'], samplePrompt: '[사이트명/강의명]의 헤더 이미지를 만들려 합니다. 브랜드 색상은 [색상]이며, [느낌]한 분위기를 원합니다.' },
      { id: 'pt31', no: 31, catId: 'image', title: '브랜드 로고 솔루션', desc: '브랜드 정체성에 맞는 로고를 AI로 제작하기 위한 전문 프롬프트 솔루션.', usage: ['브랜드명, 업종, 핵심 가치 입력', '로고 스타일 방향성 결정', '로고 컨셉 3가지 제안', '최종 선택 후 AI 생성 프롬프트 완성'], tags: ['로고', '브랜딩', 'CI'], tips: '로고는 흑백으로 먼저 테스트하세요.', samplePrompt: '[브랜드명]의 로고를 만들고 싶습니다. 업종은 [업종]이며, 핵심 가치는 [가치]입니다. 미니멀한 벡터 스타일로 컨셉 3가지를 제안해주세요.' },
    ],
  },
  {
    id: 'automation', label: 'AI 자동화·비즈니스', emoji: '🤖',
    tools: [
      { id: 'pt18', no: 18, catId: 'automation', title: '바이브코딩 앱 빌더 (초보자용)', desc: '코딩 지식 없이 AI와 대화만으로 앱을 만드는 바이브코딩 프로세스.', usage: ['만들고 싶은 앱 아이디어 설명', '핵심 기능 목록 3~5개 정리', '단계별 바이브코딩 가이드 따르기', '완성된 코드 Vercel로 배포'], tags: ['바이브코딩', '앱개발', '노코드'], tips: '한 번에 하나의 기능만 요청하세요.', samplePrompt: '저는 코딩을 모릅니다. [앱 아이디어]를 만들고 싶습니다. 핵심 기능은 [기능 1, 2, 3]입니다. 처음부터 단계별로 알려주세요.' },
      { id: 'pt20', no: 20, catId: 'automation', title: '감정 보이스', desc: 'AI 나레이션에 감정을 담는 전문 스크립트 작성기.', usage: ['나레이션 내용과 전달할 감정 입력', '감정의 강도 조절', '감정이 담긴 스크립트 생성', 'ElevenLabs·클로바 TTS에 적용'], tags: ['나레이션', 'TTS', 'ElevenLabs'], samplePrompt: '다음 내용을 [감정]이 느껴지는 나레이션으로 바꿔주세요: "[내용]".' },
      { id: 'pt21', no: 21, catId: 'automation', title: '유튜브 댓글 답글 매니저', desc: '유튜브 댓글에 자동으로 참여도를 높이는 맞춤 답글을 생성합니다.', usage: ['채널 성격과 톤 먼저 설정', '댓글 내용 붙여넣기', '맞춤 답글 3가지 버전 생성', '선택 후 바로 게시'], tags: ['유튜브', '댓글관리', '참여도'], samplePrompt: '제 유튜브 채널은 [채널 주제]이며 톤은 [친근한/전문적인] 스타일입니다. 다음 댓글에 답글을 달아주세요: "[댓글 내용]"' },
      { id: 'pt22', no: 22, catId: 'automation', title: '유튜브 설명란·타임라인 자동 생성기', desc: '영상 스크립트나 내용 요약에서 SEO 최적화된 설명란과 타임라인을 자동으로 완성합니다.', usage: ['영상 스크립트 또는 내용 요약 입력', 'SEO 핵심 키워드 자동 추출', '설명란 전체 구조 완성', '씬별 타임라인 자동 생성'], tags: ['유튜브설명란', 'SEO', '타임라인'], samplePrompt: '다음 유튜브 영상의 설명란과 타임라인을 만들어주세요. 영상 내용: [내용 요약].' },
      { id: 'pt24', no: 24, catId: 'automation', title: '천재 비즈니스 문서 작성', desc: '사업계획서, 투자제안서, 파트너십 제안서 등 핵심 비즈니스 문서를 전문가 수준으로 작성합니다.', usage: ['문서 종류와 제출 대상·목적 입력', '사업 내용과 핵심 지표 제공', '문서 구조 자동 설계', '섹션별 전문 내용 완성'], tags: ['사업계획서', '투자제안서', 'IR'], samplePrompt: '[사업 이름]의 투자제안서를 작성하려 합니다. 사업 내용: [설명]. 목표 투자 금액: [금액].' },
      { id: 'pt25', no: 25, catId: 'automation', title: '캐릭터 설정 자료 생성기', desc: '웹툰, 소설, 게임, 마케팅 마스코트를 위한 완전한 캐릭터 설정집을 AI로 제작합니다.', usage: ['캐릭터의 기본 개요 입력', '성격·말투·가치관 세부 설정', '배경 스토리 및 인간관계 생성', '완전한 캐릭터 바이블 완성'], tags: ['캐릭터설정', '웹툰', '게임'], samplePrompt: '[캐릭터 이름]이라는 캐릭터를 만들려 합니다. 용도: [웹툰/게임/마스코트]. 기본 설정: [간단 설명].' },
      { id: 'pt26', no: 26, catId: 'automation', title: '업종별 홍보', desc: '업종 특성에 최적화된 홍보 전략과 콘텐츠를 자동 생성합니다.', usage: ['업종, 제품/서비스, 타겟 고객 입력', '홍보 채널 선택', '업종 맞춤 홍보 전략 도출', '채널별 홍보 콘텐츠 완성'], tags: ['업종별홍보', '마케팅전략', '맞춤형'], samplePrompt: '저는 [업종]을 운영합니다. 주요 고객은 [타겟]이며, 주력 상품은 [상품]입니다. 인스타그램과 블로그를 중심으로 홍보 전략과 콘텐츠를 제안해주세요.' },
      { id: 'pt30', no: 30, catId: 'automation', title: '4인 콘텐츠 에이전트', desc: '기획자, 작가, 디자이너, 마케터 역할의 AI 에이전트 4명이 협업하여 완성도 높은 콘텐츠를 제작합니다.', usage: ['콘텐츠 주제와 최종 목표 설정', '4명의 에이전트 역할 확인 및 시작', '에이전트 간 피드백 루프 진행', '최종 콘텐츠 승인 및 완성'], tags: ['멀티에이전트', '협업', '콘텐츠제작'], tips: '에이전트 간 피드백 루프를 최소 2번 반복하면 품질이 크게 향상됩니다.', samplePrompt: '4인 콘텐츠 에이전트 모드를 시작합니다. 오늘의 과제: [콘텐츠 주제].' },
      { id: 'pt32', no: 32, catId: 'automation', title: '슬라이드 프롬프트 빌더', desc: '발표 슬라이드, 피치덱, 강의 자료를 AI로 빠르게 설계하고 내용을 채웁니다.', usage: ['발표 목적, 청중, 슬라이드 수 입력', '슬라이드 구조 자동 설계', '각 슬라이드 핵심 내용 완성', '디자인 방향 가이드'], tags: ['슬라이드', '피치덱', '발표'], samplePrompt: '[주제]에 대한 [청중]을 위한 [N]장 슬라이드 발표 자료를 만들고 싶습니다. 각 슬라이드의 제목과 핵심 내용을 구성해주세요.' },
      { id: 'pt33', no: 33, catId: 'automation', title: 'SNS 콘텐츠 캘린더 생성기', desc: '월별 SNS 콘텐츠 계획을 자동으로 수립합니다. 포스팅 날짜, 주제, 핵심 메시지, 해시태그까지 일괄 생성.', usage: ['업종, 목표, 타겟 입력', '월별 포스팅 빈도 설정', '30일치 콘텐츠 캘린더 자동 생성', '각 포스팅 핵심 내용과 해시태그 완성'], tags: ['SNS캘린더', '콘텐츠계획', '자동화'], samplePrompt: '[업종]을 위한 인스타그램 30일 콘텐츠 캘린더를 만들어주세요. 타겟은 [타겟]이며, 목표는 [목표]입니다.' },
    ],
  },
];

/* ─── 자유/잠금 구분: ebook 카테고리 8개 무료 ─── */
const FREE_IDS = new Set(['pt1','pt2','pt3','pt4','pt5','pt6','pt7','pt8']);

/* ─── 복사 버튼 ─── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer border-none transition-all"
      style={{ backgroundColor: copied ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#C9A84C' : 'rgba(255,255,255,0.45)' }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? '복사됨!' : '복사'}
    </button>
  );
}

/* ─── 메인 컴포넌트 ─── */
export default function PromptsPage() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('all');
  const [activeTool, setActiveTool] = useState<PromptTool | null>(TOOL_CATEGORIES[0].tools[0]);

  const allTools = TOOL_CATEGORIES.flatMap(c => c.tools);
  const displayTools = activeCat === 'all' ? allTools : (TOOL_CATEGORIES.find(c => c.id === activeCat)?.tools ?? []);

  const freeCount = allTools.filter(t => FREE_IDS.has(t.id)).length;
  const totalCount = allTools.length;

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <Seo
        title="무료 AI 프롬프트 맛보기 | GrowthAI"
        description="33개 프롬프트 중 일부를 무료로 공개하는 맛보기 페이지입니다."
        canonical="/prompts"
        image={DEFAULT_OG_IMAGE}
        keywords={['AI 프롬프트', '무료 맛보기', 'GrowthAI']}
      />

      {/* ── HERO ── */}
      <section className="py-16 md:py-20 text-center border-b border-white/8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-5 border"
            style={{ color: '#C9A84C', borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.07)' }}
          >
            <Zap size={11} />
            무료 공개 · {freeCount}개 프롬프트
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-extrabold tracking-tight leading-[1.15] mb-4"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
          >
            ChatGPT를 200% 활용하는<br />
            <span className="apple-gold-gradient">검증된 AI 프롬프트 {totalCount}종</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed mb-8"
          >
            전자책, 쇼트폼, 이미지, AI 자동화까지 — 4개 분야 {totalCount}개 GPT 프롬프트.<br />
            {freeCount}개는 지금 무료로 사용하세요. 나머지는 멤버십에서 전체 공개됩니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {TOOL_CATEGORIES.map(cat => (
              <span
                key={cat.id}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold border border-white/10 text-white/45"
              >
                {cat.emoji} {cat.label} {cat.tools.length}개
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 카테고리 탭 ── */}
      <div className="sticky top-16 z-20 border-b border-white/8" style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-4 flex gap-1 py-2 overflow-x-auto scrollbar-none">
          {[{ id: 'all', label: '전체', emoji: '✨' }, ...TOOL_CATEGORIES].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setActiveTool(null); }}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-[12px] font-semibold cursor-pointer border-none transition-all whitespace-nowrap ${
                activeCat === cat.id
                  ? 'text-black'
                  : 'bg-white/5 text-white/45 hover:text-white/70 hover:bg-white/8'
              }`}
              style={activeCat === cat.id ? { backgroundColor: '#C9A84C' } : {}}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 메인 레이아웃 (사이드바 + 상세) ── */}
      <div className="max-w-6xl mx-auto flex min-h-[70vh]">

        {/* 도구 목록 */}
        <div className="w-full md:w-[340px] shrink-0 border-r border-white/8 overflow-y-auto">
          <div className="p-3 space-y-1.5">
            {displayTools.map((tool) => {
              const isFree = FREE_IDS.has(tool.id);
              const isActive = activeTool?.id === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl cursor-pointer border-none transition-all ${
                    isActive ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-bold text-white/25">#{tool.no}</span>
                        {isFree ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>FREE</span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/8 text-white/25">PRO</span>
                        )}
                      </div>
                      <p className={`text-[12.5px] font-semibold leading-snug truncate ${isActive ? 'text-white' : 'text-white/60'}`}>
                        {tool.title}
                      </p>
                    </div>
                    {!isFree && <Lock size={11} className="shrink-0 text-white/20 mt-1" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 상세 패널 */}
        <div className="flex-1 min-w-0 p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeTool ? (
              <motion.div
                key={activeTool.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* 헤더 */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {FREE_IDS.has(activeTool.id) ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.18)', color: '#C9A84C' }}>🆓 무료 공개</span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/8 text-white/35">🔒 멤버십 전용</span>
                      )}
                      <span className="text-white/20 text-[10px]">#{activeTool.no}</span>
                    </div>
                    <h2 className="apple-white-gradient font-extrabold text-[22px] sm:text-[26px] tracking-tight leading-snug">{activeTool.title}</h2>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {activeTool.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/30 flex items-center gap-1">
                          <Tag size={8} />#{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {FREE_IDS.has(activeTool.id) ? (
                  /* ── 무료 도구 전체 공개 ── */
                  <div className="space-y-6">
                    <p className="text-white/60 text-[14px] leading-relaxed">{activeTool.desc}</p>

                    {/* 사용법 */}
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-3">사용 방법</p>
                      <div className="space-y-2">
                        {activeTool.usage.map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-black mt-0.5" style={{ backgroundColor: '#C9A84C' }}>{i + 1}</span>
                            <p className="text-white/60 text-[13px] leading-snug">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 팁 */}
                    {activeTool.tips && (
                      <div className="p-4 rounded-xl border" style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.05)' }}>
                        <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>💡 Tip</p>
                        <p className="text-white/65 text-[13px] leading-relaxed">{activeTool.tips}</p>
                      </div>
                    )}

                    {/* 샘플 프롬프트 */}
                    {activeTool.samplePrompt && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[11px] font-bold tracking-widest uppercase text-white/30">샘플 프롬프트</p>
                          <CopyBtn text={activeTool.samplePrompt} />
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                          <p className="text-white/65 text-[13px] leading-relaxed font-mono whitespace-pre-wrap">{activeTool.samplePrompt}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── 잠긴 도구 블러 처리 ── */
                  <div className="relative">
                    <div className="blur-sm pointer-events-none select-none space-y-5">
                      <p className="text-white/60 text-[14px] leading-relaxed">{activeTool.desc}</p>
                      <div className="space-y-2">
                        {activeTool.usage.map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-white/10 text-white/30 flex items-center justify-center text-[10px]">{i + 1}</span>
                            <p className="text-white/40 text-[13px]">{step}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                        <p className="text-white/30 text-[13px] font-mono">{activeTool.samplePrompt}</p>
                      </div>
                    </div>
                    {/* 잠금 오버레이 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)' }}>
                      <div className="text-center px-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/15" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                          <Lock size={20} style={{ color: '#C9A84C' }} />
                        </div>
                        <p className="text-white font-bold text-[16px] mb-1">멤버십 전용 콘텐츠</p>
                        <p className="text-white/45 text-[13px] mb-5">전체 {totalCount}개 프롬프트 + 강의까지 모두 이용하세요</p>
                        <button
                          onClick={() => navigate('/enroll')}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-extrabold cursor-pointer border-none mx-auto transition-all hover:scale-105"
                          style={{ backgroundColor: '#C9A84C', color: '#000' }}
                        >
                          멤버십 가입하기
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <BookOpen size={32} className="text-white/20 mb-3" />
                <p className="text-white/30 text-[14px]">왼쪽 목록에서 프롬프트를 선택하세요</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── 업그레이드 CTA 배너 ── */}
      <section className="py-16 border-t border-white/8 mt-8" style={{ background: 'rgba(201,168,76,0.04)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9A84C' }}>Premium Access</p>
            <h2 className="text-[24px] sm:text-[32px] font-extrabold tracking-tight mb-3">
              나머지 {totalCount - freeCount}개 프롬프트도<br />
              <span className="apple-gold-gradient">전부 열어보세요</span>
            </h2>
            <p className="text-white/45 text-[14px] mb-8 leading-relaxed">
              강의 {TOOL_CATEGORIES.length}개 에피소드 + 프롬프트 {totalCount}개 + 멘토링 커뮤니티까지 무제한
            </p>
            <button
              onClick={() => navigate('/enroll')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[14px] font-extrabold cursor-pointer border-none transition-all hover:scale-105"
              style={{ backgroundColor: '#C9A84C', color: '#000' }}
            >
              지금 멤버십 가입하기
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
