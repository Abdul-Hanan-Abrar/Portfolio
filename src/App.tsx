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
  bg: "#FAFAFA", white: "#FFFFFF", altBg: "#F4F4F5", text: "#09090B",
  body: "#3F3F46", muted: "#71717A", green: "#166534", darkGreen: "#14532D",
  lightGreen: "#DCFCE7", greenBorder: "#86EFAC", amber: "#D97706",
  lightAmber: "#FEF3C7", amberBorder: "#FDE68A", border: "#E4E4E7",
};

// ─── UI Helpers ──────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: C.green }}>{children}</span>;
}

function SectionHeading({ children, light = false }: { children: string; light?: boolean }) {
  return <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-8" style={{ color: light ? "#fff" : C.text }}>{children}</h2>;
}

function Tag({ children, green = false, amber = false }: { children: string; green?: boolean; amber?: boolean }) {
  let style = { background: C.white, color: C.text, border: `1px solid ${C.border}` };
  if (green) style = { background: C.lightGreen, color: C.darkGreen, border: `1px solid ${C.greenBorder}` };
  if (amber) style = { background: C.lightAmber, color: C.amber, border: `1px solid ${C.amberBorder}` };
  
  return (
    <span className="inline-flex items-center text-[11px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full shadow-sm transition-all hover:scale-105" style={style}>
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

function BtnOutlineAmber({ children, onClick, href, target }: any) {
  const cls = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 text-center bg-white";
  const style = { border: `2px solid ${C.amber}`, color: C.amber };
  if (href) return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

// ─── Project Modal ────────────────────────────────────────────────────────────
type Project = { title: string; subtitle: string; status: string; description: string; tags: string[]; image: string; meta?: string; fullDescription: string; };

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-green-950/60 transition-opacity" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-white transform transition-all scale-100 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full bg-gray-900 border-b border-gray-100">
          <img src={project.image} alt={project.title} className="w-full object-contain max-h-[45vh] opacity-95" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-900 bg-white shadow-lg font-bold text-xl transition-transform hover:scale-110 active:scale-95">×</button>
        </div>
        <div className="p-8 sm:p-10">
          <h3 className="text-3xl font-extrabold mb-2" style={{ color: C.text }}>{project.title}</h3>
          <p className="text-base font-semibold mb-6" style={{ color: C.green }}>{project.subtitle}</p>
          <p className="text-base leading-relaxed mb-8 text-gray-600">{project.fullDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">{project.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Native Zero-Latency Audio Card ───────────────────────────────────────────
function AudioCard({ title, titleUrdu, description, audioSrc, isPlaying, onTogglePlay }: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const m = Math.floor(secs / 60); const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const curr = audioRef.current.currentTime; const dur = audioRef.current.duration || 0;
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
          {isPlaying ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="4" height="10" rx="1"/><rect x="8" y="2" width="4" height="10" rx="1"/></svg> : <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-1"><path d="M3 2L12 7L3 12V2Z"/></svg>}
        </button>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-5 h-10">{description}</p>
      <div className="group relative w-full h-2 bg-gray-100 rounded-full cursor-pointer">
        <input type="range" min="0" max="100" step="0.1" value={progress}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            audioRef.current!.currentTime = (val / 100) * (audioRef.current!.duration || 0);
            setProgress(val);
          }} className="absolute z-10 w-full h-full opacity-0 cursor-pointer" />
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

  // Scroll Reveal Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "ai-tutor", label: "AI Expertise" },
    { id: "voice", label: "Voice Data" },
    { id: "projects", label: "Tech & Ops" },
    { id: "about", label: "Background" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const projects: Project[] = [
    {
      title: "BizLedger", subtitle: "Offline POS & Business Management App", status: "In Development",
      description: "A fully self-contained, offline-first Point-of-Sale application built for small retail shops across Punjab.",
      fullDescription: "BizLedger is a fully self-contained, offline-first Point-of-Sale and business management application built for small retail shops across Punjab. It requires no internet connection, no external server, and no monthly fees — everything runs directly in the browser using local storage. The application handles sales tracking, inventory management with low-stock alerts, and monthly reporting. Built entirely with HTML5 and JavaScript with zero dependencies.",
      tags: ["HTML5", "JavaScript", "Offline-First", "POS System"], image: bizLedgerImg,
    },
    {
      title: "QR File Transfer Tool", subtitle: "No Internet. No Cable. Just Scan.", status: "Completed",
      description: "Transfer files from desktop to phone using QR codes — no internet connection and no USB cable required.",
      fullDescription: "The QR File Transfer Tool solves a genuinely recurring problem: getting files from a desktop computer to a phone without an internet connection or USB cable. The sender side encodes the file into a QR code displayed on screen. The receiver side uses the native BarcodeDetector API to scan the QR code via the phone's camera and decode the file. The entire system works over a local hotspot or offline.",
      tags: ["HTML5", "JavaScript", "BarcodeDetector API", "Network-Free"], image: qrToolImg,
    },
  ];

  const voiceSamples = [
    { id: "1", title: "Conversational Urdu", titleUrdu: "قدرتی اردو گفتگو", description: "Demonstrating authentic everyday speech patterns.", audioSrc: `${import.meta.env.BASE_URL}Natural%20Conversational%20Urdu.m4a` },
    { id: "2", title: "Urdu-English Code-Switching", titleUrdu: "اردو انگریزی — مشترکہ گفتگو", description: "Natural switching—how Pakistanis actually communicate.", audioSrc: `${import.meta.env.BASE_URL}Natural%20Urdu-English%20Communication.m4a` },
    { id: "3", title: "Articulate Explanation", titleUrdu: "صاف اردو پڑھائی اور فطری وضاحت", description: "Precise phonetics ideal for text-to-speech modeling.", audioSrc: `${import.meta.env.BASE_URL}Clear%20Urdu%20Reading%20&%20Natural%20Explanation.m4a` },
    { id: "4", title: "Speech Perception Testing", titleUrdu: "محتاط سماعت اور غیر واضح گفتگو", description: "Evaluating complex acoustic cues and accents.", audioSrc: `${import.meta.env.BASE_URL}Careful%20Listening%20&%20Unclear%20Speech.m4a` },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/4e10f0fcb6df30d7f3c7ddc9e146742d", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ Name: formData.name, Email: formData.email, Topic: formData.topic, Message: formData.message, _subject: `[Portfolio] New message from ${formData.name}` }),
      });
      if (response.ok) setFormSent(true); else alert("Failed to send. Please email directly.");
    } catch { alert("Network error. Please email directly."); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 selection:bg-green-200 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        .urdu {
          font-family: 'Noto Nastaliq Urdu', serif !important;
          direction: rtl; text-align: right; line-height: 2.8 !important;
          font-size: clamp(1.25rem, 3vw, 1.8rem); word-spacing: 0.15em;
        }
        
        .glass-nav {
          background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        /* Modern Scroll Reveal Animations */
        .reveal {
          opacity: 0; transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }

        /* Floating Animation for Hero Image */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        .gradient-border-wrap {
          background: linear-gradient(135deg, ${C.green} 0%, #059669 100%);
          padding: 4px; border-radius: 9999px;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("home")} className="text-xl font-extrabold tracking-tighter" style={{ color: C.text }}>
            Abdul Hanan.
          </button>
          <div className="hidden lg:flex items-center gap-8 font-bold text-sm">
            {navLinks.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="transition-colors hover:text-green-700" style={{ color: C.muted }}>
                {n.label}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <BtnOutlineAmber href={PERSONAL_WEBSITE_URL} target="_blank">Personal Site ↗</BtnOutlineAmber>
            <BtnPrimary href={RESUME_URL} target="_blank">Resume PDF</BtnPrimary>
          </div>
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Hero Section (AI Consultant Focused) ── */}
      <section id="home" className="pt-32 pb-16 sm:pt-48 sm:pb-32 overflow-hidden relative" style={{ background: C.bg }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-green-200 rounded-full blur-3xl opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 reveal">
            <Tag amber>Open to Remote Opportunities</Tag>
            
            <div className="lg:hidden flex justify-center my-8">
              <div className="gradient-border-wrap shadow-2xl animate-float">
                <img src={heroPhoto} alt="Abdul Hanan" className="w-56 h-56 object-cover rounded-full border-4 border-white" />
              </div>
            </div>

            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.05] tracking-tighter mt-4 mb-4 text-gray-900">
              Training AI to Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Authentic Urdu.</span>
            </h1>

            <p className="text-lg sm:text-xl font-bold mb-4 text-gray-600">
              AI Language Evaluator · CS Background · Operations Specialist
            </p>

            <div className="p-5 rounded-2xl bg-white shadow-xl border border-green-100 mb-6 transform transition-transform hover:-translate-y-1">
              <p className="urdu text-green-800 font-bold m-0">
                اردو زبان میں اے آئی کو سکھانا — میری خاصیت ہے
              </p>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              I construct high-quality RLHF datasets and evaluate LLM responses to reflect how Pakistanis *actually* communicate—merging technical CS knowledge with native linguistic intuition.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <BtnPrimary onClick={() => scrollTo("ai-tutor")}>View AI Expertise</BtnPrimary>
              <BtnOutlineAmber href={PERSONAL_WEBSITE_URL} target="_blank">Full Portfolio Website ↗</BtnOutlineAmber>
            </div>
          </div>

          <div className="order-1 lg:order-2 hidden lg:flex justify-end reveal delay-200">
            <div className="gradient-border-wrap relative shadow-2xl animate-float">
              <img src={heroPhoto} alt="Abdul Hanan" className="w-[420px] h-[420px] object-cover rounded-full border-[6px] border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Tutor (The Core Value Proposition) ── */}
      <section id="ai-tutor" className="py-24 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 bg-green-500 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] mb-3 block text-amber-400">
                Specialized Domain Knowledge
              </span>
              <SectionHeading light>Bridging the gap between code and culture.</SectionHeading>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                General AI models fail at regional dialects and code-switching (Urdu/English blending). My background in Computer Science allows me to understand the technical requirements of data annotation and RLHF pipelines, while my native fluency ensures the data fed into these models is culturally and linguistically flawless.
              </p>

              <ul className="space-y-4 mb-10 text-gray-200 font-medium">
                {[
                  "RLHF & Prompt Evaluation: Rating AI fluency and factual accuracy.",
                  "Code-Switching Datasets: Providing authentic Urdu-English mixed dialogues.",
                  "Acoustic Assessment: Evaluating text-to-speech and regional prosody.",
                  "Technical Literacy: Seamlessly adapting to modern annotation platforms.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <BtnPrimary onClick={() => scrollTo("voice")}>Evaluate My Voice Data ↓</BtnPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal delay-200">
              {[
                { icon: "📝", title: "Data Annotation", desc: "Precise labelling and correction of AI-generated Urdu text." },
                { icon: "🔤", title: "Code-Switching", desc: "Expertise in Roman Urdu and English linguistic blending." },
                { icon: "🎙️", title: "Speech Data", desc: "Providing clean, studio-ready phonetic Urdu recordings." },
                { icon: "✅", title: "Quality Assurance", desc: "Auditing conversational AI outputs for safety and tone." },
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

      {/* ── Voice Samples (Proof of Concept) ── */}
      <section id="voice" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Acoustic Portfolio</SectionLabel>
          <SectionHeading>Hear the Nuance</SectionHeading>
          <p className="text-lg max-w-2xl mb-12 text-gray-600 reveal">
            AI Voice training requires clean, articulate, and tonally varied data. Here are four acoustic samples demonstrating reading clarity, conversational pacing, and code-switching.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 reveal delay-100">
            {voiceSamples.map((sample) => (
              <AudioCard key={sample.id} {...sample} isPlaying={activeAudioId === sample.id} onTogglePlay={() => setActiveAudioId((current) => (current === sample.id ? null : sample.id))} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering & Operations (Projects & Exp merged visually) ── */}
      <section id="projects" className="py-20 sm:py-28" style={{ background: C.altBg }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal">
            <SectionLabel>Technical & Operational Backbone</SectionLabel>
            <SectionHeading>Software & Workflows</SectionHeading>
            <p className="text-lg max-w-2xl mb-12 text-gray-600">
              Beyond language training, I have a strong foundation in Computer Science and operational problem-solving. I build tools and systems that eliminate inefficiencies.
            </p>
          </div>

          <h3 className="font-extrabold text-xl mb-6 text-gray-900 reveal">Development Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 reveal delay-100">
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
                  <button onClick={() => setSelectedProject(p)} className="text-sm font-extrabold text-green-700 hover:text-green-500 transition-colors self-start flex items-center gap-2">
                    View Technical Details <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-extrabold text-xl mb-6 text-gray-900 reveal">Operations & Data Management</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal delay-200">
            {[
              { status: "Active System", title: "Live Inventory Tracking", desc: "Excel-based pharmaceutical stock management with discrepancy reduction." },
              { status: "Optimization", title: "Reporting Automation", desc: "Spreadsheet workflows reducing repetitive monthly data entry." },
              { status: "QA/QC", title: "Data Validation Rules", desc: "Cross-sheet validation systems eliminating human input errors." },
              { status: "Debugging", title: "Format Normalization", desc: "Identified and patched a critical date-formatting corruption in legacy reports." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl p-6 bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <Tag green>{c.status}</Tag>
                <h4 className="font-extrabold text-base mt-4 mb-2 text-gray-900">{c.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Me (Background) ── */}
      <section id="about" className="py-20 sm:py-28" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 items-center">
            <div className="reveal">
              <SectionLabel>The Complete Picture</SectionLabel>
              <SectionHeading>Experience & Background</SectionHeading>
              
              <div className="mb-8 border-l-4 border-green-200 pl-6 relative">
                <div className="absolute -left-[13px] top-1 w-5 h-5 rounded-full bg-white border-4 border-green-600" />
                <h3 className="text-xl font-extrabold text-gray-900">Aptly Pharmaceuticals</h3>
                <p className="text-green-700 font-bold mb-2">Customer Support & Operations Specialist (June 2024 – Present)</p>
                <p className="text-gray-600 text-base">Direct client communication, bilingual issue resolution (Urdu/English), and backend data management. This role refined my ability to document cases accurately and solve structural workflow problems.</p>
              </div>

              <div className="mb-10 border-l-4 border-amber-200 pl-6 relative">
                <div className="absolute -left-[13px] top-1 w-5 h-5 rounded-full bg-white border-4 border-amber-500" />
                <h3 className="text-xl font-extrabold text-gray-900">University of Agriculture, Faisalabad (UAF)</h3>
                <p className="text-amber-600 font-bold mb-2">BSc Computer Science (Expected 2028)</p>
                <p className="text-gray-600 text-base">Core competencies in Data Structures, OOP, Python, and front-end web technologies (HTML5, JS). Gives me the technical vocabulary required for advanced tech roles.</p>
              </div>

              <blockquote className="p-6 text-lg italic font-bold rounded-2xl border-l-4 shadow-sm bg-gray-50 text-gray-800 border-gray-300">
                "Whether I'm writing Python scripts to fix spreadsheet errors, or evaluating how an AI responds in Punjabi-infused Urdu—my core skill is bridging communication gaps."
              </blockquote>
            </div>

            <div className="hidden lg:block reveal delay-200">
              <div className="gradient-border-wrap shadow-xl">
                <img src={aboutPhoto} alt="Abdul Hanan" className="w-full h-auto object-cover rounded-[1.8rem] border-4 border-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form & Direct Info ── */}
      <section id="contact" className="py-20 sm:py-28 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-900 rounded-full blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionLabel>Get in Touch</SectionLabel>
          <SectionHeading light>Let's Work Together.</SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 reveal">
            <div>
              <p className="text-lg leading-relaxed mb-8 text-gray-300">
                I am actively seeking roles in AI Language Training, Prompt Evaluation, and Remote Operations. I am ready to contribute immediately.
              </p>
              
              <div className="space-y-6 mb-10 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="flex items-center gap-4 text-lg font-bold hover:text-green-400 transition-colors group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">✉️</div> {EMAIL}
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-bold hover:text-green-400 transition-colors group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">🔗</div> LinkedIn Profile ↗
                </a>
                <p className="flex items-center gap-4 text-lg font-bold">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">📍</div> Faisalabad, Pakistan 🇵🇰
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-gray-900">
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">✓</div>
                  <h3 className="font-extrabold text-2xl mb-3">Message Sent!</h3>
                  <p className="text-gray-600 text-lg">Thank you for reaching out. I'll respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Full Name</label>
                      <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                        className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Email</label>
                      <input type="email" required placeholder="john@email.com" value={formData.email} onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                        className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Topic</label>
                    <select required value={formData.topic} onChange={(e) => setFormData(d => ({ ...d, topic: e.target.value }))}
                      className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white cursor-pointer appearance-none">
                      <option value="" disabled>Select a topic...</option>
                      <option>AI Urdu Training / RLHF</option>
                      <option>Data Annotation Role</option>
                      <option>Customer Support / Ops</option>
                      <option>Other Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Message</label>
                    <textarea required rows={4} placeholder="How can we work together?" value={formData.message} onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
                      className="w-full text-base px-4 py-3.5 rounded-xl outline-none transition-all border-2 border-gray-100 bg-gray-50 focus:border-green-500 focus:bg-white resize-none" />
                  </div>
                  <BtnPrimary>{isSubmitting ? "Sending..." : "Send Message"}</BtnPrimary>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 bg-gray-950 text-gray-400 text-sm border-t-4 border-green-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Abdul Hanan.</h3>
              <p>AI Language Evaluator · CS Student · Faisalabad, PK</p>
            </div>
            <div className="flex gap-6 font-bold flex-wrap justify-center">
              <a href={PERSONAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Main Personal Website ↗</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Download Resume PDF</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between">
            <p>© 2026 Abdul Hanan Abrar. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
