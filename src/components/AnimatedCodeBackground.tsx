import { useEffect, useRef } from 'react';

export function AnimatedCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code-like characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=<>{}[]()*&^%$#@!~`';
    const charArray = chars.split('');
    
    // Font settings - larger and more visible
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops with staggered starting positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -500;
    }

    // Animation function
    const draw = () => {
      // More visible trail effect like Midjourney
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters with varying opacity for depth
      ctx.font = `bold ${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Vary opacity based on position - brighter at bottom
        const opacity = Math.min(1, (y / canvas.height) * 0.15 + 0.05);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        // Add slight glow effect
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';

        ctx.fillText(text, x, y);

        // Reset drop to top randomly after it has fallen
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        // Increment Y coordinate - vary speed slightly
        drops[i] += 0.5 + Math.random() * 0.5;
      }
      
      // Reset shadow
      ctx.shadowBlur = 0;
    };

    // Start animation - smoother frame rate
    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

