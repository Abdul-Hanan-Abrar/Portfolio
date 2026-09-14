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
    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8" style={{ color: light ? "#fff" : C.text }}>
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
  const cls = "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 overflow-hidden";
  const content = (
    <>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-600 to-green-800 transition-all duration-300 group-hover:scale-110"></span>
      <span className="relative">{children}</span>
    </>
  );
  if (href) return <a href={href} download={download} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls}>{content}</a>;
  return <button onClick={onClick} className={cls}>{content}</button>;
}

// ─── Native Zero-Latency Audio Card (Modernized) ─────────────────────────────
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
    <div className={`relative p-6 rounded-2xl transition-all duration-500 overflow-hidden ${isPlaying ? 'shadow-2xl scale-[1.02]' : 'shadow-sm hover:shadow-md hover:-translate-y-1'}`}
         style={{ background: C.white, border: `1px solid ${isPlaying ? C.green : C.border}` }}>
      
      {isPlaying && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 animate-pulse" />}
      
      <audio ref={audioRef} src={audioSrc} preload="metadata" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(formatTime(audioRef.current?.duration || 0))} onEnded={onTogglePlay} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
          <p className="urdu text-lg text-green-700">{titleUrdu}</p>
        </div>
        <button onClick={onTogglePlay} className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg text-white" style={{ background: isPlaying ? C.darkGreen : C.green }}>
          {isPlaying ? 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="2" width="4" height="10" rx="1"/><rect x="8" y="2" width="4" height="10" rx="1"/></svg> : 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-1"><path d="M3 2L12 7L3 12V2Z"/></svg>}
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-4 h-8">{description}</p>

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
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 selection:bg-green-200">
      {/* ── High-Performance Premium Styles ── */}
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
          background: linear-gradient(135deg, #22C55E 0%, #059669 100%);
          padding: 4px;
          border-radius: 9999px;
        }
      `}</style>

      {/* ── Glassmorphic Navbar ── */}
      <nav className="fixed top-0 w-full z-50 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tighter">Abdul Hanan.</span>
          <div className="hidden lg:flex gap-8 font-semibold text-sm text-gray-600">
            {['Home', 'About', 'AI Tutor', 'Experience', 'Projects'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-green-600 transition-colors">{l}</a>
            ))}
          </div>
          <div className="hidden lg:flex gap-4">
             <BtnPrimary href={RESUME_URL} target="_blank">Download Resume</BtnPrimary>
          </div>
        </div>
      </nav>

      {/* ── Hero Section (Redesigned for Maximum Impact) ── */}
      <section id="home" className="pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 fade-up">
            <Tag green>🚀 Open to New Opportunities</Tag>
            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tighter mt-6 mb-6 text-gray-900">
              Building systems that <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">understand context.</span>
            </h1>
            
            <div className="p-6 rounded-2xl bg-white shadow-xl shadow-green-900/5 border border-green-100 mb-8 transform -rotate-1 hover:rotate-0 transition-transform">
              <p className="urdu text-green-800 font-bold">
                اردو زبان میں اے آئی کو سکھانا — میری خاصیت ہے
              </p>
            </div>

            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Native Urdu speaker & CS student bridging the gap between human language nuances and machine learning datasets. Specialist in authentic code-switching and operational workflows.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <BtnPrimary href="#contact">Discuss an Opportunity →</BtnPrimary>
              <a href={PERSONAL_WEBSITE_URL} className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors px-4">
                View Full Portfolio
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end fade-up delay-200">
            <div className="gradient-border-wrap relative shadow-2xl shadow-green-600/20">
              <img src={heroPhoto} alt="Abdul Hanan Abrar" className="w-64 h-64 sm:w-96 sm:h-96 object-cover rounded-full border-4 border-white" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                <p className="text-sm font-bold flex items-center gap-2">🇵🇰 Faisalabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Language Tutor Section (Deep Contrast) ── */}
      <section id="ai-tutor" className="py-24 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="fade-up">
            <SectionLabel>Domain Expertise</SectionLabel>
            <SectionHeading light>Training AI in Urdu, <br/>The Right Way.</SectionHeading>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Most LLMs struggle with actual, street-level code-switching. I construct datasets that reflect how Pakistanis *actually* communicate—merging technical CS knowledge with native linguistic intuition.
            </p>
            <div className="space-y-4">
              {["Native Urdu & Fluent Punjabi Nuances", "Bilingual Code-Switching (Urdu-English)", "Data Annotation & Response Evaluation"].map(item => (
                <div key={item} className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="fade-up delay-100 bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="text-2xl">🎙️</span> Acoustic Evaluation Samples
            </h3>
            <div className="space-y-4">
              <AudioCard title="Natural Code-Switching" titleUrdu="اردو انگریزی — مشترکہ گفتگو" description="Authentic context switching." audioSrc={`${import.meta.env.BASE_URL}Natural%20Urdu-English%20Communication.m4a`} isPlaying={activeAudioId === '1'} onTogglePlay={() => setActiveAudioId(a => a === '1' ? null : '1')} />
              <AudioCard title="Dialect & Prosody Assessment" titleUrdu="محتاط سماعت اور غیر واضح گفتگو" description="Evaluating complex acoustic cues." audioSrc={`${import.meta.env.BASE_URL}Careful%20Listening%20&%20Unclear%20Speech.m4a`} isPlaying={activeAudioId === '2'} onTogglePlay={() => setActiveAudioId(a => a === '2' ? null : '2')} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering & Operations (Grid Layout) ── */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Engineering Portfolio</SectionLabel>
          <SectionHeading>Technical Builds</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                <img src={bizLedgerImg} alt="BizLedger" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <Tag green>Offline-First Retail POS</Tag>
                <h3 className="text-2xl font-bold mt-4 mb-2">BizLedger</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">A zero-dependency, local-storage powered POS system designed for 1.3M+ unbanked retail shops in Punjab to manage inventory offline.</p>
                <div className="flex gap-2 font-mono text-xs text-gray-400">
                  <span>HTML5</span> • <span>JS</span> • <span>IndexedDB</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                <img src={qrToolImg} alt="QR Tool" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <Tag>Hardware Interfacing</Tag>
                <h3 className="text-2xl font-bold mt-4 mb-2">Offline QR Transfer</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">Peer-to-peer file transfer leveraging the native BarcodeDetector API. Bypasses the need for cloud uploads or USB cables entirely.</p>
                <div className="flex gap-2 font-mono text-xs text-gray-400">
                  <span>Web APIs</span> • <span>Canvas</span> • <span>Network-Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── High-Converting Footer CTA ── */}
      <footer id="contact" className="bg-gray-900 pt-24 pb-12 border-t-8 border-green-500">
        <div className="max-w-4xl mx-auto px-6 text-center fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Let's build something exceptional.</h2>
          <p className="text-xl text-gray-400 mb-10">Currently accepting roles in AI Dataset Annotation, Support Operations, and Front-End Engineering.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24">
            <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="bg-green-500 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 flex items-center gap-2">
              ✉️ Initiate Contact
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white border border-gray-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-gray-800 transition-colors">
              Connect on LinkedIn ↗
            </a>
          </div>

          <div className="border-t border-gray-800 pt-8 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Abdul Hanan Abrar. Faisalabad, Pakistan.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href={PERSONAL_WEBSITE_URL} className="hover:text-white transition-colors">Full Portfolio</a>
              <a href={RESUME_URL} className="hover:text-white transition-colors">Curriculum Vitae</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
              }
