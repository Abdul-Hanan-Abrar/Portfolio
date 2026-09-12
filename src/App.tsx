import { useState, useEffect, useCallback } from "react";
import portraitSrc from "@/imports/abdul-hanan-portrait.jpeg";

/* ─── 🎨 SVG Icon Helpers ───────────────────────────────────── */
const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const PersonIcon = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
const BookIcon = () => <Icon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />;
const WaveIcon = () => <Icon d="M2 12h2l3-7 3 14 3-9 3 4 2-2h4" />;
const DataIcon = () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />;
const TrendIcon = () => <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" />;
const GradCapIcon = () => <Icon d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3.33 1.67 5 1.67 6 1.67 1 0 2.67 0 6-1.67V12" />;
const MailIcon = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />;
const SunIcon = () => <Icon d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />;
const MoonIcon = () => <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
const HeadsetIcon = () => <Icon d="M3 18v-6a9 9 0 0 1 18 0v6M3 18a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5zM21 18a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />;
const SheetIcon = () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />;
const ChartIcon = () => <Icon d="M18 20V10M12 20V4M6 20v-6" />;
const ExternalIcon = () => <Icon d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" size={14} />;
const MenuIcon = () => <Icon d="M3 12h18M3 6h18M3 18h18" />;
const CloseIcon = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const GlobeIcon = () => <Icon d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10m0-20c-2.5 2.7-4 6.2-4 10s1.5 7.3 4 10m-8-10h16" />;
const LinkedInIcon = () => (
  <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);
const DownloadIcon = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />;

/* ─── 🧭 Nav Items Configuration ────────────────────────────── */
const NAV = [
  { label: "About", href: "#about", icon: <PersonIcon /> },
  { label: "Expertise", href: "#teaching", icon: <BookIcon /> },
  { label: "Voice Samples", href: "#voice", icon: <WaveIcon /> },
  { label: "AI Language Data", href: "#data", icon: <DataIcon /> },
  { label: "Experience", href: "#work", icon: <TrendIcon /> },
  { label: "Education", href: "#education", icon: <GradCapIcon /> },
  { label: "Contact", href: "#contact", icon: <MailIcon /> },
];

