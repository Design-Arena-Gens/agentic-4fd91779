"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

const PRIMARY_COLORS = [
  { hex: "#00f5ff", glow: "rgba(0, 245, 255, 0.32)" },
  { hex: "#ff56f6", glow: "rgba(255, 86, 246, 0.28)" },
  { hex: "#ffb86b", glow: "rgba(255, 184, 107, 0.22)" },
  { hex: "#7cffb2", glow: "rgba(124, 255, 178, 0.24)" },
];

function drawProfileArt(ctx: CanvasRenderingContext2D) {
  const size = 900;
  ctx.canvas.width = size;
  ctx.canvas.height = size;

  // Base background
  ctx.fillStyle = "#070212";
  ctx.fillRect(0, 0, size, size);

  const backdropGradient = ctx.createLinearGradient(0, 0, size, size);
  backdropGradient.addColorStop(0, "#1a0b37");
  backdropGradient.addColorStop(0.58, "#05032c");
  backdropGradient.addColorStop(1, "#0a081b");
  ctx.fillStyle = backdropGradient;
  ctx.fillRect(0, 0, size, size);

  // Soft glow beams
  PRIMARY_COLORS.forEach((color, index) => {
    const angle = (-0.8 + index * 0.45) * Math.PI;
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(angle);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.38;
    const beamGradient = ctx.createLinearGradient(-size, 0, size, 0);
    beamGradient.addColorStop(0, "transparent");
    beamGradient.addColorStop(0.45, color.glow);
    beamGradient.addColorStop(0.55, color.glow);
    beamGradient.addColorStop(1, "transparent");
    ctx.fillStyle = beamGradient;
    ctx.fillRect(-size, -120 - index * 12, size * 2, 240 + index * 24);
    ctx.restore();
  });

  // Halo rings
  [260, 310, 360].forEach((radius, idx) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + idx * 0.04})`;
    ctx.lineWidth = 2 + idx * 2;
    ctx.setLineDash(idx === 1 ? [20, 14] : []);
    ctx.shadowBlur = 15 + idx * 10;
    ctx.shadowColor = idx === 2 ? "rgba(255, 86, 246, 0.35)" : "rgba(0, 245, 255, 0.28)";
    ctx.stroke();
    ctx.restore();
  });

  // Core circle
  const coreGradient = ctx.createRadialGradient(size / 2, size / 2 - 60, 80, size / 2, size / 2, 320);
  coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.25)");
  coreGradient.addColorStop(0.35, "rgba(255, 86, 246, 0.4)");
  coreGradient.addColorStop(0.72, "rgba(0, 245, 255, 0.55)");
  coreGradient.addColorStop(1, "rgba(7, 2, 18, 0.85)");
  ctx.save();
  ctx.fillStyle = coreGradient;
  ctx.shadowBlur = 68;
  ctx.shadowColor = "rgba(0, 245, 255, 0.55)";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Texture arcs
  ctx.save();
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.globalAlpha = 0.8;
  PRIMARY_COLORS.forEach((color, i) => {
    ctx.strokeStyle = color.hex;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 170 + i * 18, 0.15 + i * 0.15, 1.4 + i * 0.42);
    ctx.stroke();
  });
  ctx.restore();

  // Highlight shards
  const drawShard = (x: number, y: number, rotation: number, tint: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    const shardGradient = ctx.createLinearGradient(-80, -40, 80, 40);
    shardGradient.addColorStop(0, "rgba(255,255,255,0)");
    shardGradient.addColorStop(0.4, tint);
    shardGradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = shardGradient;
    ctx.fillRect(-120, -16, 240, 32);
    ctx.restore();
  };

  drawShard(size * 0.25, size * 0.35, -0.6, "rgba(0,245,255,0.3)");
  drawShard(size * 0.7, size * 0.32, 0.55, "rgba(255,86,246,0.28)");
  drawShard(size * 0.62, size * 0.72, 1.1, "rgba(255,184,107,0.22)");

  // Central badge
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "rgba(5, 3, 25, 0.82)";
  ctx.shadowBlur = 45;
  ctx.shadowColor = "rgba(255, 86, 246, 0.5)";
  ctx.arc(size / 2, size / 2, 195, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 6;
  ctx.globalCompositeOperation = "lighter";
  ctx.setLineDash([18, 10]);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 195, 0.1, Math.PI * 1.9);
  ctx.stroke();
  ctx.restore();

  // Iconic lightning bolt
  ctx.save();
  ctx.translate(size / 2, size / 2 - 60);
  ctx.fillStyle = "#00f5ff";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "rgba(0, 245, 255, 0.8)";
  ctx.beginPath();
  ctx.moveTo(-30, -80);
  ctx.lineTo(40, -40);
  ctx.lineTo(5, -32);
  ctx.lineTo(30, 40);
  ctx.lineTo(-22, 14);
  ctx.lineTo(-8, 80);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Main typography
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 128px 'Poppins', 'Inter', sans-serif";
  ctx.fillText("EDITLAB", size / 2, size / 2 + 70);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.74)";
  ctx.textAlign = "center";
  ctx.font = "600 44px 'Poppins', 'Inter', sans-serif";
  ctx.fillText("V I S U A L S", size / 2, size / 2 + 160);
  ctx.restore();

  // Accent dots
  const dots = [
    { x: size * 0.22, y: size * 0.28, color: "#00f5ff" },
    { x: size * 0.82, y: size * 0.25, color: "#ff56f6" },
    { x: size * 0.18, y: size * 0.75, color: "#ffb86b" },
    { x: size * 0.78, y: size * 0.78, color: "#7cffb2" },
  ];

  dots.forEach((dot) => {
    ctx.save();
    ctx.fillStyle = dot.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Subtle noise overlay
  const noiseDensity = 5200;
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < noiseDensity; i += 1) {
    const px = Math.floor(Math.random() * size);
    const py = Math.floor(Math.random() * size);
    const index = (py * size + px) * 4;
    const shade = 12 + Math.random() * 18;
    imageData.data[index] = shade;
    imageData.data[index + 1] = shade;
    imageData.data[index + 2] = shade;
    imageData.data[index + 3] = 40 + Math.random() * 90;
  }
  ctx.putImageData(imageData, 0, 0);
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawProfileArt(ctx);
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "editlab-profile.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <span className={styles.tag}>fresh insta identity</span>
        <h1 className={styles.title}>EDITLAB Neon Pulse</h1>
        <p className={styles.subtitle}>
          A high-voltage profile picture crafted for video editors and remix artists.
          Drop it straight into your Insta profile to flex a futuristic brand vibe.
        </p>
      </section>
      <div className={styles.previewShell}>
        <div className={styles.previewFrame}>
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>
        <div className={styles.floatingLabels}>
          <span>#editszn</span>
          <span>#neonwave</span>
          <span>#aftereffects</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={handleDownload}>
          Download PNG
        </button>
        <a
          href="https://instagram.com/accounts/edit/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryButton}
        >
          Update profile
        </a>
      </div>
      <p className={styles.tip}>
        Tip: Instagram profile photos crop to a circle — the artwork is centered with a glow so it
        stays sharp inside the circle.
      </p>
    </main>
  );
}
