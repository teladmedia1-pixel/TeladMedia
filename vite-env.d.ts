@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    color: #0B132B;
    background: #FFFFFF;
  }
  * { box-sizing: border-box; }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 px-7 py-3.5 bg-navy-900 text-white font-semibold text-sm rounded-lg
    transition-all duration-200 ease-out
    hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/20
    focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2;
  }
  .btn-secondary {
    @apply inline-flex items-center gap-2 px-7 py-3.5 border border-navy-900/20 text-navy-900 font-semibold text-sm rounded-lg
    transition-all duration-200 ease-out
    hover:border-navy-900/40 hover:bg-navy-900/5 hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2;
  }
  .section-tag {
    @apply inline-flex items-center gap-2 text-corporate-blue font-semibold text-xs tracking-widest uppercase;
  }
  .section-title {
    @apply font-display font-bold text-navy-900 leading-tight;
  }
  .card-base {
    @apply bg-white border border-surface-border rounded-xl p-8
    transition-all duration-300 ease-out
    hover:border-corporate-blue/30 hover:shadow-xl hover:shadow-navy-900/10 hover:-translate-y-1.5;
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
}

/* ─── Scroll-reveal helpers ─── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-left {
  opacity: 0;
  transform: translateX(-28px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-left.is-visible {
  opacity: 1;
  transform: translateX(0);
}
.reveal-scale {
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-scale.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* ─── Hero word highlight ─── */
.hero-highlight {
  position: relative;
  display: inline;
  white-space: nowrap;
}
.hero-highlight::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background: #3A86C8;
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.8s;
}
.hero-highlight.line-drawn::after {
  width: 100%;
}

/* ─── Animated counter ─── */
@keyframes countUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.count-in {
  animation: countUp 0.5s ease-out forwards;
}

/* ─── Floating blobs ─── */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(18px, -22px) scale(1.04); }
  66%       { transform: translate(-14px, 12px) scale(0.97); }
}
@keyframes float-mid {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-20px, -16px) scale(1.06); }
}
.blob-slow { animation: float-slow 14s ease-in-out infinite; }
.blob-mid  { animation: float-mid 10s ease-in-out infinite; }

/* ─── Shimmer on dark CTA ─── */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.btn-shimmer {
  background: linear-gradient(
    90deg,
    #0B132B 0%, #0B132B 40%,
    #3A86C8 50%,
    #0B132B 60%, #0B132B 100%
  );
  background-size: 200% auto;
  transition: background-position 0s;
}
.btn-shimmer:hover {
  animation: shimmer 1.2s linear infinite;
}

/* ─── Step line draw ─── */
@keyframes drawLine {
  from { width: 0; }
  to   { width: 100%; }
}
.line-draw {
  width: 0;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}
.line-draw.drawn { width: 100%; }

/* ─── Pulsing dot ─── */
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}
.pulse-ring::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: #3A86C8;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ─── Dot grid background ─── */
.dot-grid {
  background-image: radial-gradient(circle, #1C2541 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

/* ─── Number ticker ─── */
@keyframes ticker {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.ticker-in {
  animation: ticker 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #F8F9FA; }
::-webkit-scrollbar-thumb { background: #D0D8E4; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #9BACC0; }

/* ─── Stagger delay helpers ─── */
.delay-100 { transition-delay: 100ms !important; }
.delay-200 { transition-delay: 200ms !important; }
.delay-300 { transition-delay: 300ms !important; }
.delay-400 { transition-delay: 400ms !important; }
.delay-500 { transition-delay: 500ms !important; }
.delay-600 { transition-delay: 600ms !important; }
