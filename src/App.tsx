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

// ─── Crisp Vector Icons ───────────────────────────────────────────────────────
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-neutral-200 text-neutral-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full bg-neutral-900 border-b border-neutral-200 overflow-hidden">
          <img src={project.image} alt={project.title} loading="lazy" className="w-full object-contain max-h-[42vh]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-neutral-900 shadow-md font-bold transition-all active:scale-95 text-xs"
          >
            ✕
          </button>
          <span className="absolute top-4 left-4 text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            {project.status}
          </span>
        </div>
        <div className="p-6 sm:p-8 space-y-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">{project.category}</span>
            <h3 className="text-2xl font-bold text-neutral-950 mt-1">{project.title}</h3>
            <p className="text-xs font-semibold text-neutral-500 mt-0.5">{project.subtitle}</p>
          </div>
          <p className="text-sm leading-relaxed text-neutral-700 pt-2 border-t border-neutral-100">
            {project.fullDescription}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                #{t}
              </span>
            ))}
          </div>
          {project.meta && <p className="text-xs text-neutral-500 font-mono pt-2">{project.meta}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Audio Card with Lazy Loading ─────────────────────────────────────────────
function AudioCard({
  title,
  titleUrdu,
  tag,
  description,
  audioSrc,
  isPlaying,
  onTogglePlay,
  isLightMode,
}: {
  title: string;
  titleUrdu: string;
  tag: string;
  description: string;
  audioSrc: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isLightMode: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasRequestedAudio, setHasRequestedAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handlePlayToggle = () => {
    if (!hasRequestedAudio) {
      setHasRequestedAudio(true);
    }
    onTogglePlay();
  };

  useEffect(() => {
    if (!audioRef.current || !hasRequestedAudio) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, hasRequestedAudio]);

  return (
    <div
      className={`relative p-5 rounded-2xl transition-all duration-300 border ${
        isLightMode
          ? isPlaying
            ? "bg-white border-emerald-500 shadow-md ring-1 ring-emerald-400/40"
            : "bg-white hover:bg-emerald-50/40 border-neutral-200/90 shadow-sm"
          : isPlaying
          ? "bg-gradient-to-br from-emerald-950/70 to-black/90 border-emerald-400/60 shadow-lg"
          : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10"
      }`}
    >
      <audio
        ref={audioRef}
        src={hasRequestedAudio ? audioSrc : undefined}
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
            <span
              className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded ${
                isLightMode
                  ? "bg-emerald-100 text-emerald-900 font-semibold"
                  : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
              }`}
            >
              {tag}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-[3px] h-3.5 px-1.5 py-0.5 bg-emerald-500/20 rounded">
                <span className="w-1 bg-emerald-500 rounded-full animate-wave-1" />
                <span className="w-1 bg-emerald-500 rounded-full animate-wave-2" />
                <span className="w-1 bg-emerald-500 rounded-full animate-wave-3" />
              </span>
            )}
          </div>
          <h4 className={`text-sm font-bold tracking-tight ${isLightMode ? "text-neutral-900" : "text-white"}`}>
            {title}
          </h4>
          <p className={`urdu text-lg font-bold mt-0.5 ${isLightMode ? "text-emerald-800" : "text-emerald-400"}`}>
            {titleUrdu}
          </p>
        </div>

        <button
          onClick={handlePlayToggle}
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95 ${
            isPlaying
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : isLightMode
              ? "bg-neutral-100 hover:bg-emerald-600 hover:text-white text-neutral-800 border border-neutral-200"
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

      <p className={`text-xs leading-relaxed mb-4 ${isLightMode ? "text-neutral-600" : "text-neutral-400"}`}>
        {description}
      </p>

      {/* Scrub Track */}
      <div className="space-y-1.5">
        <div
          className={`relative w-full h-1.5 rounded-full cursor-pointer overflow-hidden ${
            isLightMode ? "bg-neutral-200" : "bg-white/10"
          }`}
          onClick={(e) => {
            if (!audioRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = clickPos * (audioRef.current.duration || 0);
          }}
        >
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={`flex justify-between text-[10px] font-mono ${isLightMode ? "text-neutral-500" : "text-neutral-400"}`}>
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
  const [isLightMode, setIsLightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "AI Urdu Training / RLHF", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const navSections = [
    { id: "hero", label: "Overview" },
    { id: "ai-expertise", label: "AI Urdu Training" },
    { id: "audio-samples", label: "Voice Data" },
    { id: "software", label: "Projects" },
    { id: "operations", label: "Operations" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  // Precise navigation scroll handler
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);

    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) {
        const headerHeight = 68;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });
      }
    });
  };

  // Scroll listener for Theme Shift & Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Transition to Light Mode as user scrolls past the top Hero threshold
      if (scrollY > 180) {
        setIsLightMode(true);
      } else {
        setIsLightMode(false);
      }

      // Track active section
      const scrollPos = scrollY + 120;
      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop - 75;
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

  // Smooth Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
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

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-700 ease-out overflow-x-hidden ${
        isLightMode ? "bg-[#F2F7F4] text-neutral-800" : "bg-[#060A08] text-neutral-200"
      }`}
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

        .scroll-reveal {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @keyframes wave-bounce {
          0%, 100% { height: 4px; }
          50% { height: 13px; }
        }
        .animate-wave-1 { animation: wave-bounce 0.75s ease-in-out infinite; }
        .animate-wave-2 { animation: wave-bounce 0.75s ease-in-out infinite 0.15s; }
        .animate-wave-3 { animation: wave-bounce 0.75s ease-in-out infinite 0.3s; }
      `}</style>

      {/* ── Dynamic Navbar ── */}
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
          isLightMode
            ? "bg-white/90 border-neutral-200/90 text-neutral-900 shadow-sm backdrop-blur-md"
            : "bg-[#060A08]/90 border-white/[0.08] text-white backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 text-left group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 p-0.5 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#060A08] rounded-[6px] flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                AH
              </div>
            </div>
            <div>
              <span className={`font-extrabold text-sm tracking-tight block ${isLightMode ? "text-neutral-900" : "text-white"}`}>
                Abdul Hanan
              </span>
              <span className={`text-[10px] font-mono block ${isLightMode ? "text-emerald-700 font-semibold" : "text-neutral-400"}`}>
                AI Urdu Language Trainer
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-xs">
            {navSections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors duration-150 ${
                    isActive
                      ? isLightMode
                        ? "text-emerald-900 bg-emerald-100 border border-emerald-300 font-bold"
                        : "text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 font-semibold"
                      : isLightMode
                      ? "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isLightMode
                  ? "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50 shadow-xs"
                  : "bg-white/[0.05] text-neutral-300 hover:text-white border-white/10"
              }`}
            >
              <IconGlobe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Personal Website</span>
              <IconArrowExternal className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all active:scale-95"
            >
              <IconFileDoc className="w-3.5 h-3.5" />
              <span>CV Download</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${isLightMode ? "text-neutral-800 hover:bg-neutral-100" : "text-neutral-300 hover:bg-white/10"}`}
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

        {/* ── Absolute Mobile Overlay (Never shifts page offset) ── */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden absolute top-16 left-0 right-0 z-50 border-b shadow-2xl px-4 py-3 space-y-1 ${
              isLightMode ? "bg-white/98 border-neutral-200 text-neutral-900" : "bg-[#0A120E]/98 border-white/10 text-white"
            }`}
          >
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === sec.id
                    ? "text-emerald-800 bg-emerald-100 font-bold"
                    : isLightMode
                    ? "text-neutral-700 hover:bg-neutral-100"
                    : "text-neutral-300 hover:bg-white/5"
                }`}
              >
                {sec.label}
              </button>
            ))}
            <div className="pt-2 border-t border-neutral-200/40 flex gap-2">
              <a
                href={PERSONAL_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs font-semibold bg-emerald-50 rounded-lg text-emerald-900 border border-emerald-200"
              >
                Personal Website ↗
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Container ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-24">

        {/* ── Section: Hero ── */}
        <section id="hero" className="scroll-reveal scroll-mt-20 pt-2">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1510] text-white border border-emerald-500/25 mb-6 relative overflow-hidden shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-400/40 bg-black/60 shadow-lg">
                  <img
                    src={heroPhoto}
                    alt="Abdul Hanan"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Header Details */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Specialized in Model RLHF, Curation & Training</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Abdul Hanan
                </h1>

                <p className="text-sm sm:text-base font-semibold text-emerald-300">
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/15 text-xs font-semibold transition-all"
                  >
                    <IconMail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Abdul</span>
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/15 text-xs font-semibold transition-all"
                  >
                    <IconLinkedIn className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn Profile</span>
                    <IconArrowExternal className="w-3 h-3 text-neutral-400" />
                  </a>

                  <a
                    href={PERSONAL_WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/15 text-xs font-semibold transition-all"
                  >
                    <IconGlobe className="w-3.5 h-3.5 text-teal-400" />
                    <span>Personal Website</span>
                    <IconArrowExternal className="w-3 h-3 text-neutral-400" />
                  </a>

                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/15 text-xs font-semibold transition-all"
                  >
                    <IconFileDoc className="w-3.5 h-3.5 text-amber-400" />
                    <span>CV Download</span>
                    <IconArrowExternal className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Nastaliq Statement */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-neutral-900 shadow-sm">
            <p className="urdu text-xl sm:text-2xl text-emerald-900 font-bold text-center sm:text-right">
              اردو زبان میں مصنوعی ذہانت (AI) کی درستی، تربیت اور لسانی ماڈلنگ — معیاری اور جدید انداز میں
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-neutral-100 text-xs font-mono text-neutral-500">
              <span>Native C2 Urdu · Fluent Punjabi · Technical English</span>
              <span>BSc Computer Science · University of Agriculture Faisalabad</span>
            </div>
          </div>

        </section>

        {/* ── Section: AI Urdu Training ── */}
        <section id="ai-expertise" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/80 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">01 / Model Specialization</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Why Train Urdu Models With Me?</h2>
            </div>
            <p className="text-xs font-mono text-neutral-500">RLHF · Prompt Auditing · SFT Datasets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-neutral-900">Authentic Code-Switching</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Pakistanis communicate through dynamic code-switching between Urdu grammar and English loan words. I construct genuine bilingual pairs that avoid mechanical translation errors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-xs font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-neutral-900">RLHF & Safety Red-Teaming</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Evaluating model outputs for factual accuracy, subtle hallucination detection, contextual appropriateness, cultural safety norms, and Nastaliq orthography.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-neutral-900">CS Technical Foundation</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                As a Computer Science student, I understand tokenization constraints with Perso-Arabic scripts, JSON schema labeling, Python automation, and API pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section: Voice Data (Lazy Audio) ── */}
        <section id="audio-samples" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/80 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">02 / Verified Audio Datasets</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Acoustic Samples for AI Speech Modeling</h2>
            </div>
            <p className="text-xs font-mono text-neutral-500">4 Master Records · Lazy Streaming</p>
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
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </section>

        {/* ── Section: Projects ── */}
        <section id="software" className="scroll-reveal scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/80 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">03 / Software Projects</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Engineering Practical Systems</h2>
            </div>
            <p className="text-xs font-mono text-neutral-500">Offline-First · Hardware APIs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-neutral-950 overflow-hidden relative border-b border-neutral-100">
                    <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/80 text-emerald-300 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">{p.category}</span>
                    <h3 className="text-lg font-bold text-neutral-900">{p.title}</h3>
                    <p className="text-xs text-neutral-500">{p.subtitle}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed pt-1">{p.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-neutral-100 mt-3">
                  <div className="flex gap-1.5">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 transition-colors"
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/80 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">04 / Operational History</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Operations & Problem Solving</h2>
            </div>
            <p className="text-xs font-mono text-neutral-500">2+ Years Active Operations</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest">Aptly Pharmaceuticals · Faisalabad</span>
                <h3 className="text-xl font-bold text-neutral-950 mt-0.5">Customer Support & Operations Specialist</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto font-semibold">
                June 2024 — Present
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Managing client support workflows across WhatsApp, phone, and email in bilingual settings. Built customized Excel data models to preserve inventory integrity and resolve logging discrepancies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-100">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                <span className="text-xs font-mono font-bold text-emerald-800 block mb-1">Live Stock Tracking</span>
                <p className="text-xs text-neutral-600">Engineered multi-SKU Excel models to maintain real-time inventory counts and prevent stockouts.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                <span className="text-xs font-mono font-bold text-teal-800 block mb-1">Date Bug Remediation</span>
                <p className="text-xs text-neutral-600">Identified and fixed a silent DD/MM vs MM/DD date format corruption breaking executive monthly reports.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                <span className="text-xs font-mono font-bold text-amber-800 block mb-1">Bilingual Support</span>
                <p className="text-xs text-neutral-600">Delivering communication in native Urdu, fluent Punjabi, and professional English.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                <span className="text-xs font-mono font-bold text-neutral-800 block mb-1">Data Validation</span>
                <p className="text-xs text-neutral-600">Enforced strict cell validation rules preventing human input errors across logistics records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Education ── */}
        <section id="education" className="scroll-reveal scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">Academic Foundation</span>
            <h3 className="text-2xl font-bold text-neutral-900">BS Computer Science</h3>
            <p className="text-sm font-semibold text-emerald-800">University of Agriculture, Faisalabad (UAF)</p>
            <p className="text-xs font-mono text-neutral-500">Semester 5 · Expected Graduation 2028</p>
            <p className="text-xs text-neutral-600 leading-relaxed pt-1">
              Deep training in Data Structures, Object-Oriented Programming, Relational Databases, and Python algorithm design. Provides the technical literacy needed to interface directly with AI research teams.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Python", "JavaScript", "HTML5/CSS3", "Data Structures", "OOP"].map((sk) => (
                <span key={sk} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 h-full min-h-[240px] bg-neutral-900">
            <img src={aboutPhoto} alt="Abdul Hanan" loading="lazy" decoding="async" className="w-full h-full object-cover object-top opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Core Philosophy</span>
              <p className="text-sm italic font-medium text-white">
                "Where linguistic nuance meets technical precision — that is where artificial intelligence becomes genuinely human."
              </p>
            </div>
          </div>
        </section>

        {/* ── Section: Contact ── */}
        <section id="contact" className="scroll-reveal scroll-mt-20 relative p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start relative z-10">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">05 / Direct Dispatch</span>
                <h2 className="text-3xl font-extrabold text-white">Let's Build Exceptional AI in Urdu.</h2>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed max-w-md font-normal">
                Available for contract evaluations, bilingual language engineering tasks, or operational roles. Connect directly across my verified platforms:
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <IconMail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>Email Abdul</span>
                </a>

                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <IconLinkedIn className="w-4 h-4 text-[#0077B5]" />
                  </div>
                  <span>LinkedIn Profile ↗</span>
                </a>

                <a
                  href={PERSONAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <IconGlobe className="w-4 h-4 text-teal-400" />
                  </div>
                  <span>Personal Website ↗</span>
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-emerald-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <IconFileDoc className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>CV Download ↗</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              {formSent ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto text-lg">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-white">Transmission Received</h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">Thank you for reaching out. I review all inquiries promptly and will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Direct Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Topic</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData((d) => ({ ...d, role: e.target.value }))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-400 cursor-pointer"
                    >
                      <option>AI Urdu Training / RLHF</option>
                      <option>Dataset Annotation & Evaluation</option>
                      <option>Software / Operations Collaboration</option>
                      <option>General Business Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Your project or position requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs active:scale-[0.98] transition-all disabled:opacity-50 shadow-md"
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
      <footer className="border-t border-neutral-200 bg-white py-8 text-neutral-500 text-xs mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-neutral-900 font-bold text-sm tracking-tight">Abdul Hanan</p>
            <p className="text-neutral-500 text-[11px] mt-0.5">AI Urdu Language Specialist & Technical Operations · Faisalabad, Pakistan</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px]">
            <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="hover:text-emerald-700 transition-colors">
              Email Abdul
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">
              LinkedIn Profile
            </a>
            <a href={PERSONAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">
              Personal Website
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">
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
