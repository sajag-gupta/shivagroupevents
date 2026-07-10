import React, { useRef, useEffect } from "react";
import { useExperience, ExperienceType } from "@/context/ExperienceContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  rotation?: number;
  rotationSpeed?: number;
  wobble?: number;
  wobbleSpeed?: number;
}

export const ParticleCanvas: React.FC = () => {
  const { experienceType } = useExperience();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles(experienceType);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Initialize particles depending on active experience type
    const initParticles = (type: ExperienceType) => {
      particles = [];
      if (type === "none") return;

      const count = type === "corporate" ? 45 : type === "concerts" ? 60 : 35;

      for (let i = 0; i < count; i++) {
        particles.push(createParticle(type));
      }
    };

    const createParticle = (type: ExperienceType, atTop = false): Particle => {
      const x = Math.random() * width;
      const y = atTop ? -20 : Math.random() * height;

      switch (type) {
        case "weddings": // Rose Petals
          return {
            x,
            y,
            vx: (Math.random() * 1 - 0.5) * 0.8,
            vy: Math.random() * 1 + 0.6,
            size: Math.random() * 8 + 6,
            color: `rgba(${200 + Math.random() * 55}, ${50 + Math.random() * 40}, ${70 + Math.random() * 40}, ${Math.random() * 0.4 + 0.3})`,
            opacity: Math.random() * 0.5 + 0.4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() * 0.02 - 0.01) * 1.5,
            wobble: Math.random() * Math.PI,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
          };
        case "corporate": // Technical connecting mesh nodes
          return {
            x,
            y,
            vx: (Math.random() * 0.6 - 0.3) * 0.8,
            vy: (Math.random() * 0.6 - 0.3) * 0.8,
            size: Math.random() * 3 + 1.5,
            color: "rgba(201, 162, 39, 0.45)", // Shiva Gold color
            opacity: Math.random() * 0.5 + 0.25,
          };
        case "concerts": // Concert dust/flashes
          return {
            x,
            y,
            vx: (Math.random() * 0.4 - 0.2) * 0.6,
            vy: (Math.random() * 0.4 - 0.2) * 0.6,
            size: Math.random() * 4 + 2,
            color: `rgba(${Math.random() > 0.5 ? "201, 162, 39" : "255, 255, 255"}, ${Math.random() * 0.4 + 0.25})`,
            opacity: Math.random() * 0.5 + 0.3,
            wobble: Math.random() * Math.PI,
            wobbleSpeed: Math.random() * 0.05 + 0.02,
          };
        case "college-festivals": // Confetti
          const colors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4"];
          return {
            x,
            y,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 + 1.5,
            size: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.6 + 0.4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.1 - 0.05,
          };
        case "home": // Slow elegant gold stardust
        default:
          return {
            x,
            y,
            vx: (Math.random() * 0.3 - 0.15) * 0.5,
            vy: (Math.random() * 0.3 - 0.15) * 0.5,
            size: Math.random() * 3 + 1,
            color: "rgba(201, 162, 39, 0.25)",
            opacity: Math.random() * 0.4 + 0.1,
          };
      }
    };

    initParticles(experienceType);

    // Draw and animate particles loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (experienceType === "none") return;

      // Special Event Specific Background Draws (e.g. Laser strokes, Camera flashes)
      if (experienceType === "concerts") {
        drawSpotlights(ctx, width, height);
        drawCameraFlashes(ctx, width, height);
      }

      particles.forEach((p, idx) => {
        // Move particle
        if (experienceType === "weddings" && p.wobble !== undefined && p.wobbleSpeed !== undefined) {
          p.wobble += p.wobbleSpeed;
          p.x += Math.sin(p.wobble) * 0.4;
          p.y += p.vy;
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Handle bounds (reset or bounce)
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          particles[idx] = createParticle(experienceType, true);
          return;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (experienceType === "weddings") {
          // Draw standard rose petals using bezier curves
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
          ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
          ctx.fill();
        } else if (experienceType === "college-festivals") {
          // Draw confetti squares
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          // Draw circular glowing nodes/dots
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          if (experienceType === "concerts") {
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
          }
          ctx.fill();
        }

        ctx.restore();
      });

      // Special Drawing: Mesh connections for corporate page
      if (experienceType === "corporate") {
        drawMeshConnections(ctx, particles);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Draw lines between nearby nodes in Corporate mode
    const drawMeshConnections = (ctx: CanvasRenderingContext2D, pts: Particle[]) => {
      const maxDist = 120;
      const mouse = mouseRef.current;

      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];

        // Draw line to mouse if close
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < maxDist * 1.5) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(201, 162, 39, ${0.4 * (1 - distMouse / (maxDist * 1.5))})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201, 162, 39, ${0.25 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Spotlights for concert events
    let lightAngle = 0;
    const drawSpotlights = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      lightAngle += 0.005;
      const count = 3;
      const startPositions = [w * 0.15, w * 0.5, w * 0.85];

      ctx.save();
      for (let i = 0; i < count; i++) {
        const sx = startPositions[i];
        const angleOffset = Math.sin(lightAngle + i * 2) * 0.3;
        const tx = sx + Math.sin(angleOffset) * (h * 0.8);

        // Gradient for spotlight cone
        const grad = ctx.createLinearGradient(sx, 0, tx, h);
        grad.addColorStop(0, "rgba(201, 162, 39, 0.08)");
        grad.addColorStop(0.5, "rgba(201, 162, 39, 0.03)");
        grad.addColorStop(1, "rgba(201, 162, 39, 0.0)");

        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(tx - 60, h);
        ctx.lineTo(tx + 60, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();
    };

    // Random camera flash simulators for concerts/stadium effect
    const flashes: { x: number; y: number; r: number; alpha: number }[] = [];
    const drawCameraFlashes = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      // Small chance to create a new flash
      if (Math.random() < 0.07 && flashes.length < 8) {
        flashes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 25 + 15,
          alpha: 1.0,
        });
      }

      ctx.save();
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.alpha -= 0.06; // fade speed

        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        // Draw flash strobe radial gradient
        const radGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${f.alpha})`);
        radGrad.addColorStop(0.2, `rgba(255, 255, 255, ${f.alpha * 0.6})`);
        radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();
      }
      ctx.restore();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [experienceType]);

  if (experienceType === "none") return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
};
