"use client";

import Link from "next/link";
import { ReactNode } from "react";

type CardSwapProps = {
  title: string;
  href: string;
  className?: string;
  heightClass?: string; // e.g. h-[420px]
  children: ReactNode; // back content (real demo)
};

// CSS-only swap interaction inspired by reactbits CardSwap
export default function CardSwap({
  title,
  href,
  className = "",
  heightClass = "h-[420px]",
  children,
}: CardSwapProps) {
  return (
    <div className={`group relative rounded-xl border border-gray-200 bg-white ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="font-medium text-gray-900">{title}</span>
        <Link href={href} className="text-sm text-gray-600 hover:underline">
          Abrir
        </Link>
      </div>

      <div className={`relative w-full ${heightClass} overflow-hidden`}>
        {/* FRONT (placeholder card) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:rotate-[-2deg]"
        >
          <div className="h-full w-full rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
            <div className="text-center select-none">
              <div className="text-gray-900 font-medium">Vista previa</div>
              <div className="text-gray-500 text-sm mt-1">Pasa el ratón para ver la demo</div>
            </div>
          </div>
        </div>

        {/* BACK (real demo) */}
        <div
          className="absolute inset-0 z-0 opacity-0 translate-y-4 scale-[0.98] transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
        >
          {children}
        </div>
      </div>
    </div>
  );
}


