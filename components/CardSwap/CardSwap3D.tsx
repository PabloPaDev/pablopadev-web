"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  title: string;
  href: string;
};

type CardSwap3DProps = {
  items: Item[];
  className?: string;
  heightClass?: string; // e.g. h-[360px]
  intervalMs?: number;
};

export default function CardSwap3D({
  items,
  className = "",
  heightClass = "h-[360px]",
  intervalMs = 3500,
}: CardSwap3DProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const safeItems = useMemo(() => (items && items.length > 0 ? items : []), [items]);

  useEffect(() => {
    if (safeItems.length === 0) return;
    if (paused) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % safeItems.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [safeItems.length, paused, intervalMs]);

  // Mostrar hasta 3 tarjetas apiladas visualmente
  const visible = Math.min(5, Math.max(3, safeItems.length));
  const order = Array.from({ length: Math.min(visible, safeItems.length) }, (_, i) => (index + i) % safeItems.length);

  // Map layer -> fan position in [-1,1] so that 0 is center (front), then left/right alternates
  const fanT = (layer: number, count: number) => {
    if (count <= 1) return 0;
    // Order: 0 -> 0, 1 -> -0.6, 2 -> 0.6, 3 -> -1.0, 4 -> 1.0
    const presets = [0, -0.6, 0.6, -1.0, 1.0];
    return presets[layer] ?? 0;
  };

  return (
    <div
      className={`relative group ${className}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      onMouseEnter={() => { setPaused(true); setHovered(true); }}
      onMouseLeave={() => { setPaused(false); setHovered(false); }}
    >
      {order.map((idx, layer) => {
        const item = safeItems[idx];
        const depth = layer; // 0 = front
        const t = fanT(layer, order.length);
        // Non-hover (stacked) vs hover (fan)
        const z = hovered ? -Math.abs(t) * 80 - depth * 10 : -depth * 80;
        const y = hovered ? 0 : depth * 12;
        const x = hovered ? t * 80 : 0;
        const rotZ = hovered ? t * 12 : 0;
        const rotX = hovered ? -2 : 0;
        const scale = hovered ? 1 - depth * 0.02 : 1 - depth * 0.03;
        const opacity = depth >= 3 ? 0.9 : 1;

        return (
          <div
            key={`${item.href}-${layer}`}
            className={`absolute inset-0 will-change-transform`}
            style={{
              transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${scale}) rotateX(${rotX}deg) rotateY(0deg) rotateZ(${rotZ}deg)`,
              transition: "transform 600ms cubic-bezier(0.2,0.8,0.2,1), opacity 600ms",
              zIndex: 100 - layer,
              opacity,
            }}
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <span className="font-medium text-gray-900">{item.title}</span>
                <Link href={item.href} className="text-sm text-gray-600 hover:underline">
                  Abrir
                </Link>
              </div>
              <div className={`relative w-full ${heightClass} bg-gray-50`}>
                <iframe
                  src={item.href}
                  title={item.title}
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Área fantasma para reservar altura */}
      <div className={`invisible ${heightClass}`}></div>
    </div>
  );
}


