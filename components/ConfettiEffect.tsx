
import React, { useEffect, useRef } from 'react';

export const ConfettiEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const pieces: any[] = [];
    const pieceCount = 150;
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fff1f2', '#fecdd3', '#ffffff', '#fbbf24'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Piece {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      rotation: number;
      rotationSpeed: number;
      oscillation: number;
      oscillationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * -canvas!.height;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.oscillation = 0;
        this.oscillationSpeed = Math.random() * 0.1;
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        this.oscillation += this.oscillationSpeed;
        this.x += Math.sin(this.oscillation) * 2;

        if (this.y > canvas!.height) {
          this.y = -20;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate((this.rotation * Math.PI) / 180);
        ctx!.fillStyle = this.color;
        ctx!.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx!.restore();
      }
    }

    for (let i = 0; i < pieceCount; i++) {
      pieces.push(new Piece());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};
