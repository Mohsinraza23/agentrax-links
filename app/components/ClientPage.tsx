"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";

/* ════════════════════════════════════
   LINK DATA
════════════════════════════════════ */
interface LinkItem {
  title: string;
  subtitle: string;
  href: string;
  color: string;
  tint: string;
  border: string;
  glow: string;
  glowSm: string;
  iconBg: string;
  featured?: boolean;
  fullCol?: boolean;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  label: string;
  links: LinkItem[];
}

const categories: Category[] = [
  {
    id: "social",
    label: "Social Media",
    links: [
      {
        title: "Follow on X (Twitter)",
        subtitle: "@agentrax88",
        href: "https://x.com/agentrax88",
        color: "#1d9bf0",
        tint: "rgba(29,155,240,0.06)",
        border: "rgba(29,155,240,0.32)",
        glow: "rgba(29,155,240,0.18)",
        glowSm: "rgba(29,155,240,0.1)",
        iconBg: "rgba(29,155,240,0.08)",
        featured: true,
        fullCol: true,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
        ),
      },
      {
        title: "Follow on Instagram",
        subtitle: "@agentrax_",
        href: "https://www.instagram.com/agentrax_",
        color: "#e1306c",
        tint: "rgba(225,48,108,0.055)",
        border: "rgba(225,48,108,0.3)",
        glow: "rgba(225,48,108,0.16)",
        glowSm: "rgba(225,48,108,0.09)",
        iconBg: "rgba(225,48,108,0.08)",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        ),
      },
      {
        title: "Follow on Facebook",
        subtitle: "AgentraX Official Page",
        href: "https://www.facebook.com/profile.php?id=61587714180175",
        color: "#1877f2",
        tint: "rgba(24,119,242,0.055)",
        border: "rgba(24,119,242,0.3)",
        glow: "rgba(24,119,242,0.16)",
        glowSm: "rgba(24,119,242,0.09)",
        iconBg: "rgba(24,119,242,0.08)",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: "professional",
    label: "Connect",
    links: [
      {
        title: "Connect on LinkedIn",
        subtitle: "AgentraX Company",
        href: "https://www.linkedin.com/company/agentrax",
        color: "#0a66c2",
        tint: "rgba(10,102,194,0.055)",
        border: "rgba(10,102,194,0.3)",
        glow: "rgba(10,102,194,0.16)",
        glowSm: "rgba(10,102,194,0.09)",
        iconBg: "rgba(10,102,194,0.08)",
        fullCol: true,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        ),
      },
    ],
  },
];

/* ════════════════════════════════════
   STATS
════════════════════════════════════ */
const statsData = [
  {
    display: "4", numVal: 4, animate: true, label: "Platforms",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    display: "AI", numVal: 0, animate: false, label: "Powered",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    display: "24/7", numVal: 0, animate: false, label: "Active",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

const PROFILE_URL = "https://agentrax-links.vercel.app";
const TAGLINE = "Building the future with intelligent AI agents. Follow us on all platforms to stay updated.";

/* ════════════════════════════════════
   COUNTER ANIMATION HOOK
════════════════════════════════════ */
function useCountUp(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* ════════════════════════════════════
   ICONS
════════════════════════════════════ */
function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}
function VerifiedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.9 }}>
      <circle cx="12" cy="12" r="10" fill="#c4883a" opacity="0.18"/>
      <path d="M9 12l2 2 4-4" stroke="#c4883a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

