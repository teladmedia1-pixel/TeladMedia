import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calendar,
  ChevronRight,
  Users,
  ClipboardList,
  Headphones,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Settings,
  Quote,
  Menu,
  X,
  Clock,
  Target,
  BarChart3,
  RefreshCw,
  Facebook,
  Instagram,
  Linkedin,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/teladmedia1';

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* <!-- INSERT TELAD MEDIA LOGO HERE --> */}
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 28L12 0L24 28H0Z" fill={dark ? '#0B132B' : '#FFFFFF'} />
        <path d="M14 28L24 6L34 28H14Z" fill="#3A86C8" fillOpacity={dark ? 1 : 0.9} />
      </svg>
      <span className={`font-display font-bold text-xl tracking-tight ${dark ? 'text-navy-900' : 'text-white'}`}>
        Telad<span style={{ color: '#3A86C8' }}>Media</span>
      </span>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Choose Us', href: '#why-us' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-surface-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="#" aria-label="Telad Media home" className="transition-transform duration-200 hover:scale-[1.02]">
          <Logo dark />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-secondary hover:text-navy-900 transition-colors duration-150 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-corporate-blue rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-shimmer text-sm"
          >
            Book a Strategy Call
            <Calendar size={15} />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-navy-900 hover:text-corporate-blue transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`md:hidden bg-white border-b border-surface-border px-6 overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 pt-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-text-secondary hover:text-navy-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full justify-center mt-2"
          >
            Book a Strategy Call
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 80);
    const t2 = setTimeout(() => {
      highlightRef.current?.classList.add('line-drawn');
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative pt-32 pb-28 lg:pt-44 lg:pb-36 bg-white overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="blob-slow absolute top-[-10%] right-[-8%] w-[640px] h-[640px] rounded-full bg-corporate-blue/5 blur-3xl" />
        <div className="blob-mid absolute bottom-[-15%] left-[-10%] w-[480px] h-[480px] rounded-full bg-navy-900/4 blur-3xl" />
        <div className="blob-slow absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-corporate-blue/6 blur-2xl" style={{ animationDelay: '4s' }} />
      </div>

      {/* Dot grid accent top-right */}
      <div className="dot-grid absolute top-0 right-0 w-72 h-72 opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-corporate-blue/20 bg-corporate-blue/5
              transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-corporate-blue/60" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-corporate-blue" />
            </span>
            <span className="text-corporate-blue font-semibold text-xs tracking-widest uppercase">
              Sales &amp; Operations Support Partner
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-bold text-5xl lg:text-6xl xl:text-7xl text-navy-900 leading-[1.05] mb-7 text-balance
              transition-all duration-800 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Build Your{' '}
            <span ref={highlightRef} className="hero-highlight text-corporate-blue">
              Sales Pipeline
            </span>
            {' '}Without Building a Bigger Team
          </h1>

          {/* Subhead */}
          <p
            className={`text-lg lg:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl
              transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            Telad Media provides trained appointment setters, sales support specialists, and virtual
            assistants that help businesses create more opportunities and improve operations.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-4
              transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-shimmer text-base px-8 py-4 group"
            >
              Book a Strategy Call
              <Calendar size={17} className="transition-transform duration-200 group-hover:rotate-12" />
            </a>
            <a href="#services" className="btn-secondary text-base px-8 py-4 group">
              View Services
              <ChevronRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Floating stat cards */}
        <div
          className={`hidden lg:flex gap-5 mt-20 transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { val: '4+', sub: 'Years of Experience' },
            { val: '20+', sub: 'Trained Professionals' },
            { val: '∞', sub: 'Industries Served' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4 bg-white border border-surface-border rounded-xl shadow-sm
                transition-all duration-200 hover:border-corporate-blue/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="font-display font-bold text-2xl text-navy-900">{s.val}</span>
              <span className="text-text-muted text-sm leading-snug max-w-[90px]">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

function StatCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const { ref, visible } = useReveal(0.5);
  const count = useCounter(target, 1600, visible);
  return (
    <span ref={ref} className="font-display font-bold text-4xl lg:text-5xl text-navy-900">
      {prefix}{count}{suffix}
    </span>
  );
}

function Metrics() {
  const { ref, visible } = useReveal();

  const stats = [
    { label: 'Years Experience', sub: 'Proven track record', display: <StatCounter target={4} suffix="+" /> },
    { label: 'Team Members', sub: 'Trained professionals', display: <StatCounter target={20} suffix="+" /> },
    { label: 'Industries Served', sub: 'Cross-sector expertise', display: <span className="font-display font-bold text-4xl lg:text-5xl text-navy-900">Multiple</span> },
  ];

  return (
    <section className="border-y border-surface-border bg-white">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-3
          transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center px-8 py-6 transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-surface-border' : ''}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {s.display}
            <span className="font-semibold text-navy-800 text-base mt-2 mb-1">{s.label}</span>
            <span className="text-text-muted text-sm">{s.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Problem ─────────────────────────────────────────────────────────────────

function Problem() {
  const { ref, visible } = useReveal();

  const pains = [
    {
      icon: <Target size={22} className="text-corporate-blue" />,
      title: 'Leads Slipping Through the Cracks',
      desc: 'Opportunities are lost when follow-up is inconsistent and response times are slow.',
    },
    {
      icon: <RefreshCw size={22} className="text-corporate-blue" />,
      title: 'Inconsistent Sales Follow-Up',
      desc: 'Sales teams stretched thin miss critical touchpoints in the pipeline.',
    },
    {
      icon: <Clock size={22} className="text-corporate-blue" />,
      title: 'Repetitive Tasks Consuming Time',
      desc: 'High-value team members are tied up on administrative and operational work.',
    },
    {
      icon: <Users size={22} className="text-corporate-blue" />,
      title: 'Hiring & Training Takes Too Long',
      desc: 'Building an in-house team is slow, costly, and diverts focus from core strategy.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface-gray" id="problems">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref}>
          <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag mb-4">
              <span className="w-4 h-px bg-corporate-blue" />
              The Challenge
            </div>
            <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl text-balance">
              Your Growth Shouldn't Depend on Doing Everything Yourself
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pains.map((p, i) => (
              <div
                key={i}
                className={`card-base group transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-corporate-blue/8 flex items-center justify-center mb-5
                  group-hover:bg-corporate-blue/15 group-hover:scale-110 transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-base mb-3 leading-snug">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  const { ref, visible } = useReveal();

  const services = [
    {
      icon: <Calendar size={24} className="text-corporate-blue" />,
      title: 'Appointment Setting',
      desc: 'We help businesses turn cold and warm leads into qualified conversations through structured outreach and follow-up protocols.',
      detail: 'Outbound calling · Lead qualification · Calendar management',
    },
    {
      icon: <BarChart3 size={24} className="text-corporate-blue" />,
      title: 'Sales Support',
      desc: 'Pipeline management, CRM updates, follow-ups, and sales assistance to keep your revenue engine running.',
      detail: 'CRM management · Pipeline tracking · Follow-up sequences',
    },
    {
      icon: <Briefcase size={24} className="text-corporate-blue" />,
      title: 'Virtual Assistance',
      desc: 'Reliable operational support to handle repetitive business tasks, freeing your team to focus on higher-value work.',
      detail: 'Admin support · Data entry · Research & reporting',
    },
    {
      icon: <Headphones size={24} className="text-corporate-blue" />,
      title: 'Customer Support',
      desc: 'Professional customer communication and support solutions that represent your brand with precision and care.',
      detail: 'Inbound support · Ticket management · Satisfaction tracking',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref}>
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6
            transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-xl">
              <div className="section-tag mb-4">
                <span className="w-4 h-px bg-corporate-blue" />
                Our Services
              </div>
              <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl text-balance">
                Tailored Operational &amp; Sales Support
              </h2>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary self-start lg:self-auto shrink-0 group"
            >
              Discuss Your Needs
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className={`group relative bg-white border border-surface-border rounded-2xl p-8 lg:p-10 overflow-hidden
                  transition-all duration-500 hover:border-corporate-blue/30 hover:shadow-2xl hover:shadow-navy-900/8 hover:-translate-y-1.5 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-corporate-blue/0 via-corporate-blue to-corporate-blue/0
                  rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/0 to-corporate-blue/0
                  group-hover:from-corporate-blue/3 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-corporate-blue/8 flex items-center justify-center mb-6
                    group-hover:bg-corporate-blue/15 group-hover:scale-110 transition-all duration-300">
                    {s.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy-900 mb-3">{s.title}</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-5">{s.desc}</p>
                  <p className="text-text-muted text-xs font-medium tracking-wide">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyUs() {
  const { ref, visible } = useReveal();

  const pillars = [
    {
      icon: <Users size={22} className="text-corporate-blue" />,
      title: 'Experienced Sales Professionals',
      desc: 'Our team is trained in modern sales methodology, objection handling, and professional communication — ready to represent your brand.',
    },
    {
      icon: <Target size={22} className="text-corporate-blue" />,
      title: 'Dedicated Appointment Setting Teams',
      desc: 'Focused teams built around your goals, not shared across competing accounts. Your pipeline gets our full attention.',
    },
    {
      icon: <Settings size={22} className="text-corporate-blue" />,
      title: 'Flexible Support Solutions',
      desc: 'Whether you need one specialist or an entire support unit, we scale up or down to match your operational rhythm.',
    },
    {
      icon: <ClipboardList size={22} className="text-corporate-blue" />,
      title: 'Process-Driven Execution',
      desc: 'We operate on clearly defined workflows with KPIs, reporting, and accountability built into every engagement.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-navy-900 relative overflow-hidden" id="why-us">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob-slow absolute top-0 left-1/2 w-[900px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corporate-blue/7 blur-3xl" />
        <div className="blob-mid absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-corporate-blue/5 blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="dot-grid absolute inset-0 opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref}>
          <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag mb-4 text-corporate-blue">
              <span className="w-4 h-px bg-corporate-blue" />
              Why Businesses Choose Us
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-white leading-tight text-balance">
              Built for Reliable, Scalable Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <div
                key={i}
                className={`group bg-white/5 border border-white/10 rounded-xl p-8
                  transition-all duration-500 hover:bg-white/9 hover:border-corporate-blue/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-corporate-blue/10 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-lg bg-corporate-blue/15 flex items-center justify-center shrink-0
                    group-hover:bg-corporate-blue/30 group-hover:scale-110 transition-all duration-300">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base mb-2">{p.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const { ref, visible } = useReveal(0.1);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && lineRef.current) {
      lineRef.current.classList.add('drawn');
    }
  }, [visible]);

  const steps = [
    {
      number: '01',
      title: 'Understand Your Business',
      desc: 'We begin with a strategic discovery session to understand your goals, target audience, sales process, and operational gaps.',
      icon: <Zap size={20} className="text-corporate-blue" />,
    },
    {
      number: '02',
      title: 'Build Your Support Process',
      desc: 'We design a custom operational framework — scripts, sequences, CRM workflows, and team structures — tailored to you.',
      icon: <Settings size={20} className="text-corporate-blue" />,
    },
    {
      number: '03',
      title: 'Scale Your Operations',
      desc: 'With a proven foundation in place, we scale execution, measure results, and continuously optimize for maximum performance.',
      icon: <TrendingUp size={20} className="text-corporate-blue" />,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface-gray" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref}>
          <div className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag mb-4 justify-center">
              <span className="w-4 h-px bg-corporate-blue" />
              How It Works
            </div>
            <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl text-balance">
              A Seamless Partnership
            </h2>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Animated connecting line */}
            <div className="hidden lg:block absolute top-11 left-[calc(16.66%+48px)] right-[calc(16.66%+48px)] h-px bg-surface-border overflow-hidden">
              <div ref={lineRef} className="line-draw h-full bg-corporate-blue/60" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center transition-all duration-700 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Circle */}
                  <div className="relative mb-8 group">
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-surface-border flex flex-col items-center justify-center shadow-sm
                      transition-all duration-300 group-hover:border-corporate-blue/50 group-hover:shadow-md group-hover:shadow-corporate-blue/10 group-hover:scale-105">
                      <span className="font-display font-bold text-2xl text-navy-900">{s.number}</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-corporate-blue/10 flex items-center justify-center mb-4
                    transition-all duration-300 hover:bg-corporate-blue/20 hover:scale-110">
                    {s.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy-900 mb-3">{s.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const { ref, visible } = useReveal();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const testimonials = [
    {
      quote: 'Telad Media completely transformed how we handle appointment setting. The team understood our process quickly and started delivering qualified conversations within the first two weeks.',
      name: 'Sarah M.',
      role: 'Head of Sales',
      company: 'B2B Technology Firm',
      result: '40% increase in qualified meetings',
    },
    {
      quote: 'The level of professionalism from the Telad team is outstanding. They operate like an extension of our internal team — not an external vendor. Our pipeline has never been more organized.',
      name: 'James R.',
      role: 'Chief Revenue Officer',
      company: 'Professional Services Company',
      result: 'Consistent 3x pipeline growth',
    },
    {
      quote: "We were skeptical about outsourcing sales support, but Telad made the transition seamless. Their process-driven approach gave us visibility and control we didn't have before.",
      name: 'Maria L.',
      role: 'Operations Director',
      company: 'Regional Services Provider',
      result: 'Reduced admin workload by 60%',
    },
  ];

  const goTo = useCallback((idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 260);
  }, [active, animating]);

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [active, goTo, testimonials.length]);

  return (
    <section className="py-24 lg:py-32 bg-white" id="results">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref}>
          <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag mb-4 justify-center">
              <span className="w-4 h-px bg-corporate-blue" />
              Proven Results
            </div>
            <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl text-balance">
              Proven Operational Excellence
            </h2>
          </div>

          {/* Testimonial card */}
          <div
            className={`max-w-3xl mx-auto mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="bg-surface-gray border border-surface-border rounded-2xl p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-8 left-10 opacity-10" aria-hidden="true">
                <Quote size={64} className="text-corporate-blue" />
              </div>

              <div className={`transition-all duration-260 ${animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
                <p className="text-navy-900 text-lg lg:text-xl leading-relaxed mb-8 font-medium relative z-10">
                  "{testimonials[active].quote}"
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-navy-900">{testimonials[active].name}</p>
                    <p className="text-text-muted text-sm">{testimonials[active].role} · {testimonials[active].company}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-corporate-blue/8 rounded-full">
                    <CheckCircle2 size={14} className="text-corporate-blue" />
                    <span className="text-corporate-blue font-semibold text-xs">{testimonials[active].result}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dot selectors */}
          <div className="flex items-center justify-center gap-3 mb-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 h-2.5 bg-corporate-blue' : 'w-2.5 h-2.5 bg-surface-border-dark hover:bg-text-light'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Metrics tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Calendar size={20} className="text-corporate-blue" />, metric: '2–3 weeks', label: 'Average time to first booked meeting' },
              { icon: <TrendingUp size={20} className="text-corporate-blue" />, metric: '35–50%', label: 'Improvement in pipeline velocity' },
              { icon: <Shield size={20} className="text-corporate-blue" />, metric: '100%', label: 'Dedicated team — no shared resources' },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-surface-gray border border-surface-border rounded-xl p-6 flex items-start gap-4
                  transition-all duration-700 hover:border-corporate-blue/30 hover:shadow-md hover:-translate-y-0.5 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-corporate-blue/10 flex items-center justify-center shrink-0
                  transition-all duration-200 hover:bg-corporate-blue/20 hover:scale-110">
                  {item.icon}
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-navy-900">{item.metric}</p>
                  <p className="text-text-muted text-sm mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 lg:py-32 bg-navy-900 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob-slow absolute top-1/2 left-1/2 w-[700px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corporate-blue/10 blur-3xl" />
        <div className="dot-grid absolute inset-0 opacity-[0.07]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-800 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Sparkle icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-corporate-blue/15 border border-corporate-blue/25 mb-8">
            <Sparkles size={24} className="text-corporate-blue" />
          </div>

          <div className="section-tag mb-6 justify-center text-corporate-blue">
            <span className="w-4 h-px bg-corporate-blue" />
            Get Started
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-white mb-6 text-balance leading-tight">
            Ready to improve your sales process?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Let's discuss how Telad Media can support your growth. No commitment required — just a focused conversation about your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-corporate-blue text-white font-semibold text-base rounded-lg
                transition-all duration-200 hover:bg-corporate-blue-dark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-corporate-blue/30 group"
            >
              Schedule a Call
              <ExternalLink size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-10 py-4 border border-white/20 text-white/80 font-semibold text-base rounded-lg
                transition-all duration-200 hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5 hover:text-white group"
            >
              Learn More
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left */}
          <div className="flex flex-col gap-4">
            {/* <!-- INSERT TELAD MEDIA LOGO HERE --> */}
            <Logo dark={false} />
            <p className="text-white/35 text-sm">
              &copy; {new Date().getFullYear()} Telad Media. All rights reserved.
            </p>
          </div>

          {/* Center: Socials */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/35 text-xs font-semibold tracking-widest uppercase">Follow Us</p>
            <div className="flex items-center gap-4">
              {[
                {
                  href: 'https://www.facebook.com/people/TELAD-Media/100090869014053/',
                  icon: <Facebook size={17} />,
                  label: 'Facebook',
                },
                {
                  href: 'https://www.instagram.com/telad_media/',
                  icon: <Instagram size={17} />,
                  label: 'Instagram',
                },
                {
                  href: 'https://www.linkedin.com/company/telad-media/',
                  icon: <Linkedin size={17} />,
                  label: 'LinkedIn',
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-white/50
                    hover:bg-corporate-blue hover:border-corporate-blue hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-corporate-blue/30
                    transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-corporate-blue text-sm font-medium hover:text-corporate-blue-light transition-colors duration-150 group"
            >
              Book a strategy call
              <ExternalLink size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-white/35 text-xs font-semibold tracking-widest uppercase mb-1">Specializations</p>
            {['Sales Outsourcing', 'Appointment Setting', 'Business Support', 'Virtual Assistance', 'Customer Support'].map(item => (
              <span key={item} className="text-white/45 text-sm hover:text-white/70 transition-colors duration-150 cursor-default">{item}</span>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">Built with trust. Operated with precision.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 text-xs hover:text-white/55 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/55 transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-white/4 flex justify-center">
          <a
            href="https://zanishtechmedia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 text-xs hover:text-white/50 transition-colors duration-200"
          >
            Made by Zanishtechmedia
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Metrics />
        <Problem />
        <Services />
        <WhyUs />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
