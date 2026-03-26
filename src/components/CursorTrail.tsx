"use client";

import { useEffect, useRef, useCallback } from "react";

type TrailPoint = {
  x: number;
  y: number;
  age: number;
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);

  const MAX_TRAIL = 25;
  const TRAIL_LIFETIME = 1;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match window
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const trail = trailRef.current;
    const now = performance.now() / 1000;

    // Add current mouse position
    const last = trail[trail.length - 1];
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    if (!last || Math.abs(last.x - mx) > 2 || Math.abs(last.y - my) > 2) {
      trail.push({ x: mx, y: my, age: now });
      if (trail.length > MAX_TRAIL) trail.shift();
    }

    // Remove old points
    while (trail.length > 0 && now - trail[0].age > TRAIL_LIFETIME) {
      trail.shift();
    }

    if (trail.length < 2) {
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    // Draw gradient trail
    for (let i = 1; i < trail.length; i++) {
      const p0 = trail[i - 1];
      const p1 = trail[i];
      const progress = i / trail.length; // 0 → 1 (oldest → newest)
      const age0 = 1 - (now - p0.age) / TRAIL_LIFETIME;
      const age1 = 1 - (now - p1.age) / TRAIL_LIFETIME;
      const alpha = Math.max(0, Math.min(1, (age0 + age1) / 2)) * progress;

      if (alpha <= 0) continue;

      const gradient = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
      // Use accent colors (purple → pink gradient)
      gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, ${alpha * 0.8})`);

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 + progress * 3; // thin → thick
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // Draw glow dot at cursor position
    if (trail.length > 0) {
      const tip = trail[trail.length - 1];
      const glow = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 12);
      glow.addColorStop(0, "rgba(168, 85, 247, 0.4)");
      glow.addColorStop(0.5, "rgba(236, 72, 153, 0.15)");
      glow.addColorStop(1, "rgba(236, 72, 153, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  // Hide on touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && canvasRef.current) {
      canvasRef.current.style.display = "none";
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
