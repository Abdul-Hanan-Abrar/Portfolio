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

// ─── Premium Design Tokens ────────────────────────────────────────────────────
const C = {
  bg: "#FAFAFA",
  white: "#FFFFFF",
  altBg: "#F4F4F5",
  text: "#09090B",
  body: "#3F3F46",
  muted: "#71717A",
  green: "#166534",
  darkGreen: "#14532D",
  lightGreen: "#DCFCE7",
  greenBorder: "#86EFAC",
  amber: "#D97706",
  lightAmber: "#FEF3C7",
  amberBorder: "#FDE68A",
  border: "#E4E4E7",
};

// ─── UI Helpers (Upgraded for Depth & Micro-interactions) ─────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: C.green }}>
      {children}
    </span>
  );
}

function SectionHeading({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-8" style={{ color: light ? "#fff" : C.text }}>
      {children}
    </h2>
  );
}

function Tag({ children, green = false }: { children: string; green?: boolean }) {
  return (
    <span
      className="inline-flex items-center text-[11px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full shadow-sm transition-all hover:scale-105"
      style={
        green
          ? { background: C.lightGreen, color: C.darkGreen, border: `1px solid ${C.greenBorder}` }
          : { background: C.white, color: C.text, border: `1px solid ${C.border}` }
      }
    >
      {children}
    </span>
  );
}

function BtnPrimary({ children, onClick, href, download, target }: any) {
  const cls = "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/20 active:scale-95 overflow-hidden text-center";
  const content = (
    <>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-600 to-green-800 transition-all duration-300 group-hover:scale-110"></span>
      <span className="relative">{children}</span>
    </>
  );
  if (href) return <a href={href} download={download} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls}>{content}</a>;
  return <button type="submit" onClick={onClick} className={cls}>{content}</button>;
}

