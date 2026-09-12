import { useState, useEffect, useCallback, useRef } from "react";
import portraitSrc from "@/imports/abdul-hanan-portrait.jpeg";

/* ─── 📐 Minimal Professional SVG Icons (No Emojis / No "Toy" Artifacts) ── */
const Icon = ({ d, size = 19, strokeWidth = 1.8 }: { d: string; size?: number; strokeWidth?: number }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d={d} />
  </svg>
);

const PersonIcon = () => <Icon d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
const BookIcon = () => <Icon d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5zM6 6h10M6 10h10" />;
const WaveIcon = () => <Icon d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" />;
const DataIcon = () => <Icon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />;
const TrendIcon = () => <Icon d="M3 3v18h18M18 9l-5 5-4-4-4 4" />;
const GradCapIcon = () => <Icon d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 2 6 2 6 2s3 0 6-2v-5" />;
const MailIcon = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />;
const SunIcon = () => <Icon d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />;
const MoonIcon = () => <Icon d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />;
const HeadsetIcon = () => <Icon d="M3 18v-6a9 9 0 0 1 18 0v6M3 18a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5zM21 18a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />;
const SheetIcon = () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6" />;
const ChartIcon = () => <Icon d="M18 20V10M12 20V4M6 20v-6" />;
const ArrowUpRight = ({ size = 16 }: { size?: number }) => <Icon d="M7 17L17 7M7 7h10v10" size={size} strokeWidth={2.2} />;
const ArrowDown = ({ size = 16 }: { size?: number }) => <Icon d="M12 5v14M19 12l-7 7-7-7" size={size} strokeWidth={2.2} />;
const MenuIcon = () => <Icon d="M4 6h16M4 12h16M4 18h16" size={22} />;
const CloseIcon = () => <Icon d="M18 6L6 18M6 6l12 12" size={22} />;
const GlobeIcon = () => <Icon d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10m0-20c-2.5 2.7-4 6.2-4 10s1.5 7.3 4 10m-8-10h16" />;
const PlayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);
const PauseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);
const LinkedInIcon = () => (
  <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74V9.96H5.06v8.54z" />
  </svg>
);

