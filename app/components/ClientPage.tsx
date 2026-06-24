"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Data ── */
const links = [
  {
    title: "Follow on X (Twitter)",
    subtitle: "@agentrax88",
    href: "https://x.com/agentrax88",
    color: "#1a8cd8",
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
    color: "#c13584",
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    title: "Connect on LinkedIn",
    subtitle: "AgentraX Company",
    href: "https://www.linkedin.com/company/agentrax",
    color: "#0a66c2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const stats = [
  { num: "4",    label: "Platforms" },
  { num: "AI",   label: "Powered"   },
  { num: "24/7", label: "Active"    },
];

const TAGLINE = "Building the future with intelligent AI agents. Follow us on all platforms to stay updated.";
const PROFILE_URL = "https://agentrax-links.vercel.app";

/* ── Icons ── */
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
    <svg className="verified-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#c4883a" opacity="0.18"/>
      <path d="M9 12l2 2 4-4" stroke="#c4883a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

/* ── Ripple helper ── */
function createRipple(e: React.MouseEvent<HTMLAnchorElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top  - size / 2;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  card.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

/* ════ MAIN COMPONENT ════ */
export default function ClientPage() {
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState<{ msg: string; hiding: boolean } | null>(null);
  const [tagline, setTagline] = useState("");
  const [typeDone, setTypeDone] = useState(false);
  const toastTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* — Cleanup timers on unmount — */
  useEffect(() => {
    return () => {
      if (toastTimer.current)  clearTimeout(toastTimer.current);
      if (toastTimer2.current) clearTimeout(toastTimer2.current);
    };
  }, []);

  /* — Dark mode: read from localStorage on mount — */
  useEffect(() => {
    const saved = localStorage.getItem("ax-theme");
    const isDark = saved ? saved === "dark" : true; // default: dark
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

  /* — Typewriter — */
  useEffect(() => {
    let i = 0;
    setTagline("");
    setTypeDone(false);
    const timer = setInterval(() => {
      i++;
      setTagline(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) {
        clearInterval(timer);
        setTypeDone(true);
      }
    }, 22);
    return () => clearInterval(timer);
  }, []);

  /* — Toast — */
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current)  clearTimeout(toastTimer.current);
    if (toastTimer2.current) clearTimeout(toastTimer2.current);
    setToast({ msg, hiding: false });
    toastTimer.current = setTimeout(() => {
      setToast((t) => t ? { ...t, hiding: true } : null);
      toastTimer2.current = setTimeout(() => setToast(null), 320);
    }, 2200);
  }, []);

  /* — Copy link — */
  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_URL);
      showToast("Link copied!");
    } catch {
      showToast("Could not copy");
    }
  }, [showToast]);

  /* Social list */
  const socials = [
    { href: "https://x.com/agentrax88", label: "X", icon: links[0].icon },
    { href: "https://www.instagram.com/agentrax_", label: "Instagram", icon: links[1].icon },
    { href: "https://www.facebook.com/profile.php?id=61587714180175", label: "Facebook", icon: links[2].icon },
    { href: "https://www.linkedin.com/company/agentrax", label: "LinkedIn", icon: links[3].icon },
  ];

  return (
    <div className="bg-main">
      {/* Blobs */}
      <div className="blob blob-1" aria-hidden="true"/>
      <div className="blob blob-2" aria-hidden="true"/>
      <div className="blob blob-3" aria-hidden="true"/>

      {/* Dark/Light toggle */}
      <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle theme">
        {dark ? <SunIcon/> : <MoonIcon/>}
      </button>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.hiding ? "hiding" : ""}`}>
          <CheckIcon/>
          {toast.msg}
        </div>
      )}

      <div className="page-inner">

        {/* Logo */}
        <div className="logo-outer anim-scale d-0">
          <div className="logo-wrap">
            <Image
              src="/logo.jpeg"
              alt="AgentraX Logo"
              width={128} height={128}
              priority
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Name + verified */}
        <div className="anim-up d-1"
          style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
          <h1 className="brand-title">
            Agentra<span className="text-gold-anim">X</span>
          </h1>
          <VerifiedIcon/>
        </div>

        {/* Badge */}
        <div className="anim-up d-2" style={{ marginBottom:12 }}>
          <div className="badge-wrap">
            <span className="badge-dot"/>
            AI Agents &amp; Automation
          </div>
        </div>

        {/* Tagline with typewriter */}
        <p className="tagline anim-up d-3" style={{ marginBottom: 16 }}>
          {tagline}
          {!typeDone && <span className="cursor-blink" aria-hidden="true"/>}
        </p>

        {/* Copy link button */}
        <div className="anim-up d-3" style={{ marginBottom: 24 }}>
          <button className="copy-btn" onClick={copyLink} aria-label="Copy profile link">
            <CopyIcon/>
            Copy Profile Link
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row anim-up d-4" style={{ marginBottom: 28 }}>
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider anim-up d-4" style={{ marginBottom: 20 }}/>

        {/* Section label */}
        <p className="section-label anim-up d-5" style={{ marginBottom: 12 }}>
          Find us online
        </p>

        {/* Link cards */}
        <div className="links-list">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`link-card anim-up d-${i + 6}`}
              onClick={createRipple}
            >
              <div className="icon-box" style={{ color: link.color }}>
                {link.icon}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="card-title">{link.title}</div>
                <div className="card-sub">{link.subtitle}</div>
              </div>
              <div className="arrow-wrap">
                <ArrowRight/>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="divider anim-up d-10" style={{ marginTop:32, marginBottom:22 }}/>

        {/* Social icons */}
        <div className="social-row anim-up d-10">
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              className="social-btn" aria-label={s.label} title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="footer-area anim-up d-11" style={{ marginTop: 28 }}>
          <div className="footer-brand">
            <span>© 2026 AgentraX</span>
            <span className="footer-dot"/>
            <span>All rights reserved</span>
          </div>
        </div>

      </div>
    </div>
  );
}