/* ════════════════════════════════════
   RIPPLE
════════════════════════════════════ */
function createRipple(e: React.MouseEvent<HTMLAnchorElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const el = document.createElement("span");
  el.className = "ripple";
  el.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  card.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

/* ════════════════════════════════════
   STAT ITEM
════════════════════════════════════ */
function StatItem({ stat }: { stat: typeof statsData[0] }) {
  const count = useCountUp(stat.animate ? stat.numVal : 0, 1400);
  return (
    <div className="stat-item">
      <div className="stat-icon">{stat.icon}</div>
      <span className="stat-num">{stat.animate ? count : stat.display}</span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

/* ════════════════════════════════════
   LINK CARD
════════════════════════════════════ */
function CardInner({ link }: { link: LinkItem }) {
  const cardStyle = {
    "--p-tint":    link.tint,
    "--p-border":  link.border,
    "--p-glow":    link.glow,
    "--p-glow-sm": link.glowSm,
    "--p-color":   link.color,
    "--p-icon-bg": link.iconBg,
  } as CSSProperties;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
      style={cardStyle}
      onClick={createRipple}
    >
      <div className="icon-box" style={{ color: link.color }}>{link.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="card-title">{link.title}</div>
        <div className="card-sub">{link.subtitle}</div>
      </div>
      <div className="visit-group">
        <span className="visit-text">Visit</span>
        <div className="arrow-wrap"><ArrowRight /></div>
      </div>
    </a>
  );
}

function LinkCard({ link, delay }: { link: LinkItem; delay: number }) {
  const animClass = `anim-up d-${delay}`;

  /* Featured: outer div fades in, inner featured-wrap animates border */
  if (link.featured) {
    return (
      <div className={`${animClass} full-col`}>
        <div className="featured-wrap">
          <CardInner link={link} />
        </div>
      </div>
    );
  }

  /* Full-width non-featured (e.g. LinkedIn) */
  if (link.fullCol) {
    return (
      <div className={`${animClass} full-col`}>
        <CardInner link={link} />
      </div>
    );
  }

  /* Normal card */
  return (
    <div className={animClass}>
      <CardInner link={link} />
    </div>
  );
}

/* ════════════════════════════════════
   MAIN PAGE
════════════════════════════════════ */
export default function ClientPage() {
  const [dark, setDark] = useState(true);
  const [toast, setToast] = useState<{ msg: string; hiding: boolean } | null>(null);
  const [tagline, setTagline] = useState("");
  const [typeDone, setTypeDone] = useState(false);
  const toastTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Cleanup */
  useEffect(() => {
    return () => {
      if (toastTimer.current)  clearTimeout(toastTimer.current);
      if (toastTimer2.current) clearTimeout(toastTimer2.current);
    };
  }, []);

  /* Dark mode init */
  useEffect(() => {
    const saved = localStorage.getItem("ax-theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("ax-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  /* Typewriter */
  useEffect(() => {
    let i = 0;
    setTagline(""); setTypeDone(false);
    const t = setInterval(() => {
      i++;
      setTagline(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) { clearInterval(t); setTypeDone(true); }
    }, 22);
    return () => clearInterval(t);
  }, []);

  /* Toast */
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current)  clearTimeout(toastTimer.current);
    if (toastTimer2.current) clearTimeout(toastTimer2.current);
    setToast({ msg, hiding: false });
    toastTimer.current = setTimeout(() => {
      setToast((t) => t ? { ...t, hiding: true } : null);
      toastTimer2.current = setTimeout(() => setToast(null), 320);
    }, 2200);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_URL);
      showToast("Link copied!");
    } catch { showToast("Could not copy"); }
  }, [showToast]);

  /* Pre-compute delays — no mutation in render */
  const delayMap = (() => {
    const map: Record<string, number> = {};
    let d = 5;
    categories.forEach((cat) => {
      map[`label-${cat.id}`] = d;
      cat.links.forEach((link) => {
        map[link.href] = d++;
      });
    });
    return map;
  })();

  return (
    <div className="bg-main">

      {/* Aurora layers */}
      <div className="aurora" aria-hidden="true">
        <div className="au1"/><div className="au2"/>
        <div className="au3"/><div className="au4"/>
      </div>

      {/* Glass header */}
      <header className="glass-header">
        <div className="header-brand">
          <div className="header-logo">
            <Image src="/logo.jpeg" alt="AgentraX" width={30} height={30}
              style={{ objectFit: "cover", width: "100%", height: "100%" }} priority />
          </div>
          <span className="header-name">Agentra<span>X</span></span>
        </div>
        <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle theme">
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {/* Toast */}
      {toast && (
        <div className={`toast${toast.hiding ? " hiding" : ""}`}>
          <CheckIcon />{toast.msg}
        </div>
      )}

      <div className="page-inner">

        {/* Logo */}
        <div className="logo-outer anim-scale d-0">
          <div className="logo-wrap">
            <Image src="/logo.jpeg" alt="AgentraX Logo" width={120} height={120} priority
              style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        </div>

        {/* Name */}
        <div className="anim-up d-1" style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
          <h1 className="brand-title">Agentra<span className="text-gold-anim">X</span></h1>
          <VerifiedIcon />
        </div>

        {/* Status tags */}
        <div className="tags-row anim-up d-2" style={{ marginBottom: 10 }}>
          <div className="available-tag">
            <span className="avail-dot" />
            Open to Collaborations
          </div>
        </div>

        {/* Location + niche */}
        <div className="tags-row anim-up d-2" style={{ marginBottom: 12 }}>
          <div className="badge-wrap">
            <span className="badge-dot" />
            AI Agents &amp; Automation
          </div>
          <div className="location-tag">
            🌍 Pakistan
          </div>
        </div>

        {/* Tagline */}
        <p className="tagline anim-up d-3" style={{ marginBottom: 14 }}>
          {tagline}
          {!typeDone && <span className="cursor-blink" aria-hidden="true" />}
        </p>

        {/* Copy link */}
        <div className="anim-up d-3" style={{ marginBottom: 22 }}>
          <button className="copy-btn" onClick={copyLink} aria-label="Copy profile link">
            <CopyIcon />Copy Profile Link
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row anim-up d-4" style={{ marginBottom: 26 }}>
          {statsData.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>

        <div className="divider anim-up d-4" style={{ marginBottom: 22 }} />

        {/* Link categories */}
        {categories.map((cat) => (
          <div key={cat.id} style={{ width: "100%", marginBottom: 20 }}>
            <p className="cat-label anim-up"
              style={{ marginBottom: 10, animationDelay: `${delayMap[`label-${cat.id}`] * 65}ms` }}>
              {cat.label}
            </p>
            <div className="links-grid">
              {cat.links.map((link) => (
                <LinkCard key={link.href} link={link} delay={delayMap[link.href]} />
              ))}
            </div>
          </div>
        ))}

        <div className="divider anim-up d-10" style={{ marginTop: 8, marginBottom: 22 }} />

        {/* Social icons */}
        <div className="social-row anim-up d-11">
          {[
            { href: "https://x.com/agentrax88",                              cls: "s-x",  label: "X",         icon: categories[0].links[0].icon },
            { href: "https://www.instagram.com/agentrax_",                   cls: "s-ig", label: "Instagram",  icon: categories[0].links[1].icon },
            { href: "https://www.facebook.com/profile.php?id=61587714180175",cls: "s-fb", label: "Facebook",   icon: categories[0].links[2].icon },
            { href: "https://www.linkedin.com/company/agentrax",             cls: "s-li", label: "LinkedIn",   icon: categories[1].links[0].icon },
          ].map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              className={`social-btn ${s.cls}`} aria-label={s.label} title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="footer-area anim-up d-12" style={{ marginTop: 26 }}>
          <div className="footer-brand">
            <span>© 2026 AgentraX</span>
            <span className="footer-dot" />
            <span>All rights reserved</span>
          </div>
          <p className="footer-powered">
            Powered by <span>AgentraX</span> · AI &amp; Automation
          </p>
        </div>

      </div>
    </div>
  );
}