/* ─── 🔗 Robust Base URL Asset Helper ──────────────────────── */
const getAssetUrl = (fileName: string) => {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${encodeURIComponent(fileName)}`;
};

/* ─── 🧭 Navigation Links ───────────────────────────────────── */
const NAV = [
  { label: "About", href: "#about", icon: <PersonIcon /> },
  { label: "Expertise", href: "#teaching", icon: <BookIcon /> },
  { label: "Voice Samples", href: "#voice", icon: <WaveIcon /> },
  { label: "AI Language Data", href: "#data", icon: <DataIcon /> },
  { label: "Experience", href: "#work", icon: <TrendIcon /> },
  { label: "Education", href: "#education", icon: <GradCapIcon /> },
  { label: "Contact", href: "#contact", icon: <MailIcon /> },
];

/* ─── 🎙️ Voice Audio Metadata ───────────────────────────────── */
const VOICE_SAMPLES = [
  {
    n: "01",
    title: "Natural Conversational Urdu",
    desc: "Everyday pace, fluid register, and natural inflection patterns.",
    fileName: "Natural Conversational Urdu.m4a",
  },
  {
    n: "02",
    title: "Clear Urdu Reading & Natural Explanation",
    desc: "Precise diction followed by intuitive, step-by-step clarification.",
    fileName: "Clear Urdu Reading & Natural Explanation.m4a",
  },
  {
    n: "03",
    title: "Natural Urdu-English Communication",
    desc: "Smooth code-switching and bilingual bridging for complex ideas.",
    fileName: "Natural Urdu-English Communication.m4a",
  },
  {
    n: "04",
    title: "Careful Listening & Unclear Speech",
    desc: "Handling degraded acoustics, accented murmurs, and distorted speech.",
    fileName: "Careful Listening & Unclear Speech.m4a",
  },
];

/* ─── 🎵 Polished Native Audio Player Component ────────────── */
function AudioPlayerCard({
  sample,
  dark,
}: {
  sample: (typeof VOICE_SAMPLES)[number];
  dark: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);

  const audioSrc = getAssetUrl(sample.fileName);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audioRef.current) el.pause();
      });
      audioRef.current.play().catch(() => setHasError(true));
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = clickPos * audioRef.current.duration;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className="rounded-2xl p-6 border flex flex-col justify-between gap-5 transition-all hover:border-[#E86D35]/50 shadow-sm"
      style={{
        backgroundColor: dark ? "#11261F" : "#FFFFFF",
        borderColor: dark ? "rgba(255,255,255,0.1)" : "#E2E8F0",
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-mono font-bold tracking-wider text-[#E86D35]">
            SAMPLE {sample.n}
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
            style={{
              backgroundColor: dark ? "rgba(232,109,53,0.18)" : "#FFF1EC",
              color: "#E86D35",
            }}
          >
            Audio Stream
          </span>
        </div>
        <h3 className="font-bold text-lg leading-snug mb-2" style={{ color: dark ? "#F8FAFC" : "#0F172A" }}>
          {sample.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: dark ? "#CBD5E1" : "#475569" }}>
          {sample.desc}
        </p>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setHasError(true)}
      />

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2.5">
        {hasError ? (
          <div className="flex items-center justify-between text-sm text-red-400">
            <span>Audio stream failed</span>
            <a href={audioSrc} download className="underline font-medium hover:text-red-300">
              Download file
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-3.5">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio" : "Play audio sample"}
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-[#E86D35] hover:bg-[#D05A22] text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div
              onClick={handleSeek}
              className="relative flex-1 h-3 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer overflow-hidden py-1"
            >
              <div
                className="h-full bg-[#E86D35] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-mono text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 🚀 Main Application ─────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = useCallback(() => setDark((d) => !d), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const gmailComposeUrl = (subject: string) =>
    `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=abdulhananabrar941@gmail.com&su=${encodeURIComponent(
      subject
    )}`;

  // Universal Device-Agnostic CV Downloader (iOS Safari, Android, PC)
  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    const cvUrl = getAssetUrl("Abdul_Hanan_CV.pdf");

    try {
      const response = await fetch(cvUrl);
      if (!response.ok) throw new Error("Fetch error");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Abdul_Hanan_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      window.open(cvUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={{
        backgroundColor: dark ? "#091712" : "#F7F5EE",
        color: dark ? "#F3F4F6" : "#0F172A",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
      className="min-h-screen transition-colors duration-200 antialiased selection:bg-[#E86D35]/25 selection:text-[#E86D35]"
    >
      {/* ── 📱 Mobile Left Drawer Overlay ──────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* ── 📱 Mobile Drawer Menu ──────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: dark ? "#0D221A" : "#FFFFFF",
          borderRight: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <span className="font-bold text-lg tracking-tight" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>
              Abdul Hanan
            </span>
            <button
              onClick={closeMobileMenu}
              aria-label="Close navigation"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-base font-semibold transition-colors hover:bg-[#E86D35]/15 text-gray-800 dark:text-gray-100"
              >
                <span style={{ color: "#E86D35" }}>{n.icon}</span>
                <span>{n.label}</span>
              </a>
            ))}

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-3" />

            <a
              href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-[#E86D35] bg-[#E86D35]/10 hover:bg-[#E86D35]/20"
            >
              <span className="flex items-center gap-2.5">
                <GlobeIcon /> Personal Website
              </span>
              <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 font-mono">THEME</span>
          <button
            onClick={toggleDark}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E86D35]/15 text-[#E86D35]"
          >
            {dark ? <SunIcon /> : <MoonIcon />} {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* ── 📌 Top Navigation Bar ──────────────────────────── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
        style={{
          backgroundColor: dark ? "rgba(9,23,18,0.88)" : "rgba(247,245,238,0.92)",
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl text-gray-800 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <MenuIcon />
            </button>

            <button
              onClick={toggleDark}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 rounded-xl transition-all"
              style={{
                color: "#E86D35",
                backgroundColor: dark ? "rgba(232,109,53,0.15)" : "rgba(232,109,53,0.1)",
              }}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors hover:text-[#E86D35] hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: dark ? "#E2E8F0" : "#334155" }}
              >
                <span style={{ color: "#E86D35" }}>{n.icon}</span>
                <span>{n.label}</span>
              </a>
            ))}
          </nav>

          <a
            href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border border-[#E86D35] text-[#E86D35] hover:bg-[#E86D35] hover:text-white transition-all shadow-xs"
          >
            <GlobeIcon />
            <span>Personal Site</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* ── 🌟 Hero Section ─────────────────────────────────── */}
      <section className="max-w-[1360px] mx-auto px-4 pt-14 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-mono font-bold tracking-wider uppercase text-[#E86D35]">
            Urdu Tutor · Language Data Specialist · Faisalabad, Pakistan
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]"
            style={{ color: dark ? "#FFFFFF" : "#123B2D" }}
          >
            Clear language.<br />
            <em className="not-italic" style={{ color: "#E86D35" }}>Careful data.</em><br />
            Human connection.
          </h1>

          <p className="text-lg leading-relaxed max-w-xl" style={{ color: dark ? "#CBD5E1" : "#334155" }}>
            I am <strong className="font-bold text-slate-900 dark:text-white">Abdul Hanan</strong>, a native Urdu speaker helping learners build verbal fluency and assisting AI engineering teams with high-precision bilingual datasets.
          </p>

          <p
            lang="ur"
            dir="rtl"
            className="text-3xl sm:text-4xl leading-relaxed text-right max-w-lg font-medium"
            style={{
              fontFamily: '"Noto Nastaliq Urdu", "Urdu Typesetting", Tahoma, serif',
              color: dark ? "#6EE7B7" : "#1E5943",
            }}
          >
            السلام علیکم — زبان سیکھنے کا سفر خوشگوار ہو۔
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href={gmailComposeUrl("Urdu Tutoring or Data Collaboration")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold bg-[#E86D35] hover:bg-[#D05A22] text-white shadow-md transition-all active:scale-95"
            >
              <span>Email Abdul</span>
              <ArrowUpRight size={16} />
            </a>

            <button
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold border-2 transition-all active:scale-95 cursor-pointer"
              style={{
                borderColor: dark ? "#34D399" : "#123B2D",
                color: dark ? "#34D399" : "#123B2D",
              }}
            >
              <ArrowDown size={16} />
              <span>Download CV</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold" style={{ color: dark ? "#94A3B8" : "#475569" }}>
              Available for remote tutoring &amp; bilingual evaluation projects
            </span>
          </div>
        </div>

        {/* Hero Portrait */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl border-4"
              style={{ borderColor: dark ? "#34D399" : "#123B2D" }}
            >
              <img src={portraitSrc} alt="Abdul Hanan" className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>
              Abdul Hanan
            </p>
            <p className="text-sm font-semibold mt-1" style={{ color: dark ? "#CBD5E1" : "#64748B" }}>
              Native Urdu Tutor &amp; Language Data Support
            </p>
          </div>
        </div>
      </section>

      {/* ── 🏷️ Banner Strip ─────────────────────────────────── */}
      <div style={{ backgroundColor: "#E86D35" }} className="py-4 px-4 text-white">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-mono text-sm font-black tracking-widest uppercase opacity-95">
            For Language Teams &amp; Recruiters
          </span>
          <span className="hidden sm:inline opacity-40 mx-1">|</span>
          <span className="text-base font-medium">
            Combining phonetics awareness, customer operations discipline, and clean script automation.
          </span>
        </div>
      </div>

      {/* ── 👤 Section 1: About ─────────────────────────────── */}
      <section id="about" className="max-w-[1360px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><PersonIcon /></span>
          <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">01 / Profile</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5" style={{ color: dark ? "#F8FAFC" : "#123B2D" }}>
              A thoughtful bridge between people and language.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: dark ? "#CBD5E1" : "#334155" }}>
              Whether guiding a student through Nastaliq orthography or validating automated transcriptions for subtle phonetic variations, I balance cultural intuition with technical rigor.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: dark ? "#CBD5E1" : "#334155" }}>
              My operational background includes customer support, quality assurance, dataset labeling, and automated Python reporting workflows.
            </p>
            <a
              href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#E86D35] hover:underline"
            >
              <span>Explore personal developer portfolio</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {[
              { label: "Native Speaker", sub: "Urdu (C2 Mastery)" },
              { label: "Native Dialect", sub: "Punjabi (Regional Fluency)" },
              { label: "Professional", sub: "English (B2 Working Proficiency)" },
            ].map((f) => (
              <div
                key={f.sub}
                className="rounded-2xl p-5 border shadow-xs"
                style={{
                  backgroundColor: dark ? "#11261F" : "#FFFFFF",
                  borderColor: dark ? "rgba(255,255,255,0.1)" : "#E2E8F0",
                }}
              >
                <p className="text-xs font-mono font-bold tracking-widest text-[#E86D35] uppercase mb-1">{f.label}</p>
                <p className="text-lg font-bold" style={{ color: dark ? "#F8FAFC" : "#123B2D" }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 📚 Section 2: Teaching & Clean Editorial Bilingual Area ── */}
      <section
        id="teaching"
        className="py-16 border-y"
        style={{
          backgroundColor: dark ? "#0D221A" : "#F1EDE4",
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><BookIcon /></span>
            <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">02 / Teaching &amp; Dialect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: dark ? "#F8FAFC" : "#123B2D" }}>
            Instruction built around clear mechanics.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { n: "01", title: "Conversation & Articulation", desc: "Targeted practice on Urdu retroflex consonants, aspiration patterns, and natural spoken tempo." },
              { n: "02", title: "Literary & Formal Script", desc: "Systematic introduction to Nastaliq orthography, connected letterforms, and reading comprehension." },
              { n: "03", title: "Register & Regional Context", desc: "Navigating formal (Aap), polite (Tum), and casual registers across different conversational environments." },
            ].map((c) => (
              <div
                key={c.n}
                className="rounded-2xl p-6 border shadow-xs"
                style={{
                  backgroundColor: dark ? "#142F24" : "#FFFFFF",
                  borderColor: dark ? "rgba(255,255,255,0.08)" : "#E2E8F0",
                }}
              >
                <span className="font-mono text-3xl font-black block mb-2 text-[#E86D35]">{c.n}</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: dark ? "#CBD5E1" : "#475569" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* ── 🌟 Fixed Editorial Dual-Column Bilingual Showcase ── */}
          <div
            className="rounded-3xl p-6 sm:p-9 border shadow-xl transition-all"
            style={{
              backgroundColor: dark ? "#112820" : "#123B2D",
              borderColor: dark ? "rgba(255,255,255,0.12)" : "#0E2E23",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E86D35] font-bold">
                Bilingual Context Breakdown
              </span>
              <span className="text-xs font-semibold text-white/80 bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
                Urdu (Nastaliq) ⇄ English
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Authentic Urdu */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Original Urdu Script
                </span>
                <p
                  lang="ur"
                  dir="rtl"
                  className="text-3xl sm:text-4xl lg:text-5xl text-right leading-loose text-white font-medium my-1"
                  style={{ fontFamily: '"Noto Nastaliq Urdu", "Urdu Typesetting", Tahoma, serif' }}
                >
                  یہ جملہ اردو میں ہے۔
                </p>
                <p className="text-base text-emerald-300 font-mono tracking-wide mt-1">
                  Yeh jumla Urdu mein hai.
                </p>
              </div>

              {/* Right: English Breakdown */}
              <div className="flex flex-col gap-2 md:border-l md:border-white/15 md:pl-8">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E86D35] font-bold">
                  Translation &amp; Structure
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  "This sentence is in Urdu."
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-2">
                  Demonstrating Subject-Object-Verb (SOV) order, feminine gender concord, and natural conversational phonology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 🎙️ Section 3: Voice Samples ─────────────────────── */}
      <section id="voice" className="max-w-[1360px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><WaveIcon /></span>
          <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">03 / Voice Samples</span>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: dark ? "#F8FAFC" : "#123B2D" }}>
            Direct Audio Samples
          </h2>
          <p className="text-base max-w-xl mt-2" style={{ color: dark ? "#CBD5E1" : "#475569" }}>
            Authentic voice recordings demonstrating vocal clarity, dialect control, and conversational pacing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {VOICE_SAMPLES.map((sample) => (
            <AudioPlayerCard key={sample.n} sample={sample} dark={dark} />
          ))}
        </div>
      </section>

      {/* ── 📊 Section 4: AI Language Data ──────────────────── */}
      <section id="data" style={{ backgroundColor: "#123B2D" }} className="py-16 text-white">
        <div className="max-w-[1360px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><DataIcon /></span>
            <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">04 / AI Data Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Precision language data workflows.</h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl text-white/85">
            Available for evaluation rubrics, speech quality scoring, transcription audits, and bilingual validation datasets.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "Audio Transcription Scoring",
              "Phonetic Annotation",
              "Urdu Dialect Categorization",
              "Dataset Validation",
              "Python Automation",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-[#E86D35]/50 bg-[#E86D35]/15 text-[#E86D35]"
              >
                {skill}
              </span>
            ))}
          </div>

          <a
            href={gmailComposeUrl("AI Language Data Collaboration")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold bg-[#E86D35] hover:bg-[#D05A22] text-white shadow-lg transition-all active:scale-95"
          >
            <span>Email Abdul</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* ── 💼 Section 5: Experience ────────────────────────── */}
      <section id="work" className="max-w-[1360px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><TrendIcon /></span>
          <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">05 / Experience</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: dark ? "#F8FAFC" : "#123B2D" }}>
          Operational discipline &amp; projects.
        </h2>

        <div className="flex flex-col">
          {[
            {
              icon: <HeadsetIcon />,
              eyebrow: "Customer Support & Operations",
              title: "Aptly Pharmaceuticals",
              desc: "Handled bilingual client communication and critical inventory management, maintaining a verified 92% customer satisfaction score.",
            },
            {
              icon: <SheetIcon />,
              eyebrow: "Automation Project",
              title: "12-Sheet Validation System",
              desc: "Engineered automated validation formulas that eliminated manual data-entry errors by more than 50%.",
            },
            {
              icon: <ChartIcon />,
              eyebrow: "Workflow Automation",
              title: "Reporting Pipeline Optimization",
              desc: "Automated recurring reporting workflows using Python scripts, resolving cross-platform date mismatch issues.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-5 py-6 border-b"
              style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-[#E86D35]"
                style={{ backgroundColor: dark ? "rgba(232,109,53,0.15)" : "#FFF1EC" }}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-[#E86D35]">{item.eyebrow}</p>
                <h3 className="font-bold text-lg mb-1" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>{item.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: dark ? "#CBD5E1" : "#475569" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 🎓 Section 6: Education ─────────────────────────── */}
      <section
        id="education"
        className="py-16 border-y"
        style={{
          backgroundColor: dark ? "#0D221A" : "#F1EDE4",
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><GradCapIcon /></span>
            <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">06 / Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8" style={{ color: dark ? "#F8FAFC" : "#123B2D" }}>
            Academic Background
          </h2>

          <div className="flex flex-col max-w-2xl">
            {[
              {
                date: "Sep 2024 — Expected 2028",
                title: "BSc Computer Science",
                inst: "University of Agriculture, Faisalabad (UAF)",
                note: "Core Focus: Data Structures, Database Systems, Software Engineering",
              },
              {
                date: "2022 — 2024",
                title: "Intermediate in Computer Science (ICS)",
                inst: "Punjab Group of Colleges (PGC)",
                note: null,
              },
              {
                date: "2022",
                title: "Microsoft Office Management Certification",
                inst: "Career Institute",
                note: null,
              },
            ].map((e, i) => (
              <div
                key={i}
                className="flex gap-4 py-6 border-b"
                style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}
              >
                <div className="shrink-0 w-2.5 h-2.5 rounded-full mt-2.5 bg-[#E86D35]" />
                <div>
                  <p className="font-mono text-xs sm:text-sm font-semibold mb-1" style={{ color: dark ? "#94A3B8" : "#64748B" }}>{e.date}</p>
                  <h3 className="font-bold text-lg mb-0.5" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>{e.title}</h3>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">{e.inst}</p>
                  {e.note && <p className="text-sm" style={{ color: dark ? "#CBD5E1" : "#64748B" }}>{e.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 📬 Section 7: Contact ───────────────────────────── */}
      <section id="contact" style={{ backgroundColor: "#123B2D" }} className="py-16 text-white">
        <div className="max-w-[1360px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><MailIcon /></span>
            <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#E86D35]">07 / Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Initiate a conversation.</h2>
          <p className="text-base sm:text-lg mb-6 max-w-xl text-white/85">
            For tutoring inquiries, speech data roles, or technical collaborations, reach out directly.
          </p>

          <p
            lang="ur"
            dir="rtl"
            className="text-2xl sm:text-3xl text-right mb-8 text-emerald-200"
            style={{ fontFamily: '"Noto Nastaliq Urdu", serif' }}
          >
            آپ سے بات کرنے کا انتظار ہے۔
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={gmailComposeUrl("Portfolio Direct Contact")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-bold bg-[#E86D35] hover:bg-[#D05A22] text-white shadow-xl transition-all active:scale-95"
            >
              <span>Email Abdul</span>
              <ArrowUpRight size={16} />
            </a>

            <a
              href="https://linkedin.com/in/abdul-hanan-abrar-8b6a9140b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-bold border border-white/25 hover:bg-white/10 text-white transition-all"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Gmail (Direct)",
                value: "abdulhananabrar941@gmail.com",
                href: gmailComposeUrl("Direct Message"),
                external: true,
              },
              {
                label: "Phone / WhatsApp",
                value: "+92-326-1550100",
                href: "tel:+923261550100",
                external: false,
              },
              {
                label: "Location",
                value: "Faisalabad, Pakistan (PKT)",
                href: null,
                external: false,
              },
              {
                label: "Developer Portfolio",
                value: "abdul-hanan-abrar.github.io",
                href: "https://abdul-hanan-abrar.github.io/abdulhanan/#",
                external: true,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl p-5 bg-white/5 border border-white/10"
              >
                <p className="font-mono text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="text-sm font-bold text-white hover:text-[#E86D35] transition-colors break-all flex items-center gap-1.5"
                  >
                    <span>{c.value}</span>
                    {c.external && <ArrowUpRight size={13} />}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-white">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 🛡️ Footer ───────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: "#071711",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
        className="py-6"
      >
        <div className="max-w-[1360px] mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white/60 text-sm">
          <p>© 2026 Abdul Hanan. All rights reserved.</p>
          <a
            href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5 font-medium"
          >
            <span>Personal Site</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}
