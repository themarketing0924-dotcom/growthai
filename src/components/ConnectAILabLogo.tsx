interface ConnectAILabLogoProps {
  className?: string;
  size?: number;
}

export function ConnectAILabLogo({ className = '', size = 32 }: ConnectAILabLogoProps) {
  // 로고 이미지 파일이 없을 경우 fallback으로 텍스트 표시
  return (
    <img
      src="/logo.png"
      alt="Synaptic Marketing Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={(e) => {
        // 로고 이미지가 없을 경우 숨김 처리
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