/* ─── 🎧 Voice Sample Files (From /public) ───────────────────── */
const VOICE_SAMPLES = [
  {
    n: "01",
    title: "Natural Conversational Urdu",
    desc: "Natural Urdu conversation with an easy, everyday rhythm.",
    src: "/Natural%20Conversational%20Urdu.m4a",
  },
  {
    n: "02",
    title: "Clear Urdu Reading & Natural Explanation",
    desc: "Clear Urdu reading paired with natural, easy-to-follow explanations.",
    src: "/Clear%20Urdu%20Reading%20%26%20Natural%20Explanation.m4a",
  },
  {
    n: "03",
    title: "Natural Urdu-English Communication",
    desc: "Natural bilingual communication bridging Urdu and English context.",
    src: "/Natural%20Urdu-English%20Communication.m4a",
  },
  {
    n: "04",
    title: "Careful Listening & Unclear Speech",
    desc: "Careful listening, accent decoding, and handling degraded speech.",
    src: "/Careful%20Listening%20%26%20Unclear%20Speech.m4a",
  },
];

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

  return (
    <div
      style={{
        backgroundColor: dark ? "#0A1712" : "#F6F3EC",
        color: dark ? "#F3F4F6" : "#1B2A24",
      }}
      className="min-h-screen transition-colors duration-300 font-sans"
    >
      {/* ── 📱 MOBILE LEFT DRAWER OVERLAY ──────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* ── 📱 MOBILE SLIDE-OUT DRAWER ─────────────────────── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: dark ? "#0D211A" : "#FFFFFF",
          borderRight: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB",
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <span className="font-bold text-lg tracking-tight" style={{ color: dark ? "#F3F4F6" : "#123B2D" }}>
              Abdul Hanan
            </span>
            <button
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300"
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
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[#E86D35]/10 text-gray-800 dark:text-gray-200"
              >
                <span style={{ color: "#E86D35" }}>{n.icon}</span>
                <span>{n.label}</span>
              </a>
            ))}

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

            <a
              href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold text-[#E86D35] bg-[#E86D35]/10 hover:bg-[#E86D35]/20"
            >
              <span className="flex items-center gap-2">
                <GlobeIcon /> Personal Website
              </span>
              <ExternalIcon />
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Theme</span>
          <button
            onClick={toggleDark}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E86D35]/15 text-[#E86D35]"
          >
            {dark ? <SunIcon /> : <MoonIcon />} {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* ── 📌 TOP HEADER ──────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
        style={{
          backgroundColor: dark ? "rgba(10,23,18,0.85)" : "rgba(246,243,236,0.92)",
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-16 gap-3">
          {/* Mobile Menu Button + Theme Toggle (Left Side) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-[#E86D35]/10"
            >
              <MenuIcon />
            </button>

            <button
              onClick={toggleDark}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-xl transition-all"
              style={{
                color: "#E86D35",
                backgroundColor: dark ? "rgba(232,109,53,0.15)" : "rgba(232,109,53,0.1)",
              }}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:text-[#E86D35] hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: dark ? "#E2E8F0" : "#1B2A24" }}
              >
                <span style={{ color: "#E86D35" }}>{n.icon}</span>
                <span>{n.label}</span>
              </a>
            ))}
          </nav>

          {/* Direct Connection Link to Personal Website */}
          <a
            href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-[#E86D35] text-[#E86D35] hover:bg-[#E86D35] hover:text-white transition-all shadow-sm"
          >
            <GlobeIcon />
            <span className="hidden sm:inline">Personal Site</span>
            <ExternalIcon />
          </a>
        </div>
      </header>

      {/* ── 🌟 HERO SECTION ─────────────────────────────────── */}
      <section
        id="about-hero"
        className="max-w-[1400px] mx-auto px-4 pt-12 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-center"
      >
        <div className="flex flex-col gap-5">
          <span className="text-xs font-bold tracking-widest uppercase font-mono" style={{ color: "#E86D35" }}>
            Urdu tutor · Language Data Support · Faisalabad, Pakistan
          </span>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.15]" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>
            Clear language.<br />
            <em className="not-italic" style={{ color: "#E86D35" }}>Careful data.</em><br />
            Human connection.
          </h1>

          <p className="text-lg leading-relaxed max-w-xl" style={{ color: dark ? "#CBD5E1" : "#4B5563" }}>
            I'm <strong>Abdul Hanan</strong>, a native Urdu speaker helping people learn with confidence and language teams build structured bilingual data.
          </p>

          <p lang="ur" dir="rtl" className="font-urdu text-2xl leading-loose text-right max-w-lg font-semibold" style={{ color: dark ? "#4ADE80" : "#1E5943" }}>
            السلام علیکم — زبان سیکھنے کا سفر خوشگوار ہو۔
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href={gmailComposeUrl("Urdu Tutoring or Language Data Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Let's work together via Gmail, opens in a new tab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 bg-[#E86D35] hover:bg-[#D05A22] text-white"
            >
              Let's work together ↗
            </a>

            <a
              href="/Abdul_Hanan_CV.pdf"
              download="Abdul_Hanan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border-2 transition-all active:scale-95"
              style={{
                borderColor: dark ? "#34D399" : "#123B2D",
                color: dark ? "#34D399" : "#123B2D",
              }}
            >
              <DownloadIcon /> Download CV ↓
            </a>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: "#22C55E" }} />
            <span className="text-sm font-semibold" style={{ color: dark ? "#94A3B8" : "#6B7280" }}>
              Available for remote roles &amp; contract collaborations
            </span>
          </div>
        </div>

        {/* Right Portrait */}
        <div className="flex flex-col items-center gap-4 lg:items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full scale-110 opacity-30 bg-[#E86D35] blur-md" />
            <div
              className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl border-4"
              style={{ borderColor: dark ? "#34D399" : "#123B2D" }}
            >
              <img src={portraitSrc} alt="Portrait of Abdul Hanan" className="w-full h-full object-cover object-top" />
            </div>
            <span
              className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: "#E86D35" }}
              aria-hidden="true"
            />
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>Abdul Hanan</p>
            <p className="text-sm font-medium mt-0.5" style={{ color: dark ? "#CBD5E1" : "#6B7280" }}>
              Urdu Tutor &amp; Language Data Support
            </p>
          </div>
        </div>
      </section>

      {/* ── 🏷️ ORANGE VALUE STRIP ───────────────────────────── */}
      <div style={{ backgroundColor: "#E86D35" }} className="py-5 px-4 shadow-inner">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-mono text-xs font-extrabold tracking-wider uppercase text-white/90">
            For Recruiters &amp; Language Teams
          </span>
          <span className="hidden sm:block text-white/40 mx-2">|</span>
          <span className="text-white font-medium text-base sm:text-lg">
            Practical mix of linguistic intuition, customer support rigor, and clean data engineering.
          </span>
        </div>
      </div>

      {/* ── 👤 SECTION 1: ABOUT ─────────────────────────────── */}
      <section id="about" className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><PersonIcon /></span>
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">01 / About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5" style={{ color: dark ? "#F9FAFB" : "#123B2D" }}>
              A thoughtful bridge between people and language.
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: dark ? "#CBD5E1" : "#4B5563" }}>
              Whether guiding a learner through authentic Urdu pronunciation or validating large bilingual datasets, I work patiently, accurately, and with cultural awareness in mind.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: dark ? "#CBD5E1" : "#4B5563" }}>
              My background encompasses customer operations, audio transcription rubrics, dataset labeling, and Python reporting automations.
            </p>
            <a
              href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#E86D35] hover:underline"
            >
              Visit personal project portfolio ↗
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {[
              { label: "Native", sub: "Urdu · C2 Level" },
              { label: "Fluent", sub: "Punjabi · Native Dialect" },
              { label: "Proficient", sub: "English · B2 Professional" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-2xl p-5 border shadow-sm transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: dark ? "#11261F" : "#FFFFFF",
                  borderColor: dark ? "rgba(255,255,255,0.08)" : "#E5E7EB",
                }}
              >
                <p className="text-2xl font-black" style={{ color: dark ? "#34D399" : "#123B2D" }}>{f.label}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: dark ? "#94A3B8" : "#6B7280" }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 📚 SECTION 2: TEACHING ──────────────────────────── */}
      <section
        id="teaching"
        className="py-16 transition-colors"
        style={{ backgroundColor: dark ? "#0D221A" : "#ECE8DE" }}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><BookIcon /></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">02 / Teaching &amp; Language</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8" style={{ color: dark ? "#F9FAFB" : "#123B2D" }}>
            Support tailored directly to how people learn.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { n: "01", title: "Conversation & Pronunciation", desc: "Interactive phonetics practice for natural rhythm, clear consonants, and authentic flow." },
              { n: "02", title: "Reading & Writing (Nastaliq)", desc: "Script breakdown, orthography, and sentence structure contextualized for modern usage." },
              { n: "03", title: "Dialect & Regional Nuance", desc: "Understanding the variations between formal literary registers and day-to-day spoken slang." },
            ].map((c) => (
              <div
                key={c.n}
                className="rounded-2xl p-6 border shadow-sm"
                style={{
                  backgroundColor: dark ? "#142F24" : "#FFFFFF",
                  borderColor: dark ? "rgba(255,255,255,0.08)" : "#E5E7EB",
                }}
              >
                <span className="font-mono text-3xl font-extrabold block mb-3 text-[#E86D35]">{c.n}</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: dark ? "#CBD5E1" : "#4B5563" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5 bg-[#123B2D] text-white shadow-lg">
            <div className="flex-1">
              <p lang="ur" dir="rtl" className="font-urdu text-2xl leading-loose text-right text-emerald-200 mb-1">
                یہ جملہ اردو میں ہے۔
              </p>
              <p className="text-lg font-semibold text-white">"This sentence is in Urdu."</p>
            </div>
            <p className="text-xs sm:border-l sm:pl-6 max-w-xs text-white/70 border-white/20">
              Clear visual alignment demonstrating script structure alongside English equivalents.
            </p>
          </div>
        </div>
      </section>

      {/* ── 🎙️ SECTION 3: VOICE SAMPLES (DIRECT AUDIO) ───────── */}
      <section id="voice" className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><WaveIcon /></span>
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">03 / Voice Samples</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: dark ? "#F9FAFB" : "#123B2D" }}>
              Hear the shape of Urdu.
            </h2>
            <p className="text-sm max-w-xl mt-2" style={{ color: dark ? "#CBD5E1" : "#4B5563" }}>
              Listen directly below to authentic voice recordings covering conversation, reading, and ambiguous audio handling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {VOICE_SAMPLES.map((v) => (
            <div
              key={v.n}
              className="rounded-2xl p-5 border flex flex-col justify-between gap-4 shadow-sm"
              style={{
                backgroundColor: dark ? "#11261F" : "#FFFFFF",
                borderColor: dark ? "rgba(255,255,255,0.08)" : "#E5E7EB",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#E86D35]">SAMPLE {v.n}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#E86D35]/15 text-[#E86D35] font-semibold">
                    .m4a Audio
                  </span>
                </div>
                <h3 className="font-bold text-base leading-snug mb-1.5" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>
                  {v.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: dark ? "#94A3B8" : "#6B7280" }}>
                  {v.desc}
                </p>
              </div>

              {/* Direct HTML5 Audio Player with Immediate Playback */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <audio
                  controls
                  preload="auto"
                  className="w-full h-10 accent-[#E86D35] rounded"
                  src={v.src}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 📊 SECTION 4: AI LANGUAGE DATA ──────────────────── */}
      <section id="data" style={{ backgroundColor: "#123B2D" }} className="py-16 text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><DataIcon /></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">04 / AI Language Data</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Language data that stays human-readable.</h2>
          <p className="text-base mb-8 max-w-2xl text-white/80">
            Specialized in AI language evaluation, phonetic transcriptions, prompt assessments, and dialect-specific labeling.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {[
              "Transcription Accuracy",
              "Phonetic Labeling",
              "Accent & Dialect Analysis",
              "Bilingual Evaluation",
              "Python Automation",
              "Spreadsheet Validation",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-[#E86D35]/50 bg-[#E86D35]/15 text-[#E86D35]"
              >
                {skill}
              </span>
            ))}
          </div>

          <a
            href={gmailComposeUrl("AI Language Data & Transcription Collaboration")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#E86D35] hover:bg-[#D05A22] text-white shadow-lg active:scale-95 transition-all"
          >
            Start a collaboration in Gmail ↗
          </a>
        </div>
      </section>

      {/* ── 💼 SECTION 5: EXPERIENCE ────────────────────────── */}
      <section id="work" className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><TrendIcon /></span>
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">05 / Experience &amp; Projects</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10" style={{ color: dark ? "#F9FAFB" : "#123B2D" }}>
          Reliable execution behind the scenes.
        </h2>

        <div className="flex flex-col">
          {[
            {
              icon: <HeadsetIcon />,
              eyebrow: "Customer Operations & Support",
              title: "Aptly Pharmaceuticals",
              desc: "Delivered bilingual customer support and quality inventory handling, sustaining a verified 92% CSAT rate.",
            },
            {
              icon: <SheetIcon />,
              eyebrow: "Data Engineering Project",
              title: "12-Sheet Validation Automation",
              desc: "Engineered automated validation formulas that slashed manual data-entry errors by more than 50%.",
            },
            {
              icon: <ChartIcon />,
              eyebrow: "Workflow Automation",
              title: "Reporting Pipeline Optimization",
              desc: "Automated recurring reporting workflows using Python scripts, resolving critical DD/MM vs MM/DD date mismatch issues.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-5 py-6 border-b transition-colors"
              style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#E5E7EB" }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-[#E86D35]"
                style={{ backgroundColor: dark ? "rgba(232,109,53,0.15)" : "rgba(232,109,53,0.1)" }}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-mono text-xs font-bold mb-1 text-[#E86D35]">{item.eyebrow}</p>
                <h3 className="font-bold text-lg mb-1" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: dark ? "#CBD5E1" : "#4B5563" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 🎓 SECTION 6: EDUCATION ─────────────────────────── */}
      <section
        id="education"
        className="py-16 transition-colors"
        style={{ backgroundColor: dark ? "#0D221A" : "#ECE8DE" }}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><GradCapIcon /></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">06 / Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10" style={{ color: dark ? "#F9FAFB" : "#123B2D" }}>
            Academic grounding &amp; certifications.
          </h2>

          <div className="flex flex-col max-w-2xl">
            {[
              {
                date: "Sep 2024 — Expected 2028",
                title: "BSc Computer Science",
                inst: "University of Agriculture, Faisalabad (UAF)",
                note: "Core Focus: Data Structures, Database Management Systems, Software Engineering",
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
                className="flex gap-5 py-6 border-b"
                style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#D1D5DB" }}
              >
                <div className="shrink-0 w-2.5 h-2.5 rounded-full mt-2 bg-[#E86D35]" />
                <div>
                  <p className="font-mono text-xs mb-1" style={{ color: dark ? "#94A3B8" : "#6B7280" }}>{e.date}</p>
                  <h3 className="font-bold text-lg mb-0.5" style={{ color: dark ? "#FFFFFF" : "#123B2D" }}>{e.title}</h3>
                  <p className="text-sm font-semibold text-[#1E5943] dark:text-[#34D399] mb-1">{e.inst}</p>
                  {e.note && <p className="text-xs" style={{ color: dark ? "#94A3B8" : "#6B7280" }}>{e.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 📬 SECTION 7: CONTACT ───────────────────────────── */}
      <section id="contact" style={{ backgroundColor: "#123B2D" }} className="py-20 text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><MailIcon /></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#E86D35]">07 / Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Let's make language work better.</h2>
          <p className="text-base mb-2 max-w-xl text-white/80">
            For tutoring bookings, remote AI language evaluation roles, or technical project queries, drop a direct email.
          </p>

          <p lang="ur" dir="rtl" className="font-urdu text-2xl leading-loose text-right mb-8 text-emerald-200">
            آپ سے بات کرنے کا انتظار ہے
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            {/* Primary Email Launch Button */}
            <a
              href={gmailComposeUrl("Portfolio Inquiry - Collaboration Request")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Abdul via Gmail in a new tab"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#E86D35] hover:bg-[#D05A22] text-white shadow-xl active:scale-95 transition-all"
            >
              Email Abdul in Gmail ↗
            </a>

            <a
              href="https://linkedin.com/in/abdul-hanan-abrar-8b6a9140b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border border-white/30 hover:bg-white/10 text-white transition-all"
            >
              <LinkedInIcon /> LinkedIn Profile ↗
            </a>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Direct Gmail",
                value: "abdulhananabrar941@gmail.com",
                href: gmailComposeUrl("Direct Inquiry"),
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
                value: "Faisalabad, Pakistan (PKT / UTC+5)",
                href: null,
                external: false,
              },
              {
                label: "Project Portal",
                value: "abdul-hanan-abrar.github.io",
                href: "https://abdul-hanan-abrar.github.io/abdulhanan/#",
                external: true,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-[#E86D35]/50 transition-colors"
              >
                <p className="font-mono text-xs text-white/50 mb-1">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="text-sm font-semibold text-white hover:text-[#E86D35] transition-colors break-all flex items-center gap-1"
                  >
                    <span>{c.value}</span>
                    {c.external && <ExternalIcon />}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-white">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 🛡️ FOOTER ───────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: "#081A14",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
        className="py-6"
      >
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white/50 text-xs">
          <p>© 2026 Abdul Hanan. All rights reserved.</p>
          <a
            href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Personal Website Link ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
