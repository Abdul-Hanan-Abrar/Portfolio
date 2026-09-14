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

// ─── Sharp Precision Icons (14–16px) ──────────────────────────────────────────
function ArrowUpRight({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73s.77-1.73 1.72-1.73c.95 0 1.72.78 1.72 1.73s-.77 1.73-1.72 1.73m1.4 9.74v-8.37H5.06v8.37h2.8Z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─── Editorial Micro-Tags ────────────────────────────────────────────────────
function Badge({ children, active = false }: { children: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-medium tracking-wide uppercase ${
        active
          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
          : "bg-neutral-100 text-neutral-700 border border-neutral-200"
      }`}
    >
      {children}
    </span>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
type Project = {
  title: string;
  subtitle: string;
  status: string;
  description: string;
  tags: string[];
  image: string;
  fullDescription: string;
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-white border border-neutral-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full bg-neutral-900 border-b border-neutral-200">
          <img src={project.image} alt={project.title} className="w-full object-contain max-h-[40vh]" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-neutral-900 text-sm font-bold shadow-md transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge active={project.status === "Completed"}>{project.status}</Badge>
            <span className="text-xs text-neutral-500 font-mono tracking-tight">{project.subtitle}</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-4">{project.title}</h3>
          <p className="text-sm leading-relaxed text-neutral-600 mb-6 font-normal">{project.fullDescription}</p>
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100">
            {project.tags.map((t) => (
              <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compact, Sharp Audio Card ────────────────────────────────────────────────
function AudioCard({
  title,
  titleUrdu,
  description,
  audioSrc,
  isPlaying,
  onTogglePlay,
}: {
  title: string;
  titleUrdu: string;
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
    <div
      className={`p-4 rounded-lg border transition-all duration-200 ${
        isPlaying ? "bg-white border-neutral-900 shadow-sm" : "bg-white border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
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
          <h4 className="text-sm font-semibold text-neutral-900 tracking-tight">{title}</h4>
          <p className="urdu text-base text-emerald-800 font-normal mt-0.5">{titleUrdu}</p>
        </div>

        <button
          onClick={onTogglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            isPlaying ? "bg-neutral-900 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="4" width="4" height="16" />
              <rect x="15" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-xs text-neutral-500 mb-3 leading-normal">{description}</p>

      {/* Scrub Bar */}
      <div className="space-y-1">
        <div className="relative w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
          <div className="h-full bg-neutral-900 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-neutral-400">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Application ─────────────────────────────────────────────────────────
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const projects: Project[] = [
    {
      title: "BizLedger",
      subtitle: "Offline Retail POS Architecture",
      status: "In Development",
      description: "A self-contained, offline-first point-of-sale tool built for small retail establishments across Punjab requiring zero recurring fees.",
      fullDescription: "BizLedger is designed for retail shops operating in regional areas with unreliable network access. Built entirely with client-side JavaScript, HTML5, and IndexedDB local caching with zero runtime dependencies. Handles inventory reconciliation, transactional logs, and automated low-stock calculations without an external server.",
      tags: ["JavaScript", "HTML5", "Offline-First", "Storage API"],
      image: bizLedgerImg,
    },
    {
      title: "QR Direct Transfer",
      subtitle: "Optical Peer-to-Peer Relay",
      status: "Completed",
      description: "Air-gapped file delivery pipeline encoding local binaries into optical matrices decoded via mobile hardware camera APIs.",
      fullDescription: "Solves ad-hoc file transfers across non-networked machines. Uses the native BarcodeDetector API to parse camera stream data without intermediary cloud relays, third-party libraries, or cabling requirements.",
      tags: ["BarcodeDetector API", "Canvas", "Vanilla JS"],
      image: qrToolImg,
    },
  ];

  const voiceSamples = [
    {
      id: "voice-1",
      title: "Natural Conversational Urdu",
      titleUrdu: "قدرتی اردو گفتگو",
      description: "Unscripted regional cadence, pauses, and everyday vocabulary.",
      audioSrc: `${import.meta.env.BASE_URL}Natural%20Conversational%20Urdu.m4a`,
    },
    {
      id: "voice-2",
      title: "Urdu-English Code-Switching",
      titleUrdu: "اردو انگریزی — مشترکہ گفتگو",
      description: "Authentic bilingual loan-word integration common across professional environments.",
      audioSrc: `${import.meta.env.BASE_URL}Natural%20Urdu-English%20Communication.m4a`,
    },
    {
      id: "voice-3",
      title: "Articulate Reading & Exposition",
      titleUrdu: "صاف اردو پڑھائی اور فطری وضاحت",
      description: "Clean phonetics and controlled pacing suited for acoustic model calibration.",
      audioSrc: `${import.meta.env.BASE_URL}Clear%20Urdu%20Reading%20&%20Natural%20Explanation.m4a`,
    },
    {
      id: "voice-4",
      title: "Prosody & Accent Perception",
      titleUrdu: "محتاط سماعت اور غیر واضح گفتگو",
      description: "Nuanced pronunciation handling colloquial phrasing and dialectal inflections.",
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
          Message: formData.message,
          _subject: `[Portfolio Inquiry] From ${formData.name}`,
        }),
      });
      if (res.ok) setFormSent(true);
      else alert("Transmission failed. Please reach out directly via email.");
    } catch {
      alert("Network error. Please use the direct email link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-neutral-900 font-sans antialiased selection:bg-neutral-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Noto+Nastaliq+Urdu:wght@400;600&display=swap');

        .urdu {
          font-family: 'Noto Nastaliq Urdu', serif !important;
          direction: rtl;
          text-align: right;
          line-height: 2.6 !important;
        }
      `}</style>

      {/* ── Minimal Navigation ── */}
      <header className="sticky top-0 z-40 bg-[#FAF9F7]/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold text-sm tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors">
            Abdul Hanan Abrar
          </a>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={PERSONAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
            >
              Personal Site <ArrowUpRight />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="max-w-5xl mx-auto px-5 py-12 sm:py-20 space-y-20 sm:space-y-28">

        {/* ── Executive Profile / Hero ── */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8 md:gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="text-xs font-mono tracking-tight text-neutral-500 uppercase">
                Available for AI Language Training & RLHF
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-3">
              AI Urdu Language Specialist & Technical Operations
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mb-6">
              Native Urdu and fluent Punjabi speaker with a background in Computer Science and two years of operations at Aptly Pharmaceuticals. Specializing in RLHF evaluation, idiomatic dataset verification, and synthetic bilingual dialogue curation for frontier models.
            </p>

            {/* Disciplined Nastaliq Callout */}
            <div className="p-4 rounded-lg bg-white border border-neutral-200/80 mb-6 max-w-xl">
              <p className="urdu text-lg sm:text-xl text-neutral-900">
                اردو زبان میں مصنوعی ذہانت (AI) کی درستی، تربیت اور لسانی جانچ — معیاری انداز میں
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-600">
              <span className="px-2 py-1 rounded bg-white border border-neutral-200">Urdu (Native C2)</span>
              <span className="px-2 py-1 rounded bg-white border border-neutral-200">Punjabi (Fluent)</span>
              <span className="px-2 py-1 rounded bg-white border border-neutral-200">English (Professional)</span>
              <span className="px-2 py-1 rounded bg-white border border-neutral-200">BSc Computer Science '28</span>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100 shadow-sm flex-shrink-0">
              <img src={heroPhoto} alt="Abdul Hanan Abrar" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </section>

        {/* ── AI Language Evaluation & RLHF Competency ── */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 pb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-mono">01 / AI Language Competency</h2>
            <span className="text-xs text-neutral-400 font-mono">Domain Overview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "RLHF & Model Grading",
                desc: "Evaluating response coherence, tone fidelity, hallucination rates, and dialectal nuance in complex Urdu prompts.",
              },
              {
                title: "Code-Switching Contexts",
                desc: "Validating authentic mixed English-Urdu dialogues as naturally written and spoken across Pakistan.",
              },
              {
                title: "Acoustic Annotation",
                desc: "Assessing TTS prosody, cadence artifacts, regional accent intonations, and phonetic accuracy for ASR pipelines.",
              },
              {
                title: "Dataset Localization",
                desc: "Translating technical logic into culturally accurate Urdu without awkward literal translation artifacts.",
              },
              {
                title: "Prompt Engineering & Red-Teaming",
                desc: "Formulating adversarial edge cases in localized scripts to test safety filters and guardrail compliance.",
              },
              {
                title: "Technical Alignment",
                desc: "Computer Science foundation ensures clear understanding of tokenization issues, UTF-8 constraints, and labeling pipelines.",
              },
            ].map((c) => (
              <div key={c.title} className="p-4 rounded-lg bg-white border border-neutral-200/90 space-y-2">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-tight">{c.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Audio Proof / 4 Voice Samples ── */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 pb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-mono">02 / Verified Voice Samples</h2>
            <span className="text-xs text-neutral-400 font-mono">Uncompressed Audio Assets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {voiceSamples.map((v) => (
              <AudioCard
                key={v.id}
                title={v.title}
                titleUrdu={v.titleUrdu}
                description={v.description}
                audioSrc={v.audioSrc}
                isPlaying={activeAudioId === v.id}
                onTogglePlay={() => setActiveAudioId((curr) => (curr === v.id ? null : v.id))}
              />
            ))}
          </div>
        </section>

        {/* ── Software Projects ── */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 pb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-mono">03 / Software Projects</h2>
            <span className="text-xs text-neutral-400 font-mono">Systems & Tools</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-44 bg-neutral-900 overflow-hidden border-b border-neutral-200">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top opacity-95" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-neutral-900">{p.title}</h3>
                      <Badge active={p.status === "Completed"}>{p.status}</Badge>
                    </div>
                    <p className="text-xs font-mono text-neutral-500">{p.subtitle}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed pt-1">{p.description}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-neutral-100">
                  <div className="flex gap-1">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="text-xs font-semibold text-neutral-900 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                  >
                    Details <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Operational Experience ── */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 pb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-mono">04 / Experience & Operations</h2>
            <span className="text-xs text-neutral-400 font-mono">Professional History</span>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-white border border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">Aptly Pharmaceuticals</h3>
                  <span className="text-xs text-neutral-500">· Faisalabad, Pakistan</span>
                </div>
                <span className="text-xs font-mono text-neutral-400">June 2024 — Present</span>
              </div>
              <p className="text-xs font-semibold text-emerald-800 mb-3 font-mono uppercase tracking-tight">
                Customer Support & Operations Specialist
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Managing bilingual client communication, issue logging, cross-departmental coordination, and operational stock data.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
                <div className="space-y-1">
                  <span className="font-semibold text-neutral-800 block text-[11px] uppercase tracking-wider font-mono">Inventory Systems</span>
                  <p className="text-neutral-500 text-xs">Developed live spreadsheet workflows tracking multi-SKU pharmaceutical inventory, minimizing stock discrepancies.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-neutral-800 block text-[11px] uppercase tracking-wider font-mono">Data Validation</span>
                  <p className="text-neutral-500 text-xs">Isolated and corrected persistent date parsing errors (DD/MM vs MM/DD) in monthly reporting sheets, restoring reporting accuracy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Background & Education ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="p-5 rounded-lg bg-white border border-neutral-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400">Academic Background</h3>
            <p className="text-sm font-bold text-neutral-900">BSc in Computer Science</p>
            <p className="text-xs text-neutral-600">University of Agriculture, Faisalabad (UAF)</p>
            <p className="text-xs font-mono text-neutral-400">Enrolled · Expected Graduation 2028</p>
            <p className="text-xs text-neutral-500 pt-2 leading-relaxed">
              Coursework emphasizes Data Structures, Object-Oriented Programming, Relational Databases, and Python.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-neutral-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400">Central Portal</h3>
            <p className="text-sm font-bold text-neutral-900">Primary Personal Website</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Review full repositories, supplemental writing samples, and extended background documentation on my primary GitHub Pages site.
            </p>
            <div className="pt-2">
              <a
                href={PERSONAL_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-emerald-700 transition-colors"
              >
                Visit Personal Website <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Concise Contact Block (Sharp & Minimal) ── */}
        <section id="contact" className="border-t border-neutral-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-start">
            <div>
              <h2 className="text-base font-bold text-neutral-950 mb-2">Initiate Contact</h2>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Available for contract evaluations, bilingual language engineering tasks, or operational roles.
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-2.5 text-xs font-medium text-neutral-800 hover:text-emerald-700 transition-colors"
                >
                  <MailIcon className="text-neutral-500 w-3.5 h-3.5" />
                  <span>Email Abdul</span>
                </a>

                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-medium text-neutral-800 hover:text-emerald-700 transition-colors"
                >
                  <LinkedInIcon className="text-neutral-500 w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>

                <div className="flex items-center gap-2.5 text-xs text-neutral-500 font-mono">
                  <MapPinIcon className="text-neutral-400 w-3.5 h-3.5" />
                  <span>Faisalabad, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Tight, Clean Contact Form */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              {formSent ? (
                <div className="py-8 text-center space-y-1">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono">Transmission Confirmed</p>
                  <p className="text-xs text-neutral-500">Your message has been dispatched. I will reply shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded border border-neutral-200 bg-[#FAF9F7] text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded border border-neutral-200 bg-[#FAF9F7] text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Outline project or position requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className="w-full text-xs px-3 py-2 rounded border border-neutral-200 bg-[#FAF9F7] text-neutral-900 focus:outline-none focus:border-neutral-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 rounded bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Dispatching..." : "Send Dispatch"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* ── Understated Footer ── */}
      <footer className="border-t border-neutral-200/80 py-8 text-neutral-400 text-xs">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Abdul Hanan Abrar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={PERSONAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">
              Personal Site
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">
              LinkedIn
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">
              Resume PDF
            </a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
