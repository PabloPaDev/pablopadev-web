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
  const visible = 3;
  const order = Array.from({ length: Math.min(visible, safeItems.length) }, (_, i) => (index + i) % safeItems.length);

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {order.map((idx, layer) => {
        const item = safeItems[idx];
        const depth = layer; // 0 = front
        const z = -depth * 80; // translateZ
        const y = depth * 12; // slight stacking offset
        const scale = 1 - depth * 0.03;
        const opacity = depth === 2 ? 0.85 : 1; // back card a bit dimmer

        return (
          <div
            key={`${item.href}-${layer}`}
            className={`absolute inset-0 will-change-transform`}
            style={{
              transform: `translateY(${y}px) translateZ(${z}px) scale(${scale}) rotateX(0deg) rotateY(0deg)`,
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


