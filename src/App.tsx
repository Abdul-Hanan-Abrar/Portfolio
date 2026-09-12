import { useState, useEffect, useCallback } from "react";
import portraitSrc from "@/imports/abdul-hanan-portrait.jpeg";

/* ─── SVG icon helpers ──────────────────────────────────────── */
const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
const LinkedInIcon = () => (
  <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);
const DownloadIcon = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />;

/* ─── Nav items ─────────────────────────────────────────────── */
const NAV = [
  { label: "About", href: "#about", icon: <PersonIcon /> },
  { label: "Expertise", href: "#teaching", icon: <BookIcon /> },
  { label: "Voice Samples", href: "#voice", icon: <WaveIcon /> },
  { label: "AI Language Data", href: "#data", icon: <DataIcon /> },
  { label: "Experience", href: "#work", icon: <TrendIcon /> },
  { label: "Education", href: "#education", icon: <GradCapIcon /> },
  { label: "Contact", href: "#contact", icon: <MailIcon /> },
];

export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = useCallback(() => setDark(d => !d), []);

  return (
    <div style={{ backgroundColor: "var(--bg-paper)", color: "var(--dark-text)" }} className="min-h-screen">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header style={{ borderBottomColor: "var(--border-color)" }}
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        aria-label="Main navigation">
        <div style={{ backgroundColor: dark ? "rgba(15,31,24,0.88)" : "rgba(246,243,236,0.88)" }}
          className="max-w-[1400px] mx-auto px-4 flex items-center h-14 gap-3">

          {/* Theme toggle — left side */}
          <button
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className="shrink-0 p-2 rounded-full transition-colors"
            style={{ color: "#E86D35", backgroundColor: dark ? "rgba(232,109,53,0.12)" : "rgba(232,109,53,0.1)" }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Vertical separator */}
          <span className="shrink-0 h-6 w-px" style={{ backgroundColor: "var(--border-color)" }} aria-hidden="true" />

          {/* Nav links */}
          <nav className="flex items-center overflow-x-auto scrollbar-none flex-1 min-w-0" aria-label="Sections">
            {NAV.map((n, i) => (
              <div key={n.href} className="flex items-center shrink-0">
                <a href={n.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:opacity-70"
                  style={{ color: "var(--dark-text)" }}>
                  <span style={{ color: "#E86D35" }}>{n.icon}</span>
                  <span>{n.label}</span>
                </a>
                {i < NAV.length - 1 && (
                  <span className="h-4 w-px shrink-0" style={{ backgroundColor: "var(--border-color)" }} aria-hidden="true" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section id="about-hero" className="max-w-[1400px] mx-auto px-4 pt-10 pb-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

        {/* Left */}
        <div className="flex flex-col gap-5">
          <span className="font-mono-dm text-xs font-medium tracking-widest uppercase"
            style={{ color: "#E86D35" }}>
            Urdu tutor · language data support · Faisalabad, Pakistan
          </span>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1]"
            style={{ color: "var(--dark-text)" }}>
            Clear language.<br />
            <em className="font-display not-italic" style={{ color: "#E86D35", fontStyle: "italic" }}>Careful data.</em><br />
            Human connection.
          </h1>

          <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--muted-text)" }}>
            I'm Abdul Hanan (they/them), a native Urdu speaker helping people learn with confidence and helping language teams build better bilingual data.
          </p>

          <p lang="ur" dir="rtl" className="font-urdu text-2xl leading-loose text-right max-w-lg"
            style={{ color: "var(--green-secondary, #1E5943)" }}>
            السلام علیکم — زبان سیکھنے کا سفر خوشگوار ہو۔
          </p>

          <div className="flex flex-wrap gap-3 mt-1">
            <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=abdulhananabrar941@gmail.com&su=Urdu%20tutoring%20or%20language%20data%20collaboration"
              target="_blank" rel="noopener noreferrer"
              aria-label="Let's work together via Gmail, opens in a new tab"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95"
              style={{ backgroundColor: "#E86D35", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#D05A22")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#E86D35")}>
              Let's work together ↗
            </a>

            <a href="/Abdul_Hanan_CV.pdf" download="Abdul_Hanan_CV.pdf"
              target="_blank" rel="noopener noreferrer"
              aria-label="Download CV as PDF"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 border-2"
              style={{ borderColor: "#123B2D", color: "#123B2D", backgroundColor: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#123B2D"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#123B2D"; }}>
              <DownloadIcon /> Download CV ↓
            </a>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4CAF50" }} />
            <span className="text-sm font-medium" style={{ color: "var(--muted-text)" }}>Available for remote opportunities</span>
          </div>
        </div>

        {/* Right — Portrait */}
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full scale-110 opacity-20"
              style={{ backgroundColor: "#1E5943" }} />
            {/* Circular portrait */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-xl border-4"
              style={{ borderColor: "#123B2D" }}>
              <img src={portraitSrc} alt="Portrait of Abdul Hanan"
                className="w-full h-full object-cover object-top" />
            </div>
            {/* Orange accent dot */}
            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: "#E86D35" }} aria-hidden="true" />
          </div>
          <div className="text-center lg:text-left">
            <p className="text-xl font-bold" style={{ color: "var(--dark-text)" }}>Abdul Hanan</p>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>they/them · Urdu tutor &amp; language data support</p>
          </div>
        </div>
      </section>

      {/* ── ORANGE BAND ─────────────────────────────────────── */}
      <div style={{ backgroundColor: "#E86D35" }} className="py-5 px-4">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase text-white opacity-80">
            For recruiters &amp; language teams
          </span>
          <span className="hidden sm:block text-white opacity-50 mx-3">—</span>
          <span className="text-white font-medium text-base sm:text-lg leading-snug">
            I bring a practical mix of language sensitivity, customer support discipline and structured data work.
          </span>
        </div>
      </div>

      {/* ── SECTION 1: ABOUT ────────────────────────────────── */}
      <section id="about" className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-6 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><PersonIcon /></span>
          <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>01 / About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: "var(--dark-text)" }}>
              A thoughtful bridge between people and language.
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted-text)" }}>
              Whether I'm guiding a learner through Urdu pronunciation or checking a bilingual data set, I work patiently, precisely and with context in mind.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted-text)" }}>
              My experience spans bilingual customer support, transcription accuracy, data labelling and reporting workflows. I notice the details that affect meaning: an accent, a dialect, a date format, or the difference between a useful record and a confusing one.
            </p>
            <a href="https://abdul-hanan-abrar.github.io/abdulhanan/#"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#E86D35" }}>
              Visit personal website ↗
            </a>
          </div>

          {/* Language facts */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {[
              { label: "Native", sub: "Urdu · C2" },
              { label: "Fluent", sub: "Punjabi" },
              { label: "B2", sub: "English" },
            ].map(f => (
              <div key={f.label} className="rounded-2xl p-4 border"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <p className="text-2xl font-bold" style={{ color: "#123B2D" }}>{f.label}</p>
                <p className="text-sm mt-0.5" style={{ color: "var(--muted-text)" }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TEACHING ─────────────────────────────── */}
      <section id="teaching" style={{ backgroundColor: "var(--bg-green-soft)" }} className="py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-6 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><BookIcon /></span>
            <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>02 / Teaching &amp; language</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: "var(--dark-text)" }}>
            Support that meets learners where they are.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { n: "01", title: "Conversation & pronunciation", desc: "Patient practice for natural Urdu conversation, clear sounds and confident speaking." },
              { n: "02", title: "Reading & writing", desc: "Support across reading, writing, listening and speaking, with attention to script and context." },
              { n: "03", title: "Dialect awareness", desc: "Respectful language guidance that keeps accent, region and audience in view." },
            ].map(c => (
              <div key={c.n} className="rounded-2xl p-5 border"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <span className="font-mono-dm text-3xl font-bold block mb-3" style={{ color: "#E86D35" }}>{c.n}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--dark-text)" }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-text)" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Bilingual example panel */}
          <div className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{ backgroundColor: "#123B2D" }}>
            <div className="flex-1">
              <p lang="ur" dir="rtl" className="font-urdu text-2xl leading-loose text-right text-white mb-1">
                یہ جملہ اردو میں ہے۔
              </p>
              <p className="text-[18px] font-semibold text-white">"This sentence is in Urdu."</p>
            </div>
            <p className="text-[13px] sm:border-l sm:pl-6 max-w-xs"
              style={{ color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.15)" }}>
              A small example of bilingual context-setting.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VOICE SAMPLES ────────────────────────── */}
      <section id="voice" className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-4 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><WaveIcon /></span>
          <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>03 / Voice samples</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--dark-text)" }}>Hear the shape of Urdu.</h2>
          <p className="text-sm max-w-md" style={{ color: "var(--muted-text)" }}>
            Listen to four examples of Abdul's Urdu communication, reading, bilingual explanation and careful handling of unclear speech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { n: "01", title: "Natural Conversational Urdu", desc: "Natural Urdu conversation with an easy, everyday rhythm.", url: "https://drive.google.com/file/d/1HwU5rnsZRMyuXdO0r0dKWlIb9KCyvkWS/view?usp=sharing" },
            { n: "02", title: "Clear Urdu Reading & Natural Explanation", desc: "Clear Urdu reading paired with natural, easy-to-follow explanations.", url: "https://drive.google.com/file/d/1YlZW5jY3IEz7WI2gNKZWMHBNwzNxcZjw/view?usp=sharing" },
            { n: "03", title: "Natural Urdu-English Communication", desc: "Natural bilingual communication across Urdu and English.", url: "https://drive.google.com/file/d/1zc2Ueipl-LcaeeI5lsYRUM3g10GxI4jY/view?usp=sharing" },
            { n: "04", title: "Careful Listening & Unclear Speech", desc: "Careful listening and patient handling of unclear speech.", url: "https://drive.google.com/file/d/1xaWRPu_hNAr6GAn24vOTx7MrSE0mNXz8/view?usp=sharing" },
          ].map(v => (
            <div key={v.n} className="rounded-2xl p-5 border flex flex-col gap-3"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: "#E86D35" }}><WaveIcon /></span>
                <span className="font-mono-dm text-xs font-medium" style={{ color: "var(--muted-text)" }}>Sample {v.n}</span>
              </div>
              <h3 className="font-bold text-sm leading-snug" style={{ color: "var(--dark-text)" }}>{v.title}</h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--muted-text)" }}>{v.desc}</p>
              <a href={v.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70 mt-auto"
                style={{ color: "#E86D35" }}>
                Listen to sample ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: AI LANGUAGE DATA ─────────────────────── */}
      <section id="data" style={{ backgroundColor: "#123B2D" }} className="py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><DataIcon /></span>
            <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>04 / AI language data</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Language data that stays human-readable.</h2>
          <p className="text-base mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
            I can support language-data workflows where accuracy, consistency and cultural context matter.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {["Transcription accuracy", "Careful data labelling", "Accent & dialect awareness", "Bilingual support", "Python / openpyxl", "Advanced Excel"].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full text-sm font-medium border"
                style={{ borderColor: "rgba(232,109,53,0.5)", color: "#E86D35", backgroundColor: "rgba(232,109,53,0.08)" }}>
                {s}
              </span>
            ))}
          </div>

          <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
            Interested in annotation, evaluation or bilingual support work?
          </p>
          <a href="mailto:abdulhananabrar941@gmail.com?subject=Language%20data%20collaboration"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95"
            style={{ backgroundColor: "#E86D35", color: "#fff" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#D05A22")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#E86D35")}>
            Start a conversation ↗
          </a>
        </div>
      </section>

      {/* ── SECTION 5: EXPERIENCE & PROJECTS ───────────────── */}
      <section id="work" className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="mb-6 flex items-center gap-2">
          <span style={{ color: "#E86D35" }}><TrendIcon /></span>
          <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>05 / Experience &amp; projects</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={{ color: "var(--dark-text)" }}>Reliable work behind the scenes.</h2>

        <div className="flex flex-col gap-0">
          {[
            {
              icon: <HeadsetIcon />,
              eyebrow: "Customer support",
              title: "Aptly Pharmaceuticals",
              desc: "Bilingual customer support and quality-focused inventory work, including a reported 92% CSAT.",
            },
            {
              icon: <SheetIcon />,
              eyebrow: "Selected project",
              title: "12-sheet validation workbook",
              desc: "Built a structured workbook that cut data-entry errors by half.",
            },
            {
              icon: <ChartIcon />,
              eyebrow: "Selected project",
              title: "Reporting automation",
              desc: "Automated reporting workflows, reducing errors close to zero, and fixed a DD/MM vs MM/DD data-quality issue.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-5 py-7 border-b"
              style={{ borderColor: "var(--border-color)" }}>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(232,109,53,0.1)", color: "#E86D35" }}>
                {item.icon}
              </div>
              <div>
                <p className="font-mono-dm text-xs font-medium mb-1" style={{ color: "#E86D35" }}>{item.eyebrow}</p>
                <h3 className="font-bold text-lg mb-1.5" style={{ color: "var(--dark-text)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-text)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: EDUCATION ────────────────────────────── */}
      <section id="education" style={{ backgroundColor: "var(--bg-green-soft)" }} className="py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-6 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><GradCapIcon /></span>
            <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>06 / Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={{ color: "var(--dark-text)" }}>Always learning, always refining.</h2>

          <div className="flex flex-col gap-0 max-w-2xl">
            {[
              {
                date: "Sep 2024 — Expected 2028",
                title: "BSc Computer Science",
                inst: "University of Agriculture, Faisalabad (UAF)",
                note: "Coursework: Data Structures, Database Systems, Software Engineering",
              },
              {
                date: "2022 — 2024",
                title: "Intermediate in Computer Science",
                inst: "Punjab Group of Colleges (PGC)",
                note: null,
              },
              {
                date: "2022",
                title: "Microsoft Office Management",
                inst: "Certification",
                note: null,
              },
            ].map((e, i) => (
              <div key={i} className="flex gap-6 py-7 border-b" style={{ borderColor: "var(--border-color)" }}>
                <div className="shrink-0 w-2 h-2 rounded-full mt-2.5" style={{ backgroundColor: "#E86D35" }} />
                <div>
                  <p className="font-mono-dm text-xs mb-1.5" style={{ color: "var(--muted-text)" }}>{e.date}</p>
                  <h3 className="font-bold text-lg mb-0.5" style={{ color: "var(--dark-text)" }}>{e.title}</h3>
                  <p className="text-sm font-medium mb-1" style={{ color: "#1E5943" }}>{e.inst}</p>
                  {e.note && <p className="text-xs" style={{ color: "var(--muted-text)" }}>{e.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CONTACT ──────────────────────────────── */}
      <section id="contact" style={{ backgroundColor: "#123B2D" }} className="py-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-4 flex items-center gap-2">
            <span style={{ color: "#E86D35" }}><MailIcon /></span>
            <span className="font-mono-dm text-xs font-semibold tracking-widest uppercase" style={{ color: "#E86D35" }}>07 / Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Let's make language work better.</h2>
          <p className="text-base mb-4 max-w-xl" style={{ color: "rgba(255,255,255,0.7)" }}>
            For Urdu tutoring roles, remote language-data collaborations or recruiter enquiries, email is the best way to reach me.
          </p>
          <p lang="ur" dir="rtl" className="font-urdu text-2xl leading-loose text-right mb-8"
            style={{ color: "rgba(255,255,255,0.75)" }}>
            آپ سے بات کرنے کا انتظار ہے
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=abdulhananabrar@gmail.com"
              target="_blank" rel="noopener noreferrer"
              aria-label="Email Abdul via Gmail, opens in a new tab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all active:scale-95"
              style={{ backgroundColor: "#E86D35", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#D05A22")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#E86D35")}>
              Email Abdul ↗
            </a>
            <a href="https://linkedin.com/in/abdul-hanan-abrar-8b6a9140b"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
              <LinkedInIcon /> LinkedIn profile ↗
            </a>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Email", value: "abdulhananabrar@gmail.com", href: "mailto:abdulhananabrar@gmail.com" },
              { label: "Phone", value: "+92-326-1550100", href: "tel:+923261550100" },
              { label: "Location", value: "Faisalabad, Pakistan · Remote", href: null },
            ].map(c => (
              <div key={c.label} className="rounded-2xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="font-mono-dm text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</p>
                {c.href
                  ? <a href={c.href} className="text-sm font-medium text-white hover:text-orange-400 transition-colors break-all">{c.value}</a>
                  : <p className="text-sm font-medium text-white">{c.value}</p>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#0D2C22", borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-6">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>© 2026 Abdul Hanan</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Built with clarity &amp; care</p>
        </div>
      </footer>
    </div>
  );
}
