import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentrax-links.vercel.app"),
  title: "AgentraX — Links",
  description: "AI Agents & Automation | Follow AgentraX on all platforms",
  keywords: ["AgentraX", "AI Agents", "Automation", "AI", "Links"],
  openGraph: {
    title: "AgentraX — Links",
    description: "AI Agents & Automation | Follow AgentraX on all platforms",
    images: ["/logo.jpeg"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AgentraX — Links",
    description: "AI Agents & Automation | Follow AgentraX on all platforms",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        {/* Inject theme before paint to prevent dark/light flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('ax-theme');var d=s?s==='dark':true;if(d)document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c4883a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AgentraX" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
