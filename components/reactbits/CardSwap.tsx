"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = { title: string; href: string };

type Props = {
  items: Item[];
  className?: string;
  heightClass?: string; // e.g. h-[360px]
  visibleCount?: number; // cards shown in the fan
  intervalMs?: number; // autoplay interval
};

export default function CardSwap({
  items,
  className = "",
  heightClass = "h-[360px]",
  visibleCount = 5,
  intervalMs = 3500,
}: Props) {
  const safeItems = useMemo(() => (items && items.length ? items : []), [items]);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (safeItems.length === 0 || hovered) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % safeItems.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [safeItems.length, hovered, intervalMs]);

  const count = Math.min(visibleCount, Math.max(1, safeItems.length));
  const order = Array.from({ length: count }, (_, i) => (index + i) % safeItems.length);

  // Fan position helper in [-1,1] symmetrical around center (front card layer 0)
  const fanT = (layer: number, total: number) => {
    if (total === 1) return 0;
    const slots = [-1.0, -0.6, -0.2, 0.2, 0.6, 1.0];
    return slots[layer] ?? 0;
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {order.map((idx, layer) => {
        const item = safeItems[idx];
        const t = fanT(layer, order.length);
        const z = hovered ? -Math.abs(t) * 90 - layer * 10 : -layer * 90;
        const x = hovered ? t * 90 : 0;
        const y = hovered ? 0 : layer * 12;
        const rotZ = hovered ? t * 14 : 0;
        const rotX = hovered ? -3 : 0;
        const scale = hovered ? 1 - layer * 0.02 : 1 - layer * 0.03;

        return (
          <div
            key={`${item.href}-${layer}`}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${rotX}deg) rotateZ(${rotZ}deg) scale(${scale})`,
              transition: "transform 600ms cubic-bezier(0.2,0.8,0.2,1), opacity 600ms",
              zIndex: 100 - layer,
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

      {/* Reserve height */}
      <div className={`invisible ${heightClass}`}></div>
    </div>
  );
}


