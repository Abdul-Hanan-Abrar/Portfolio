import { useState, useEffect, useRef } from "react";

// ─── External URLs & Dynamic Paths ───────────────────────────────────────────
const RESUME_URL = `${import.meta.env.BASE_URL}Resume.pdf`;
const PERSONAL_WEBSITE_URL = "https://abdul-hanan-abrar.github.io/abdulhanan/";
const LINKEDIN = "https://www.linkedin.com/in/abdul-hanan-abrar-8b6a9140b/";
const EMAIL = "abdulhananabrar941@gmail.com";

// ─── Public Folder Asset References ──────────────────────────────────────────
const heroPhoto = `${import.meta.env.BASE_URL}IMG-2024.jpg`;
const aboutPhoto = `${import.meta.env.BASE_URL}IMG-2025.jpg`;
const bizLedgerImg = `${import.meta.env.BASE_URL}BizLedger.png`;
const qrToolImg = `${import.meta.env.BASE_URL}QR-Code.png`;

// ─── Dual-Platform Gmail Dispatcher ───────────────────────────────────────────
const handleEmailClick = (e: React.MouseEvent) => {
  e.preventDefault();
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  if (isAndroid) {
    window.location.href = `intent:#Intent;action=android.intent.action.SENDTO;data=mailto:${EMAIL};package=com.google.android.gm;end`;
    setTimeout(() => { window.location.href = `mailto:${EMAIL}`; }, 500);
  } else if (isIOS) {
    window.location.href = `googlegmail:///co?to=${EMAIL}`;
    setTimeout(() => { window.location.href = `mailto:${EMAIL}`; }, 500);
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`, "_blank", "noopener,noreferrer");
  }
};

// ─── Precision Vector Icons ───────────────────────────────────────────────────
function IconMail({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconLinkedIn({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73s.77-1.73 1.72-1.73c.95 0 1.72.78 1.72 1.73s-.77 1.73-1.72 1.73m1.4 9.74v-8.37H5.06v8.37h2.8Z" />
    </svg>
  );
}

function IconGlobe({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function IconFileDoc({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconArrowExternal({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ─── Modal Architecture ───────────────────────────────────────────────────────
type Project = {
  title: string;
  subtitle: string;
  status: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  meta?: string;
  fullDescription: string;
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c1410] border border-emerald-500/30 text-neutral-100 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full bg-black/60 border-b border-emerald-950/60 overflow-hidden">
          <img src={project.image} alt={project.title} loading="lazy" className="w-full object-contain max-h-[45vh]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95"
          >
            ✕
          </button>
          <span className="absolute top-4 left-4 text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-600/40">
            {project.status}
          </span>
        </div>
        <div className="p-6 sm:p-8 space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">{project.category}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{project.title}</h3>
            <p className="text-sm font-medium text-emerald-300/80 mt-1">{project.subtitle}</p>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300 pt-2 font-normal border-t border-emerald-900/40">
            {project.fullDescription}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                #{t}
              </span>
            ))}
          </div>
          {project.meta && <p className="text-xs text-neutral-400 font-mono pt-2">{project.meta}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Audio Card Component ─────────────────────────────────────────────────────
function AudioCard({
  title,
  titleUrdu,
  tag,
  description,
  audioSrc,
  isPlaying,
  onTogglePlay,
}: {
  title: string;
  titleUrdu: string;
  tag: string;
  description: string;
  audioSrc: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={`relative p-5 rounded-2xl transition-all duration-200 border ${
      isPlaying
        ? "bg-gradient-to-br from-emerald-950/70 to-black/90 border-emerald-400/60 shadow-lg"
        : "bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-emerald-500/40"
    }`}>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        onTimeUpdate={() => {
          if (!audioRef.current) return;
          const curr = audioRef.current.currentTime;
          const dur = audioRef.current.duration || 0;
          setProgress(dur > 0 ? (curr / dur) * 100 : 0);
          setCurrentTime(formatTime(curr));
        }}
        onLoadedMetadata={() => setDuration(formatTime(audioRef.current?.duration || 0))}
        onEnded={onTogglePlay}
      />

      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
              {tag}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-[3px] h-3.5 px-1.5 py-0.5 bg-emerald-500/20 rounded border border-emerald-400/30">
                <span className="w-1 bg-emerald-300 rounded-full animate-wave-1" />
                <span className="w-1 bg-emerald-300 rounded-full animate-wave-2" />
                <span className="w-1 bg-emerald-300 rounded-full animate-wave-3" />
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
          <p className="urdu text-lg text-emerald-400 font-semibold">{titleUrdu}</p>
        </div>

        <button
          onClick={onTogglePlay}
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95 ${
            isPlaying
              ? "bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-400/30"
              : "bg-white/10 hover:bg-emerald-500 text-white hover:text-neutral-950 border border-white/15"
          }`}
          aria-label={isPlaying ? "Pause sample" : "Play sample"}
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed mb-4">{description}</p>

      {/* Scrub Track */}
      <div className="space-y-1.5">
        <div
          className="relative w-full h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden group"
          onClick={(e) => {
            if (!audioRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = clickPos * (audioRef.current.duration || 0);
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Application ─────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "AI Urdu Training / RLHF", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Section targets for Navigation
  const navSections = [
    { id: "hero", label: "Overview" },
    { id: "ai-expertise", label: "AI Urdu Training" },
    { id: "audio-samples", label: "Voice Data" },
    { id: "software", label: "Projects" },
    { id: "operations", label: "Operations" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  // Subtle tonal background shifts per section
  const sectionThemes: Record<string, string> = {
    hero: "#060a08",
    "ai-expertise": "#060e0a",
    "audio-samples": "#070b10",
    software: "#080911",
    operations: "#0b0a07",
    education: "#060b09",
    contact: "#050a07",
  };

  // Fixed scroll calculator guaranteeing accurate landing beneath the sticky header
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 76; // Exact header compensation
      const elementPos = target.getBoundingClientRect().top;
      const targetPos = elementPos + window.pageYOffset - navOffset;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  // Scroll Spy Observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop - 85;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      title: "BizLedger",
      subtitle: "Offline Retail Business Management & POS",
      status: "Active Engineering",
      category: "Full-Stack Web Architecture",
      description: "A self-contained, offline-first Point-of-Sale tool built for small retail establishments across Punjab requiring zero internet connectivity.",
      fullDescription: "BizLedger is engineered for micro-retailers in high-density Punjab markets. Built completely with vanilla JavaScript, HTML5, and IndexedDB for local data persistence with zero network dependencies. It delivers inventory reconciliation, low-stock notifications, monthly operational profit-and-loss generation, and transaction logs without recurring server fees.",
      tags: ["JavaScript", "HTML5", "IndexedDB", "Offline-First", "Retail POS"],
      image: bizLedgerImg,
      meta: "Targeted to 1.3M+ retail shops operating without digital POS software.",
    },
    {
      title: "QR Direct Transfer",
      subtitle: "Optical Hardware Peer-to-Peer Data Pipeline",
      status: "Production Ready",
      category: "Air-Gapped Tooling",
      description: "A cable-free, network-free direct bridge encoding files into real-time optical frames decoded through native device cameras.",
      fullDescription: "Solves immediate air-gapped data transfers between computers and phones without Bluetooth pairing or cloud uploads. Leveraging the native browser BarcodeDetector API and high-density Canvas matrices, files stream securely over camera feeds even in airplane mode.",
      tags: ["BarcodeDetector API", "Canvas 2D", "Vanilla JS", "Zero-Dependency"],
      image: qrToolImg,
    },
  ];

  const voiceSamples = [
    {
      id: "sample-1",
      title: "Conversational Regional Urdu",
      titleUrdu: "قدرتی اردو گفتگو اور تاثرات",
      tag: "Unscripted Dialogue",
      description: "Authentic spontaneous pacing, informal transitions, and natural conversational cadence.",
      audioSrc: `${import.meta.env.BASE_URL}Natural%20Conversational%20Urdu.m4a`,
    },
    {
      id: "sample-2",
      title: "Urdu-English Code-Switching",
      titleUrdu: "اردو انگریزی — مشترکہ فطری گفتگو",
      tag: "Bilingual Code-Switching",
      description: "Natural syntactic switching between Urdu & English used by urban Pakistani professionals.",
      audioSrc: `${import.meta.env.BASE_URL}Natural%20Urdu-English%20Communication.m4a`,
    },
    {
      id: "sample-3",
      title: "Articulate Reading & Explanation",
      titleUrdu: "صاف اردو پڑھائی اور تدریسی انداز",
      tag: "TTS / Acoustic Model",
      description: "Articulate phonetic pronunciation, rhythmic precision, and controlled didactic delivery.",
      audioSrc: `${import.meta.env.BASE_URL}Clear%20Urdu%20Reading%20&%20Natural%20Explanation.m4a`,
    },
    {
      id: "sample-4",
      title: "Acoustic Dialect & Stress Testing",
      titleUrdu: "محتاط سماعت اور غیر واضح کلام",
      tag: "ASR Speech Perception",
      description: "Handling noisy acoustics, colloquial phrases, and subtle dialectal inflections.",
      audioSrc: `${import.meta.env.BASE_URL}Careful%20Listening%20&%20Unclear%20Speech.m4a`,
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/4e10f0fcb6df30d7f3c7ddc9e146742d", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Opportunity: formData.role,
          Message: formData.message,
          _subject: `[Urdu AI Inquiry] From ${formData.name}`,
        }),
      });
      if (res.ok) setFormSent(true);
      else alert("Message delivery failed. Please click 'Email Abdul' directly.");
    } catch {
      alert("Network error. Please click 'Email Abdul' to connect via your mail client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeBgColor = sectionThemes[activeSection] || "#060a08";

  return (
    <div
      className="min-h-screen text-neutral-200 font-sans antialiased selection:bg-emerald-400 selection:text-black transition-colors duration-700 ease-out overflow-x-hidden"
      style={{ backgroundColor: activeBgColor }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap');

        * {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .urdu {
          font-family: 'Noto Nastaliq Urdu', serif !important;
          direction: rtl;
          text-align: right;
          line-height: 2.7 !important;
        }

        /* ── Zero-Lag GPU-Accelerated Scroll Reveals ── */
        .scroll-reveal {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ── Micro Animations ── */
        @keyframes subtle-breath {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.02); opacity: 1; }
        }
        .animate-breath {
          animation: subtle-breath 6s ease-in-out infinite;
        }

        @keyframes wave-bounce {
          0%, 100% { height: 4px; }
          50% { height: 13px; }
        }
        .animate-wave-1 { animation: wave-bounce 0.75s ease-in-out infinite; }
        .animate-wave-2 { animation: wave-bounce 0.75s ease-in-out infinite 0.15s; }
        .animate-wave-3 { animation: wave-bounce 0.75s ease-in-out infinite 0.3s; }

        .glass-surface {
          background: rgba(14, 23, 19, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .glass-surface:hover {
          background: rgba(18, 30, 25, 0.75);
          border-color: rgba(52, 211, 153, 0.3);
        }
      `}</style>

      {/* ── Precision Navigation Bar ── */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#060a08]/90 backdrop-blur-md transition-all duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-300 p-0.5 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#060a08] rounded-[6px] flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                AH
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block group-hover:text-emerald-300 transition-colors">
                Abdul Hanan
              </span>
              <span className="text-[10px] font-mono text-neutral-400 block">
                AI Urdu Language Trainer
              </span>
            </div>
          </button>

          {/* Desktop Section Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-xs">
            {navSections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors duration-150 ${
                    isActive
                      ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
            >
              <IconGlobe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Personal Website</span>
              <IconArrowExternal className="w-3 h-3 text-neutral-500" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:brightness-110 shadow-sm shadow-emerald-500/30 transition-all active:scale-95"
            >
              <IconFileDoc className="w-3.5 h-3.5" />
              <span>CV Download</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060a08]/95 border-b border-white/10 px-4 py-3 space-y-1">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === sec.id
                    ? "text-emerald-300 bg-emerald-500/20 font-semibold"
                    : "text-neutral-300 hover:bg-white/5"
                }`}
              >
                {sec.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <a
                href={PERSONAL_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs font-semibold bg-white/5 rounded-lg text-neutral-200 border border-white/10"
              >
                Personal Website ↗
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content Container ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-28">

        {/* ── Section: Hero ── */}
        <section id="hero" className="scroll-reveal scroll-mt-20 pt-4 sm:pt-6">
          
          <div className="p-6 sm:p-8 rounded-3xl glass-surface border border-emerald-500/25 mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* Photo Box */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 rounded-2xl blur-md opacity-40 animate-breath"></div>
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-400/40 bg-black/60 shadow-xl">
                  <img
                    src={heroPhoto}
                    alt="Abdul Hanan"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-emerald-300 uppercase tracking-widest">
                    PK Verified
                  </span>
                </div>
              </div>

              {/* Title & Identity */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Specialized in Model RLHF, Curation & Training</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Abdul Hanan
                </h1>

                <p className="text-sm sm:text-base font-medium text-emerald-300">
                  AI Urdu Language Trainer · LLM Evaluator · CS Student & Operations
                </p>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl pt-1">
                  Empowering frontier artificial intelligence with authentic Pakistani Urdu. Transforming unrefined language datasets into nuanced, dialect-aware, and culturally safe model responses.
                </p>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-semibold"
                  >
                    <IconMail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Abdul</span>
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-semibold"
                  >
                    <IconLinkedIn className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn Profile</span>
                    <IconArrowExternal className="w-3 h-3 text-neutral-500" />
                  </a>

                  <a
                    href={PERSONAL_WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-semibold"
                  >
                    <IconGlobe className="w-3.5 h-3.5 text-teal-400" />
                    <span>Personal Website</span>
                    <IconArrowExternal className="w-3 h-3 text-neutral-500" />
                  </a>

                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-semibold"
                  >
                    <IconFileDoc className="w-3.5 h-3.5 text-amber-400" />
                    <span>CV Download</span>
                    <IconArrowExternal className="w-3 h-3 text-neutral-500" />
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Nastaliq Statement Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-white/[0.02] to-transparent border border-emerald-500/25 shadow-lg relative overflow-hidden">
            <p className="urdu text-xl sm:text-2xl text-emerald-300 font-semibold text-center sm:text-right">
              اردو زبان میں مصنوعی ذہانت (AI) کی درستی، تربیت اور لسانی ماڈلنگ — معیاری اور جدید انداز میں
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
              <span>Native C2 Urdu · Fluent Punjabi · Technical English</span>
              <span>BSc Computer Science · University of Agriculture Faisalabad</span>
            </div>
          </div>

        </section>

        {/* ── Section: AI Urdu Training ── */}
        <section id="ai-expertise" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">01 / Model Specialization</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Train Urdu Models With Me?</h2>
            </div>
            <p className="text-xs font-mono text-neutral-400">RLHF · Prompt Auditing · SFT Datasets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass-surface p-6 rounded-2xl space-y-3 border-t-2 border-t-emerald-400">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs">
                01
              </div>
              <h3 className="text-base font-bold text-white">Authentic Code-Switching</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Pakistanis communicate through dynamic code-switching between Urdu grammar and English loan words. I construct genuine bilingual pairs that avoid mechanical translation errors.
              </p>
            </div>

            <div className="glass-surface p-6 rounded-2xl space-y-3 border-t-2 border-t-teal-400">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold font-mono text-xs">
                02
              </div>
              <h3 className="text-base font-bold text-white">RLHF & Safety Red-Teaming</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Evaluating model outputs for factual accuracy, subtle hallucination detection, contextual appropriateness, cultural safety norms, and Nastaliq orthography.
              </p>
            </div>

            <div className="glass-surface p-6 rounded-2xl space-y-3 border-t-2 border-t-amber-400">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-xs">
                03
              </div>
              <h3 className="text-base font-bold text-white">CS Technical Foundation</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                As a Computer Science student, I understand tokenization constraints with Perso-Arabic scripts, JSON schema labeling, Python automation, and API pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section: Voice Data ── */}
        <section id="audio-samples" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-1">02 / Verified Audio Datasets</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Acoustic Samples for AI Speech Modeling</h2>
            </div>
            <p className="text-xs font-mono text-neutral-400">4 Master Records · Zero Latency</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {voiceSamples.map((sample) => (
              <AudioCard
                key={sample.id}
                title={sample.title}
                titleUrdu={sample.titleUrdu}
                tag={sample.tag}
                description={sample.description}
                audioSrc={sample.audioSrc}
                isPlaying={activeAudioId === sample.id}
                onTogglePlay={() => setActiveAudioId((curr) => (curr === sample.id ? null : sample.id))}
              />
            ))}
          </div>
        </section>

        {/* ── Section: Projects ── */}
        <section id="software" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 block mb-1">03 / Software Projects</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Engineering Practical Systems</h2>
            </div>
            <p className="text-xs font-mono text-neutral-400">Offline-First · Hardware APIs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="glass-surface rounded-3xl overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="h-48 bg-black/60 overflow-hidden relative border-b border-white/10">
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-all duration-300" />
                    <span className="absolute top-4 left-4 text-[10px] font-mono px-3 py-1 rounded-full bg-black/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      {p.status}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">{p.category}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{p.title}</h3>
                    <p className="text-xs font-medium text-neutral-400">{p.subtitle}</p>
                    <p className="text-xs text-neutral-300 leading-relaxed pt-2">{p.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
                  <div className="flex gap-1.5">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                  >
                    View System Specs →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Operations ── */}
        <section id="operations" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">04 / Operational History</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Operations & Problem Solving</h2>
            </div>
            <p className="text-xs font-mono text-neutral-400">2+ Years Active Operations</p>
          </div>

          <div className="glass-surface p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Aptly Pharmaceuticals · Faisalabad</span>
                <h3 className="text-xl font-bold text-white mt-0.5">Customer Support & Operations Specialist</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 self-start sm:self-auto">
                June 2024 — Present
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Managing complex client support workflows across WhatsApp, phone, and email in bilingual settings. Built customized Excel data models to preserve inventory integrity and resolve logging discrepancies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">Live Stock Tracking</span>
                <p className="text-xs text-neutral-400">Engineered multi-SKU Excel models to maintain real-time inventory counts and prevent stockouts.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold text-teal-400 block mb-1">Date Bug Remediation</span>
                <p className="text-xs text-neutral-400">Identified and fixed a silent DD/MM vs MM/DD date format corruption breaking executive monthly reports.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">Bilingual Support</span>
                <p className="text-xs text-neutral-400">Delivering communication in native Urdu, fluent Punjabi, and professional English.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">Data Validation</span>
                <p className="text-xs text-neutral-400">Enforced strict cell validation rules preventing human input errors across logistics records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Education ── */}
        <section id="education" className="scroll-reveal scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="glass-surface p-6 sm:p-8 rounded-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Academic Foundation</span>
            <h3 className="text-2xl font-bold text-white">BS Computer Science</h3>
            <p className="text-sm font-semibold text-emerald-300">University of Agriculture, Faisalabad (UAF)</p>
            <p className="text-xs font-mono text-neutral-400">Semester 5 · Expected Graduation 2028</p>
            <p className="text-xs text-neutral-300 leading-relaxed pt-2">
              Deep training in Data Structures, Object-Oriented Programming, Relational Databases, and Python algorithm design. Provides the technical literacy needed to interface directly with AI research teams.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-3">
              {["Python", "JavaScript", "HTML5/CSS3", "Data Structures", "OOP"].map((sk) => (
                <span key={sk} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/40">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl border border-white/10 h-full min-h-[260px]">
            <img src={aboutPhoto} alt="Abdul Hanan" loading="lazy" className="w-full h-full object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b09] via-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Core Philosophy</span>
              <p className="text-sm italic font-medium text-neutral-200">
                "Where linguistic nuance meets technical precision — that is where artificial intelligence becomes genuinely human."
              </p>
            </div>
          </div>
        </section>

        {/* ── Section: Contact ── */}
        <section id="contact" className="scroll-reveal scroll-mt-20 relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#0a120e] to-black border border-emerald-500/30 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start relative z-10">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">05 / Immediate Dispatch</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Let's Build Exceptional AI in Urdu.</h2>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed max-w-md font-normal">
                Available for contract evaluations, bilingual language engineering tasks, or operational roles. Connect directly across my verified platforms:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <IconMail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>Email Abdul</span>
                </a>

                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <IconLinkedIn className="w-4 h-4 text-[#0077B5]" />
                  </div>
                  <span>LinkedIn Profile ↗</span>
                </a>

                <a
                  href={PERSONAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <IconGlobe className="w-4 h-4 text-teal-400" />
                  </div>
                  <span>Personal Website ↗</span>
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <IconFileDoc className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>CV Download ↗</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-surface p-6 sm:p-8 rounded-2xl border border-white/10">
              {formSent ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto text-xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-white">Transmission Received</h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">Thank you for reaching out. I review all inquiries promptly and will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      className="w-full text-xs px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Direct Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      className="w-full text-xs px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Topic</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData((d) => ({ ...d, role: e.target.value }))}
                      className="w-full text-xs px-3.5 py-3 rounded-xl bg-[#0c1410] border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-400 cursor-pointer"
                    >
                      <option>AI Urdu Training / RLHF</option>
                      <option>Dataset Annotation & Evaluation</option>
                      <option>Software / Operations Collaboration</option>
                      <option>General Business Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Brief Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Details regarding your model or project..."
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className="w-full text-xs px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-neutral-950 font-bold text-xs hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                  >
                    {isSubmitting ? "Dispatching..." : "Transmit Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#040705] py-10 text-neutral-400 text-xs mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-sm tracking-tight">Abdul Hanan</p>
            <p className="text-neutral-400 text-[11px] mt-0.5">AI Urdu Language Specialist & Technical Operations · Faisalabad, Pakistan</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-[11px]">
            <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="hover:text-emerald-400 transition-colors">
              Email Abdul
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              LinkedIn Profile
            </a>
            <a href={PERSONAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              Personal Website
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              CV Download
            </a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