function BtnOutlineAmber({ children, onClick, href, download, target }: any) {
  const cls = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 text-center bg-white";
  const style = { border: `2px solid ${C.amber}`, color: C.amber };
  if (href) return <a href={href} download={download} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

function BtnOutlineWhite({ children, onClick, href, target }: any) {
  const cls = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 active:scale-95 text-center backdrop-blur-sm";
  const style = { border: "2px solid rgba(255,255,255,0.6)", color: "#fff" };
  if (href) return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

// ─── Project Modal (Restored & Upgraded) ──────────────────────────────────────
type Project = {
  title: string; subtitle: string; status: string; description: string;
  tags: string[]; image: string; meta?: string; fullDescription: string;
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-green-950/60 transition-opacity" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-white transform transition-all scale-100 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full bg-gray-900 border-b border-gray-100">
          <img src={project.image} alt={project.title} className="w-full object-contain max-h-[45vh] opacity-95" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-900 bg-white shadow-lg font-bold text-xl transition-transform hover:scale-110 active:scale-95">×</button>
          <span className="absolute top-4 left-4 text-xs font-bold px-4 py-1.5 rounded-full shadow-md backdrop-blur-md"
            style={project.status === "Completed" ? { background: "rgba(220, 252, 231, 0.9)", color: C.darkGreen } : { background: "rgba(254, 243, 199, 0.9)", color: C.amber }}>
            {project.status}
          </span>
        </div>
        <div className="p-8 sm:p-10">
          <h3 className="text-3xl font-extrabold mb-2" style={{ color: C.text }}>{project.title}</h3>
          <p className="text-base font-semibold mb-6" style={{ color: C.green }}>{project.subtitle}</p>
          <p className="text-base leading-relaxed mb-8 text-gray-600">{project.fullDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          {project.meta && <p className="text-sm font-semibold text-gray-400">{project.meta}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Native Zero-Latency Audio Card (Modern UI) ───────────────────────────────
function AudioCard({ title, titleUrdu, description, audioSrc, isPlaying, onTogglePlay }: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const curr = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setProgress(dur > 0 ? (curr / dur) * 100 : 0);
    setCurrentTime(formatTime(curr));
  };

  return (
    <div className={`relative p-6 rounded-2xl transition-all duration-500 overflow-hidden ${isPlaying ? 'shadow-xl scale-[1.02]' : 'shadow-sm hover:shadow-md hover:-translate-y-1'}`}
         style={{ background: C.white, border: `1px solid ${isPlaying ? C.green : C.border}` }}>
      {isPlaying && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 animate-pulse" />}
      
      <audio ref={audioRef} src={audioSrc} preload="metadata" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(formatTime(audioRef.current?.duration || 0))} onEnded={onTogglePlay} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{title}</h4>
          <p className="urdu text-lg sm:text-xl text-green-700">{titleUrdu}</p>
        </div>
        <button onClick={onTogglePlay} className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md text-white" style={{ background: isPlaying ? C.darkGreen : C.green }}>
          {isPlaying ? 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="4" height="10" rx="1"/><rect x="8" y="2" width="4" height="10" rx="1"/></svg> : 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-1"><path d="M3 2L12 7L3 12V2Z"/></svg>}
        </button>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 mb-5 h-10">{description}</p>

      <div className="group relative w-full h-2 bg-gray-100 rounded-full cursor-pointer">
        <input type="range" min="0" max="100" step="0.1" value={progress}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            audioRef.current!.currentTime = (val / 100) * (audioRef.current!.duration || 0);
            setProgress(val);
          }}
          className="absolute z-10 w-full h-full opacity-0 cursor-pointer" />
        <div className="absolute top-0 left-0 h-full bg-green-600 rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 tracking-wider font-mono">
        <span>{currentTime}</span><span>{duration}</span>
      </div>
    </div>
  );
}

// ─── Main Application ─────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", topic: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    let meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "color-scheme";
      document.head.appendChild(meta);
    }
    meta.content = "light";
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "ai-tutor", label: "AI Tutor" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "voice", label: "Voice" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handler = () => {
      const sections = navLinks.map((n) => n.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const projects: Project[] = [
    {
      title: "BizLedger",
      subtitle: "Offline POS & Business Management App for Punjab Retail",
      status: "In Development",
      description: "A fully self-contained, offline-first Point-of-Sale and business management application built for small retail shops across Punjab.",
      fullDescription: "BizLedger is a fully self-contained, offline-first Point-of-Sale and business management application built for small retail shops across Punjab. It requires no internet connection, no external server, and no monthly fees — everything runs directly in the browser using local storage. The application handles sales tracking, inventory management with low-stock alerts, expense recording, and monthly reporting. It targets over 1.3 million shops in Punjab that currently operate without any digital POS software. Built entirely with HTML5 and JavaScript with zero dependencies.",
      tags: ["HTML5", "JavaScript", "Offline-First", "POS System", "Punjab Retail"],
      image: bizLedgerImg,
      meta: "🏬 1.3M+ target shops · 📴 Zero internet needed",
    },
    {
      title: "QR File Transfer Tool",
      subtitle: "No Internet. No Cable. Just Scan.",
      status: "Completed",
      description: "Transfer files from desktop to phone using QR codes — no internet connection and no USB cable required.",
      fullDescription: "The QR File Transfer Tool solves a genuinely recurring problem: getting files from a desktop computer to a phone without an internet connection or USB cable. The sender side encodes the file into a QR code displayed on screen. The receiver side, opened on the phone's browser, uses the BarcodeDetector API to scan the QR code via the phone's camera and decode the file. The entire system works over a local hotspot or even offline. Built entirely with vanilla HTML5 and JavaScript, with no server, no upload, and no cloud dependency.",
      tags: ["HTML5", "JavaScript", "BarcodeDetector API", "QR Code", "File Transfer"],
      image: qrToolImg,
    },
  ];

  // Restored: All 4 original Voice Samples
  const voiceSamples = [
    {
      id: "audio-conversational",
      title: "Natural Conversational Urdu",
      titleUrdu: "قدرتی اردو گفتگو",
      description: "A natural, conversational Urdu sample demonstrating authentic everyday speech.",
      audioSrc: `${import.meta.env.BASE_URL}Natural%20Conversational%20Urdu.m4a`,
    },
    {
      id: "audio-codeswitching",
      title: "Natural Urdu-English Communication",
      titleUrdu: "اردو انگریزی — مشترکہ گفتگو",
      description: "Natural switching between Urdu and English — the way Pakistanis actually communicate.",
      audioSrc: `${import.meta.env.BASE_URL}Natural%20Urdu-English%20Communication.m4a`,
    },
    {
      id: "audio-reading",
      title: "Clear Urdu Reading & Explanation",
      titleUrdu: "صاف اردو پڑھائی اور فطری وضاحت",
      description: "Articulate pronunciation, rhythmic delivery, and precise phonetics for language modeling.",
      audioSrc: `${import.meta.env.BASE_URL}Clear%20Urdu%20Reading%20&%20Natural%20Explanation.m4a`,
    },
    {
      id: "audio-listening",
      title: "Careful Listening & Unclear Speech",
      titleUrdu: "محتاط سماعت اور غیر واضح گفتگو",
      description: "Evaluating complex acoustic cues, accents, and colloquial phrasing.",
      audioSrc: `${import.meta.env.BASE_URL}Careful%20Listening%20&%20Unclear%20Speech.m4a`,
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/4e10f0fcb6df30d7f3c7ddc9e146742d", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: formData.name, Email: formData.email, Topic: formData.topic, Message: formData.message,
          _subject: `[Portfolio] New message from ${formData.name}: ${formData.topic}`,
        }),
      });
      if (response.ok) setFormSent(true);
      else alert("Failed to send message. Please contact directly via email.");
    } catch {
      alert("Network error. Please reach out directly to abdulhananabrar941@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 selection:bg-green-200">
      
      {/* ── Premium Typography & Glassmorphism Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        .urdu {
          font-family: 'Noto Nastaliq Urdu', serif !important;
          direction: rtl; text-align: right;
          line-height: 2.8 !important; /* Critical for Nastaliq baseline */
          font-size: clamp(1.25rem, 3vw, 1.8rem);
          word-spacing: 0.15em;
        }
        
        .glass-nav {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .fade-up {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; transform: translateY(30px);
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .gradient-border-wrap {
          background: linear-gradient(135deg, ${C.green} 0%, #059669 100%);
          padding: 4px;
          border-radius: 9999px;
        }
      `}</style>

      {/* ── Glassmorphic Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("home")} className="text-xl font-extrabold tracking-tighter" style={{ color: C.text }}>
            Abdul Hanan.
          </button>

          <div className="hidden lg:flex items-center gap-8 font-bold text-sm">
            {navLinks.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="transition-colors hover:text-green-700" style={{ color: activeSection === n.id ? C.green : C.muted }}>
                {n.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <BtnOutlineAmber href={PERSONAL_WEBSITE_URL} target="_blank">Personal Site ↗</BtnOutlineAmber>
            <BtnPrimary href={RESUME_URL} target="_blank">Resume</BtnPrimary>
          </div>

          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden px-4 pb-6 pt-2 flex flex-col gap-2 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl absolute w-full">
            {navLinks.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-sm font-bold py-3 px-4 rounded-xl transition-colors"
                style={{ color: activeSection === n.id ? C.green : C.body, background: activeSection === n.id ? C.lightGreen : "transparent" }}>
                {n.label}
              </button>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
              <BtnOutlineAmber href={PERSONAL_WEBSITE_URL} target="_blank">Open Personal Site ↗</BtnOutlineAmber>
              <BtnPrimary href={RESUME_URL} target="_blank">Download Resume</BtnPrimary>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section (Premium Layout) ── */}
      <section id="home" className="pt-32 pb-16 sm:pt-48 sm:pb-32 overflow-hidden relative" style={{ background: C.bg }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-green-200 rounded-full blur-3xl opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 fade-up">
            <span className="inline-block text-xs font-extrabold px-4 py-2 rounded-full mb-6 tracking-wide shadow-sm" style={{ background: C.lightGreen, color: C.darkGreen, border: `1px solid ${C.greenBorder}` }}>
              Faisalabad, Pakistan · BSc CS · 2+ Years Exp
            </span>

            <div className="lg:hidden flex justify-center mb-8">
              <div className="gradient-border-wrap shadow-2xl shadow-green-600/20">
                <img src={heroPhoto} alt="Abdul Hanan" className="w-48 h-48 object-cover rounded-full border-4 border-white" />
              </div>
            </div>

            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tighter mb-4 text-gray-900">
              ABDUL<br />HANAN
            </h1>

            <p className="text-lg sm:text-xl font-bold mb-4 text-green-700">
              AI Urdu Language Tutor · Ops Specialist · CS Student
            </p>

            <div className="p-5 rounded-2xl bg-white shadow-xl shadow-green-900/5 border border-green-100 mb-6 transform transition-transform hover:-translate-y-1">
              <p className="urdu text-green-800 font-bold">
                اردو زبان میں اے آئی کو سکھانا — میری خاصیت ہے
              </p>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Native Urdu speaker with professional bilingual experience. I help AI companies build systems that truly understand how Urdu is spoken, written, and mixed with English in real-life contexts.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <BtnPrimary onClick={() => scrollTo("ai-tutor")}>Explore AI Tutor Work</BtnPrimary>
              <BtnOutlineAmber href={PERSONAL_WEBSITE_URL} target="_blank">My Personal Site ↗</BtnOutlineAmber>
            </div>

            <button onClick={() => scrollTo("voice")} className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2 mb-6">
              ↓ Listen to 4 Urdu Voice Samples
            </button>

            <div className="flex flex-wrap gap-2">
              {["Urdu — C2", "Punjabi — Fluent", "English — Professional", "Operations"].map((t) => (
                <Tag key={t} green>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 hidden lg:flex justify-end fade-up delay-200">
            <div className="gradient-border-wrap relative shadow-2xl shadow-green-600/20 transition-transform hover:scale-105 duration-500">
              <img src={heroPhoto} alt="Abdul Hanan" className="w-[400px] h-[400px] object-cover rounded-full border-[6px] border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Strengths (Restored) ── */}
      <section id="strengths" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            <div className="fade-up">
              <SectionLabel>Core Strengths</SectionLabel>
              <SectionHeading>What I Bring</SectionHeading>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 fade-up delay-100">
              {[
                { icon: "🧠", title: "AI Urdu Tutor", desc: "Native Urdu speaker able to train, annotate and evaluate AI language models in authentic Urdu." },
                { icon: "💬", title: "Customer Support", desc: "Clear, respectful bilingual communication with clients via phone, email and WhatsApp." },
                { icon: "⚙️", title: "Operations", desc: "Inventory tracking, record management and operational problem solving — day to day." },
                { icon: "💻", title: "Technology", desc: "BSc CS education with practical skills in Excel, Python and JavaScript." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-50 border border-gray-100">
                  <span className="text-3xl mb-4 block">{c.icon}</span>
                  <h3 className="font-extrabold text-base mb-2" style={{ color: C.text }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.body }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About Me (Restored) ── */}
      <section id="about" className="py-20 sm:py-28" style={{ background: C.altBg }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <SectionLabel>About Me</SectionLabel>
                  <SectionHeading>A Little About Me</SectionHeading>
                </div>
                <div className="lg:hidden gradient-border-wrap w-24 h-24 flex-shrink-0">
                  <img src={aboutPhoto} alt="Abdul Hanan" className="w-full h-full object-cover rounded-full border-2 border-white" />
                </div>
              </div>
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-gray-600 mb-8">
                <p>I'm Abdul Hanan, a BSc Computer Science student based in Faisalabad, Pakistan, with professional experience in customer support and operations at Aptly Pharmaceuticals.</p>
                <p>My experience has taught me that good support is not only about answering questions — it's about understanding the real problem, communicating clearly, keeping accurate records and working with teams to reach a practical solution.</p>
                <p>Beyond my day job, I build software independently — BizLedger, an offline POS system for small Punjab retailers; a QR file-transfer tool; and Python automation scripts that save real time at work.</p>
              </div>
              <blockquote className="my-8 p-6 text-lg italic font-bold rounded-2xl border-l-4 shadow-sm" style={{ borderLeftColor: C.amber, background: C.lightAmber, color: C.amber }}>
                "I'm most comfortable where communication meets problem solving."
              </blockquote>
              <div className="flex gap-4">
                <BtnPrimary href={RESUME_URL} target="_blank">Download Full Resume</BtnPrimary>
              </div>
            </div>
            <div className="hidden lg:flex justify-center fade-up delay-100">
              <div className="gradient-border-wrap relative shadow-2xl">
                <img src={aboutPhoto} alt="Abdul Hanan" className="w-[320px] h-[320px] object-cover rounded-full border-[6px] border-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Tutor (Dark Premium Section) ── */}
      <section id="ai-tutor" className="py-24 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 bg-green-500 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 bg-emerald-500 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="fade-up">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] mb-3 block text-amber-400">
                Open to AI & Language Opportunities
              </span>
              <SectionHeading light>Training AI in Urdu —<br />The Right Way</SectionHeading>
              
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10 mb-8 inline-block">
                <p className="urdu text-green-300 font-bold m-0">
                  اردو میں اے آئی کو سکھانا — صحیح طریقے سے
                </p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Most AI systems still struggle with authentic, natural Urdu — the kind spoken in homes, offices, and on the street in Pakistan. As a native Urdu speaker with professional bilingual experience, I want to help AI companies build systems that truly understand how Urdu is spoken, written, and mixed with English.
              </p>

              <ul className="space-y-4 mb-10 text-gray-200 font-medium">
                {[
                  "Native Urdu speaker — natural, idiomatic, regionally authentic",
                  "Professional English fluency for bilingual code-switching training data",
                  "Customer support background — real conversational scenarios",
                  "Computer Science education — understands AI/ML workflow",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <BtnPrimary onClick={() => scrollTo("contact")}>Discuss an Opportunity</BtnPrimary>
                <BtnOutlineWhite onClick={() => scrollTo("voice")}>▶ Hear Voice Samples</BtnOutlineWhite>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-up delay-200">
              {[
                { icon: "🗣️", title: "Conversation Data", desc: "Natural Urdu dialogues, Q&A pairs and support scenarios." },
                { icon: "📝", title: "Text Annotation", desc: "Labelling, correcting and evaluating AI-generated Urdu text." },
                { icon: "🔤", title: "Code-Switching", desc: "Urdu–English mixed speech — the way Pakistanis communicate daily." },
                { icon: "🎙️", title: "Voice Samples", desc: "Recorded Urdu speech in natural, professional and instructional tones." },
                { icon: "✅", title: "AI Response Eval", desc: "Reviewing and rating AI-generated Urdu responses for accuracy." },
                { icon: "📚", title: "Tutoring Scenarios", desc: "Structured Urdu explanations ideal for AI tutor products." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <span className="text-3xl mb-3 block">{c.icon}</span>
                  <h4 className="font-extrabold text-base text-white mb-2">{c.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience (Restored) ── */}
      <section id="experience" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Professional History</SectionLabel>
          <SectionHeading>Professional Experience</SectionHeading>

          <div className="relative pl-8 border-l-4 border-green-200 fade-up">
            <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-green-600 shadow-md" />
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <h3 className="text-2xl font-extrabold" style={{ color: C.text }}>Aptly Pharmaceuticals</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-800 shadow-sm">
                  Currently Here
                </span>
              </div>
              <p className="font-extrabold text-lg text-green-700 mb-2">Customer Support & Operations Specialist</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-gray-500 mb-4">
                <span>Faisalabad, Pakistan</span><span>·</span><span>June 2024 – Present</span>
              </div>
              <p className="text-base leading-relaxed max-w-3xl mb-8 text-gray-600">
                Working across customer support and operational tasks — helping clients with product-related questions, coordinating with internal teams and maintaining accurate operational information.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { icon: "💬", title: "Customer Support", desc: "Answered product questions and coordinated with teams." },
                  { icon: "📂", title: "Client Records", desc: "Maintained organized written records of customer cases." },
                  { icon: "📦", title: "Inventory Tracking", desc: "Maintained live Excel-based inventory tracking across SKUs." },
                  { icon: "✅", title: "Data Validation", desc: "Added rules to reduce discrepancies and improve accuracy." },
                  { icon: "📊", title: "Reporting Fix", desc: "Fixed date-format issues silently breaking monthly reports." },
                  { icon: "⚙️", title: "Process Improvement", desc: "Built tools that reduced manual work in reporting." },
                ].map((c) => (
                  <div key={c.title} className="rounded-2xl p-5 bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow">
                    <span className="text-2xl mb-3 block">{c.icon}</span>
                    <h4 className="font-extrabold text-sm mb-2">{c.title}</h4>
                    <p className="text-sm text-gray-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education & Skills (Restored & Merged cleanly) ── */}
      <section id="education" className="py-20 sm:py-28" style={{ background: C.altBg }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="fade-up">
              <SectionLabel>Academic Background</SectionLabel>
              <SectionHeading>Education</SectionHeading>
              
              <div className="rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-green-600 to-amber-500" />
                <div className="p-8">
                  <h3 className="text-2xl font-extrabold mb-2">Bachelor of Science in Computer Science</h3>
                  <p className="font-bold text-lg text-green-700 mb-2">University of Agriculture, Faisalabad (UAF)</p>
                  <p className="text-sm font-semibold text-gray-500 mb-6">Currently Pursuing · Semester 5 · Expected 2028</p>
                  <p className="text-base leading-relaxed text-gray-600 mb-6">
                    Studying Computer Science while building practical professional experience in customer support, operations, technology and digital tools.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["HTML5", "JavaScript", "Python", "Data Structures", "OOP", "Databases"].map((t) => (
                      <Tag key={t} green>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div id="skills" className="fade-up delay-100">
              <SectionLabel>Capabilities</SectionLabel>
              <SectionHeading>Skills Overview</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Communication", items: ["Urdu (Native)", "Punjabi (Fluent)", "English (Pro)", "AI Language Training"] },
                  { title: "Customer Support", items: ["Query Handling", "Issue Resolution", "Case Documentation", "WhatsApp/Email/Phone"] },
                  { title: "Operations", items: ["Inventory Tracking", "Record Management", "Process Improvement", "Reporting"] },
                  { title: "Technical", items: ["Microsoft Excel", "Python", "HTML5", "JavaScript", "Problem Solving"] },
                ].map((col) => (
                  <div key={col.title}>
                    <h3 className="font-extrabold text-lg mb-4 text-gray-900 border-b-2 border-green-200 pb-2 inline-block">{col.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {col.items.map((item) => <Tag key={item}>{item}</Tag>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected Work / Projects (Restored Completely) ── */}
      <section id="projects" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Built by Me</SectionLabel>
          <SectionHeading>Selected Work</SectionHeading>
          <p className="text-lg max-w-2xl mb-12 text-gray-600 fade-up">
            Practical problems I've worked on and solutions I've built — from offline retail software to AI-ready tools and operational Excel systems.
          </p>

          <h3 className="font-extrabold text-xl mb-6 text-gray-900 fade-up">Software Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 fade-up">
            {projects.map((p) => (
              <div key={p.title} className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-full h-56 overflow-hidden relative bg-gray-900">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md"
                    style={p.status === "Completed" ? { background: "rgba(220, 252, 231, 0.9)", color: C.darkGreen } : { background: "rgba(254, 243, 199, 0.9)", color: C.amber }}>
                    {p.status}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-extrabold mb-1 text-gray-900">{p.title}</h3>
                  <p className="text-sm font-bold text-green-700 mb-4">{p.subtitle}</p>
                  <p className="text-base text-gray-600 mb-6 flex-1 line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.slice(0,3).map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <button onClick={() => setSelectedProject(p)} className="text-sm font-extrabold text-green-700 hover:text-green-500 transition-colors self-start flex items-center gap-2">
                    View Full Details <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-extrabold text-xl mb-6 text-gray-900 fade-up delay-100">Operations & Excel Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up delay-100">
            {[
              { status: "Active Use", title: "Inventory Tracking System", desc: "Excel workflow maintaining up-to-date pharmaceutical stock across multiple SKUs and reducing discrepancies." },
              { status: "Completed", title: "Reporting Workflow", desc: "Spreadsheet workflow reducing repetitive monthly reporting work and improving team efficiency." },
              { status: "Completed", title: "Data Validation System", desc: "Validation rules across spreadsheets reducing operational data errors and improving consistency." },
              { status: "Completed", title: "Date Format Error Fix", desc: "Found and fixed a DD/MM vs MM/DD date issue that was silently corrupting monthly reporting data." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl p-6 bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block shadow-sm"
                  style={c.status === "Active Use" ? { background: C.lightGreen, color: C.darkGreen } : { background: C.white, color: C.text, border: `1px solid ${C.border}` }}>
                  {c.status}
                </span>
                <h4 className="font-extrabold text-base mb-3 text-gray-900">{c.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voice Samples (All 4 Restored) ── */}
      <section id="voice" className="py-20 sm:py-28" style={{ background: C.altBg }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Audio Portfolio</SectionLabel>
          <SectionHeading>Hear How I Communicate</SectionHeading>
          <p className="text-lg max-w-2xl mb-12 text-gray-600 fade-up">
            Four comprehensive samples showcasing conversational nuance, code-switching, articulate reading, and speech perception in authentic Urdu.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-up delay-100">
            {voiceSamples.map((sample) => (
              <AudioCard
                key={sample.id}
                title={sample.title}
                titleUrdu={sample.titleUrdu}
                description={sample.description}
                audioSrc={sample.audioSrc}
                isPlaying={activeAudioId === sample.id}
                onTogglePlay={() => setActiveAudioId((current) => (current === sample.id ? null : sample.id))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form & Direct Info (Restored & Upgraded) ── */}
      <section id="contact" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Get in Touch</SectionLabel>
          <SectionHeading>Let's Connect</SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 fade-up">
            <div>
              <p className="text-lg leading-relaxed mb-8 text-gray-600">
                Whether you're interested in AI Urdu training, customer support work, or discussing any opportunity — feel free to reach out via the form or directly below.
              </p>
              
              <div className="space-y-6 mb-10 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="flex items-center gap-4 text-lg font-bold hover:text-green-600 transition-colors text-gray-900 group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">✉️</div> 
                  {EMAIL}
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-bold hover:text-green-600 transition-colors text-gray-900 group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">🔗</div> 
                  LinkedIn Profile ↗
                </a>
                <p className="flex items-center gap-4 text-lg font-bold text-gray-900">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">📍</div> 
                  Faisalabad, Pakistan 🇵🇰
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["AI Urdu Training", "Language Annotation", "Remote Work", "Customer Support", "Software Collab"].map((t) => (
                  <Tag key={t} green>{t}</Tag>
                ))}
              </div>
            </div>

            {/* Restored Form */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 relative z-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">✓</div>
                  <h3 className="font-extrabold text-2xl mb-3 text-gray-900">Message Sent!</h3>
                  <p className="text-gray-600 text-lg">Thank you for reaching out. I'll review and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Full Name</label>
                      <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                        className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-500/10" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Email</label>
                      <input type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                        className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-500/10" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Topic</label>
                    <select required value={formData.topic} onChange={(e) => setFormData(d => ({ ...d, topic: e.target.value }))}
                      className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white cursor-pointer appearance-none">
                      <option value="" disabled>Select a topic...</option>
                      <option>AI Urdu Training / Annotation</option>
                      <option>Customer Support Role</option>
                      <option>Software Collaboration</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Message</label>
                    <textarea required rows={4} placeholder="How can we work together?" value={formData.message} onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
                      className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white resize-none focus:shadow-lg focus:shadow-green-500/10" />
                  </div>

                  <BtnPrimary>{isSubmitting ? "Sending..." : "Send Message"}</BtnPrimary>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── High-Converting Dedicated CTA Section ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: C.darkGreen }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Explore the Complete Profile.</h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Ready to dive deeper? Download my formal resume or visit my primary personal website for more background details.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={PERSONAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" 
               className="bg-white text-green-900 font-extrabold px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center">
              Visit Personal Website ↗
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" 
               className="text-white border-2 border-green-500 font-extrabold px-8 py-4 rounded-xl text-lg hover:bg-green-800 transition-all w-full sm:w-auto justify-center flex items-center">
              Download PDF Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 bg-gray-950 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Abdul Hanan.</h3>
              <p>AI Urdu Tutor · Ops Specialist · CS Student</p>
            </div>
            <div className="flex gap-6 font-bold">
              <a href={PERSONAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Personal Website ↗</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Resume PDF</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Abdul Hanan Abrar. All rights reserved.</p>
            <p>Based in Faisalabad, Pakistan 🇵🇰</p>
          </div>
        </div>
      </footer>

      {/* ── Restored Project Modal Rendering ── */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
