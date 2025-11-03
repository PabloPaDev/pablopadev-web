"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

type CardSwapProps = PropsWithChildren<{
  title: string;
  href: string;
  className?: string;
  heightClass?: string; // e.g. h-[420px]
}>;

export default function CardSwap({ title, href, className = "", heightClass = "h-[420px]", children }: CardSwapProps) {
  return (
    <div className={`group relative border border-gray-200 rounded-xl overflow-hidden bg-white ${className}`}>
      {/* Top bar with title and open link */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="font-medium text-gray-900">{title}</span>
        <Link href={href} className="text-sm text-gray-600 hover:underline">
          Abrir
        </Link>
      </div>

      {/* Swap area */}
      <div className={`relative w-full ${heightClass} bg-gray-50`}>
        {/* Front: subtle placeholder prompting hover */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <div className="text-center">
            <div className="text-gray-900 font-medium">Vista previa</div>
            <div className="text-gray-500 text-sm mt-1">Pasa el ratón para ver la demo</div>
          </div>
        </div>
        {/* Back: actual demo content */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}


