import type { Metadata } from 'next'
import './globals.css'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Github } from "lucide-react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document, s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://assets.calendly.com/assets/external/widget.js';
                var x = d.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
