import { useEffect, useRef } from 'react';

interface NodeType {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
  ps: number;
}

export function AINetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dims = { w: 0, h: 0 };

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      dims.w = canvas.offsetWidth;
      dims.h = canvas.offsetHeight;
      canvas.width = dims.w * dpr;
      canvas.height = dims.h * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const NODE_COUNT = 60;
    const MAX_DIST = 145;

    const nodes: NodeType[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * dims.w,
      y: Math.random() * dims.h,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.6 + 0.7,
      pulse: Math.random() * Math.PI * 2,
      ps: 0.012 + Math.random() * 0.018,
    }));

    const frame = () => {
      const { w, h } = dims;
      ctx.clearRect(0, 0, w, h);

      // 노드 이동
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.ps;
        if (n.x < 0)  { n.x = 0;  n.vx = Math.abs(n.vx); }
        if (n.x > w)  { n.x = w;  n.vx = -Math.abs(n.vx); }
        if (n.y < 0)  { n.y = 0;  n.vy = Math.abs(n.vy); }
        if (n.y > h)  { n.y = h;  n.vy = -Math.abs(n.vy); }
      });

      // 연결선
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = '#ffffff';
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            ctx.globalAlpha = (1 - d / MAX_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 노드 점
      nodes.forEach(n => {
        const g = Math.sin(n.pulse) * 0.28 + 0.72;
        ctx.globalAlpha = 0.6 * g;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setupCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.55 }}
    />
  );
}
