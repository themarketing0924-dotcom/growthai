import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
      <Seo title="페이지를 찾을 수 없습니다 | GrowthAI" description="요청하신 페이지가 존재하지 않습니다." noindex />
      <div>
        <p className="text-[13px] font-extrabold tracking-[0.28em] uppercase mb-4" style={{ color: '#C9A84C' }}>404</p>
        <h1 className="apple-white-gradient font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-white/50 text-[15px] mb-8">주소가 잘못되었거나, 삭제되었거나, 이동되었을 수 있습니다.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3.5 rounded-xl font-bold text-[14px] cursor-pointer border-none"
          style={{ backgroundColor: '#C9A84C', color: '#0a0a0a' }}
        >
          홈으로 돌아가기 →
        </button>
      </div>
    </div>
  );
}
