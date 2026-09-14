import { useState, useEffect, useRef } from "react";

// ─── External URLs & Dynamic Paths ───────────────────────────────────────────
const RESUME_URL = `${import.meta.env.BASE_URL}Resume.pdf`;
const LINKEDIN = "https://www.linkedin.com/in/abdul-hanan-abrar-8b6a9140b/";
const EMAIL = "abdulhananabrar941@gmail.com";
// Secondary site moved strictly to footer to prevent traffic bleed
const SECONDARY_SITE_URL = "https://abdul-hanan-abrar.github.io/abdulhanan/";

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

// ─── Custom Hook: Scroll Reveal Engine ────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Optional: stop observing once revealed
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── UI Helpers ──────────────────────────────────────────────────────────────
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

function BtnOutlineWhite({ children, onClick, href, target }: any) {
  const cls = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 active:scale-95 text-center backdrop-blur-sm";
  const style = { border: "2px solid rgba(255,255,255,0.6)", color: "#fff" };
  if (href) return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

// ─── Project Modal ────────────────────────────────────────────────────────────
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

// ─── Animated Audio Card with Waveform ────────────────────────────────────────
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
      
      <audio ref={audioRef} src={audioSrc} preload="metadata" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(formatTime(audioRef.current?.duration || 0))} onEnded={onTogglePlay} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{title}</h4>
          <p className="urdu text-lg sm:text-xl text-green-700">{titleUrdu}</p>
        </div>
        <button onClick={onTogglePlay} className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md text-white relative z-10" style={{ background: isPlaying ? C.darkGreen : C.green }}>
          {isPlaying ? 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="4" height="10" rx="1"/><rect x="8" y="2" width="4" height="10" rx="1"/></svg> : 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-1"><path d="M3 2L12 7L3 12V2Z"/></svg>}
        </button>
      </div>

      {/* Dynamic Waveform Visualizer */}
      <div className="h-6 flex items-end gap-1 mb-2 opacity-80">
        {[...Array(24)].map((_, i) => (
          <div key={i} className={`w-1 rounded-t-sm bg-green-500 transition-all duration-150 ${isPlaying ? 'animate-wave' : 'h-1'}`} 
               style={{ animationDelay: `${i * 0.05}s`, height: isPlaying ? '100%' : '4px' }} />
        ))}
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

  // Initialize scroll reveal
  useScrollReveal();

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
    { id: "about", label: "Approach" },
    { id: "ai-tutor", label: "AI & Data" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Engineering" },
    { id: "voice", label: "Audio" },
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
      description: "A fully self-contained, offline-first Point-of-Sale built for small retail shops handling robust database transactions strictly via local storage.",
      fullDescription: "BizLedger is a fully self-contained, offline-first Point-of-Sale and business management application built for small retail shops across Punjab. It requires no internet connection, no external server, and no monthly fees — everything runs directly in the browser using local storage. The application handles sales tracking, inventory management with low-stock alerts, expense recording, and monthly reporting. Built entirely with HTML5 and JavaScript with zero dependencies to ensure maximum uptime in low-connectivity areas.",
      tags: ["HTML5", "JavaScript", "IndexedDB", "Systems Architecture"],
      image: bizLedgerImg,
      meta: "🏬 1.3M+ target shops · 📴 Zero internet needed",
    },
    {
      title: "QR File Transfer Tool",
      subtitle: "No Internet. No Cable. Just Scan.",
      status: "Completed",
      description: "Peer-to-peer file transfer leveraging the native BarcodeDetector API. Bypasses the need for cloud uploads or USB cables entirely.",
      fullDescription: "The QR File Transfer Tool solves a genuinely recurring problem: getting files from a desktop computer to a phone without an internet connection or USB cable. The sender side encodes the file into a QR code displayed on screen. The receiver side, opened on the phone's browser, uses the BarcodeDetector API to scan the QR code via the phone's camera and decode the file. The entire system works over a local hotspot or even offline.",
      tags: ["HTML5", "Web APIs", "BarcodeDetector API", "Local Network"],
      image: qrToolImg,
    },
  ];

  const voiceSamples = [
    { id: "audio-conversational", title: "Natural Conversational Urdu", titleUrdu: "قدرتی اردو گفتگو", description: "A natural, conversational Urdu sample demonstrating authentic everyday speech.", audioSrc: `${import.meta.env.BASE_URL}Natural%20Conversational%20Urdu.m4a` },
    { id: "audio-codeswitching", title: "Natural Urdu-English Communication", titleUrdu: "اردو انگریزی — مشترکہ گفتگو", description: "Natural switching between Urdu and English — the way Pakistanis actually communicate.", audioSrc: `${import.meta.env.BASE_URL}Natural%20Urdu-English%20Communication.m4a` },
    { id: "audio-reading", title: "Clear Urdu Reading & Explanation", titleUrdu: "صاف اردو پڑھائی اور فطری وضاحت", description: "Articulate pronunciation, rhythmic delivery, and precise phonetics for language modeling.", audioSrc: `${import.meta.env.BASE_URL}Clear%20Urdu%20Reading%20&%20Natural%20Explanation.m4a` },
    { id: "audio-listening", title: "Careful Listening & Unclear Speech", titleUrdu: "محتاط سماعت اور غیر واضح گفتگو", description: "Evaluating complex acoustic cues, accents, and colloquial phrasing.", audioSrc: `${import.meta.env.BASE_URL}Careful%20Listening%20&%20Unclear%20Speech.m4a` },
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
      
      {/* ── Premium Typography, Glassmorphism & Animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        .urdu {
          font-family: 'Noto Nastaliq Urdu', serif !important;
          direction: rtl; text-align: right;
          line-height: 2.8 !important; 
          font-size: clamp(1.25rem, 3vw, 1.8rem);
          word-spacing: 0.15em;
        }
        
        .glass-nav {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        /* The Scroll Reveal Engine */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        .gradient-border-wrap {
          background: linear-gradient(135deg, ${C.green} 0%, #059669 100%);
          padding: 4px;
          border-radius: 9999px;
        }

        /* Audio Wave Animation */
        @keyframes wave {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>

      {/* ── Glassmorphic Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("home")} className="text-xl font-extrabold tracking-tighter" style={{ color: C.text }}>
            Abdul Hanan Abrar.
          </button>

          <div className="hidden lg:flex items-center gap-8 font-bold text-sm">
            {navLinks.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="transition-colors hover:text-green-700" style={{ color: activeSection === n.id ? C.green : C.muted }}>
                {n.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <BtnPrimary href={RESUME_URL} target="_blank">Download Resume</BtnPrimary>
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
              <BtnPrimary href={RESUME_URL} target="_blank">Download Resume</BtnPrimary>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section id="home" className="pt-32 pb-16 sm:pt-48 sm:pb-32 overflow-hidden relative" style={{ background: C.bg }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-green-200 rounded-full blur-3xl opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 reveal-on-scroll is-visible">
            <span className="inline-block text-xs font-extrabold px-4 py-2 rounded-full mb-6 tracking-wide shadow-sm" style={{ background: C.lightGreen, color: C.darkGreen, border: `1px solid ${C.greenBorder}` }}>
              BSc CS · Operations · AI Data Specialist
            </span>

            <div className="lg:hidden flex justify-center mb-8">
              <div className="gradient-border-wrap shadow-2xl shadow-green-600/20">
                <img src={heroPhoto} alt="Abdul Hanan" className="w-48 h-48 object-cover rounded-full border-4 border-white" />
              </div>
            </div>

            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tighter mb-4 text-gray-900">
              ABDUL HANAN<br />ABRAR
            </h1>

            <p className="text-lg sm:text-xl font-bold mb-4 text-green-700">
              Bridging Technical Engineering with AI Language Data.
            </p>

            <div className="p-5 rounded-2xl bg-white shadow-xl shadow-green-900/5 border border-green-100 mb-6 transform transition-transform hover:-translate-y-1">
              <p className="urdu text-green-800 font-bold">
                اردو زبان میں اے آئی کو سکھانا — میری خاصیت ہے
              </p>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              I specialize in constructing robust technical systems and authentic code-switching datasets. I leverage my Computer Science background and operational experience to ensure AI systems understand exactly how humans actually communicate.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <BtnPrimary onClick={() => scrollTo("ai-tutor")}>View AI & Data Projects</BtnPrimary>
              <button onClick={() => scrollTo("projects")} className="font-bold text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2 px-4">
                View Software Engineering →
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {["React & Next.js", "Python Automation", "Three.js", "Data Annotation", "Operational Architecture"].map((t) => (
                <Tag key={t} green>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 hidden lg:flex justify-end reveal-on-scroll is-visible delay-200">
            <div className="gradient-border-wrap relative shadow-2xl shadow-green-600/20 transition-transform hover:scale-105 duration-500">
              <img src={heroPhoto} alt="Abdul Hanan Abrar" className="w-[400px] h-[400px] object-cover rounded-full border-[6px] border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Operational Philosophy (Formerly About) ── */}
      <section id="about" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            <div className="reveal-on-scroll">
              <SectionLabel>My Approach</SectionLabel>
              <SectionHeading>Operational Philosophy</SectionHeading>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-on-scroll delay-100">
              {[
                { icon: "⚙️", title: "Systems Thinking", desc: "Whether building POS software or resolving customer cases, I focus on the structural root of the problem, not just the symptom." },
                { icon: "🧠", title: "Data Integrity", desc: "My pharmaceutical operations experience taught me that small errors corrupt large datasets. I build strict validation rules into everything." },
                { icon: "🗣️", title: "Human Context", desc: "AI models often sound robotic. My bilingual support background provides the intuition required to train models on authentic code-switching." },
                { icon: "💻", title: "Technical Breadth", desc: "Currently pursuing a BSc in CS, actively engineering solutions in Web APIs, Python automation, and 3D WebGL (Three.js)." },
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

      {/* ── AI Tutor (Dark Premium Section) ── */}
      <section id="ai-tutor" className="py-24 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 bg-green-500 blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal-on-scroll">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] mb-3 block text-amber-400">
                AI Dataset Specialization
              </span>
              <SectionHeading light>Training AI in Urdu —<br />The Right Way</SectionHeading>
              
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10 mb-8 inline-block">
                <p className="urdu text-green-300 font-bold m-0">
                  اردو میں اے آئی کو سکھانا — صحیح طریقے سے
                </p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Building datasets isn't just about translation—it's about capturing cultural nuance. I construct datasets that reflect how Pakistanis *actually* communicate, merging technical logic with native linguistic intuition for platforms like xAI and Alignerr.
              </p>

              <ul className="space-y-4 mb-10 text-gray-200 font-medium">
                {[
                  "Native Urdu speaker — idiomatic, regionally authentic prosody",
                  "Bilingual code-switching (Urdu-English) generation",
                  "Customer support background for generating real-world Q&A scenarios",
                  "Rigorous text annotation and AI output evaluation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    {item}
                  </li>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-on-scroll delay-200">
              {[
                { icon: "🗣️", title: "Conversation Data", desc: "Constructing natural Urdu dialogues and support scenarios." },
                { icon: "📝", title: "Annotation", desc: "Labelling and correcting AI-generated Urdu text." },
                { icon: "🔤", title: "Code-Switching", desc: "Urdu–English mixed speech mapping." },
                { icon: "✅", title: "Output Evaluation", desc: "Rating AI-generated responses for cultural accuracy." },
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

      {/* ── Experience ── */}
      <section id="experience" className="py-20 sm:py-28" style={{ background: C.altBg }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-on-scroll">
            <SectionLabel>Professional History</SectionLabel>
            <SectionHeading>Experience & Operations</SectionHeading>
          </div>

          <div className="relative pl-8 border-l-4 border-green-200 reveal-on-scroll delay-100">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {[
                  { icon: "💬", title: "Client Architecture", desc: "Handled product queries while structuring unstructured client feedback into usable operational data." },
                  { icon: "📦", title: "Inventory Logic", desc: "Maintained live Excel-based inventory tracking across complex pharmaceutical SKUs." },
                  { icon: "📊", title: "Reporting Optimization", desc: "Identified and resolved underlying date-format parsing errors silently breaking monthly reports." },
                  { icon: "⚙️", title: "Process Automation", desc: "Leveraged Python to write automation scripts, reducing repetitive operational overhead." },
                ].map((c) => (
                  <div key={c.title} className="rounded-2xl p-5 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
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

      {/* ── Selected Work / Projects ── */}
      <section id="projects" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-on-scroll">
            <SectionLabel>Engineering Portfolio</SectionLabel>
            <SectionHeading>Technical Builds</SectionHeading>
            <p className="text-lg max-w-2xl mb-12 text-gray-600">
              I build functional tools that solve real-world logistical problems, ranging from offline database architecture to peer-to-peer data transfer systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.map((p, idx) => (
              <div key={p.title} className={`group flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reveal-on-scroll delay-${idx * 100}`}>
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
                    View Systems Architecture <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voice Samples ── */}
      <section id="voice" className="py-20 sm:py-28" style={{ background: C.altBg }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-on-scroll">
            <SectionLabel>Audio & Linguistics</SectionLabel>
            <SectionHeading>Dataset Source Audio</SectionHeading>
            <p className="text-lg max-w-2xl mb-12 text-gray-600">
              High-fidelity acoustic samples showcasing conversational nuance, professional code-switching, and articulate speech modeling in authentic Urdu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {voiceSamples.map((sample, idx) => (
              <div key={sample.id} className={`reveal-on-scroll delay-${(idx % 2) * 100}`}>
                <AudioCard
                  title={sample.title}
                  titleUrdu={sample.titleUrdu}
                  description={sample.description}
                  audioSrc={sample.audioSrc}
                  isPlaying={activeAudioId === sample.id}
                  onTogglePlay={() => setActiveAudioId((current) => (current === sample.id ? null : sample.id))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form & Direct Info ── */}
      <section id="contact" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-on-scroll">
            <SectionLabel>Initiate Contact</SectionLabel>
            <SectionHeading>Let's Build Something.</SectionHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal-on-scroll delay-100">
              <p className="text-lg leading-relaxed mb-8 text-gray-600">
                Currently accepting roles in AI Dataset Annotation, Support Operations, and Front-End Engineering. Contact me directly below to request my full resume or discuss a project.
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
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden reveal-on-scroll delay-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 relative z-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">✓</div>
                  <h3 className="font-extrabold text-2xl mb-3 text-gray-900">Data Transmitted</h3>
                  <p className="text-gray-600 text-lg">Thank you. I will review your query and respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Full Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                        className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-500/10" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Email</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                        className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-500/10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Subject / Role</label>
                    <select required value={formData.topic} onChange={(e) => setFormData(d => ({ ...d, topic: e.target.value }))}
                      className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white cursor-pointer appearance-none">
                      <option value="" disabled>Select context...</option>
                      <option>AI Urdu Training / Annotation</option>
                      <option>Software Engineering</option>
                      <option>Operations & Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
                      className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white resize-none focus:shadow-lg focus:shadow-green-500/10" />
                  </div>
                  <BtnPrimary>{isSubmitting ? "Transmitting..." : "Send Secure Message"}</BtnPrimary>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer (With quiet secondary links) ── */}
      <footer className="py-12 bg-gray-950 text-gray-400 text-sm border-t-4 border-green-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Abdul Hanan Abrar.</h3>
              <p>Technical Operations · Front-End · AI Language Specialist</p>
            </div>
            <div className="flex gap-6 font-bold">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Download PDF Resume</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn Profile ↗</a>
              <a href={SECONDARY_SITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Alternative Portfolio ↗</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Abdul Hanan Abrar. All rights reserved.</p>
            <p>Faisalabad, Pakistan 🇵🇰</p>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
