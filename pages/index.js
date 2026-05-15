import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const CHAT = [
  { role: 'bot', text: 'Guten Abend! Wie kann ich Ihnen helfen?' },
  { role: 'user', text: 'Ich möchte einen Tisch für Samstag reservieren.' },
  { role: 'bot', text: 'Sehr gerne. Für wie viele Personen darf ich planen?' },
  { role: 'user', text: 'Wir sind zu viert.' },
  { role: 'bot', text: 'Und zu welcher Uhrzeit kommen Sie?' },
  { role: 'user', text: '19:30 Uhr, wenn möglich.' },
  { role: 'bot', text: 'Perfekt. Tisch für 4 Personen am Samstag um 19:30 Uhr ist vorgemerkt. Ich benötige noch Ihren Namen.' },
];

const DASH_TABS = [
  { label: 'Übersicht', img: '/dash-1.png', caption: 'Heutige Reservierungen, offene Anfragen und die nächste Buchung auf einen Blick.' },
  { label: 'Reservierungen', img: '/dash-2.png', caption: 'Alle Buchungen gefiltert nach Tag und Status. Mit einem Klick bestätigen oder absagen.' },
  { label: 'Kalender', img: '/dash-3.png', caption: 'Monatsansicht: Orange = neue Anfrage, Grün = bestätigt.' },
  { label: 'Verfügbarkeit', img: '/dash-4.png', caption: 'Öffnungszeiten und Tischanzahl pro Schicht selbst pflegen.' },
];

const STATS = [
  { value: '24/7', label: 'Erreichbar' },
  { value: '< 2s', label: 'Antwortzeit' },
  { value: '0', label: 'Verpasste Anfragen' },
  { value: '1 Tag', label: 'Bis zum Start' },
];

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  );
}

const FEATURES = [
  { icon: <IconChat />, title: 'KI-Assistent auf Ihrer Website', text: 'Ihr digitaler Gastgeber nimmt Reservierungsanfragen entgegen, stellt die richtigen Fragen und führt das Gespräch zu Ende. Ohne dass Sie dabei sein müssen.' },
  { icon: <IconCalendar />, title: 'Verfügbarkeiten selbst verwalten', text: 'Sie legen fest wann und wie viele Tische frei sind. Einzelne Zeiten oder ganze Tage lassen sich mit einem Klick sperren.' },
  { icon: <IconMail />, title: 'Sofort-Benachrichtigung per Mail', text: 'Sobald eine Anfrage eingeht, bekommen Sie eine übersichtliche E-Mail mit allen Daten und können direkt bestätigen oder absagen.' },
  { icon: <IconCheck />, title: 'Automatische Bestätigung an den Gast', text: 'Hat der Gast eine E-Mail-Adresse hinterlassen, bekommt er automatisch eine Zusammenfassung seiner Buchung zugeschickt.' },
  { icon: <IconGrid />, title: 'Übersicht im Admin-Dashboard', text: 'Alle Reservierungen auf einen Blick. Mit Status, Datum und Kontaktdaten, sortiert und filterbar.' },
  { icon: <IconWhatsApp />, title: 'WhatsApp-Link mit einem Klick', text: 'Direkt aus der Benachrichtigungsmail heraus den Gast per WhatsApp kontaktieren, ohne die Nummer abtippen zu müssen.' },
];

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ restaurant: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const dashRef = useRef(null);
  const chatRef = useRef(null);
  const chatAnimated = useRef(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !chatAnimated.current) {
        chatAnimated.current = true;
        runChat();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function runChat() {
    let i = 0;
    function next() {
      if (i >= CHAT.length) return;
      const msg = CHAT[i];
      setIsTyping(true);
      const delay = msg.role === 'bot' ? Math.min(900 + msg.text.length * 20, 2200) : 650;
      setTimeout(() => {
        setIsTyping(false);
        setChatMessages(prev => [...prev, msg]);
        i++;
        setTimeout(next, msg.role === 'bot' ? 500 : 900);
      }, delay);
    }
    setTimeout(next, 700);
  }

  function onDashMove(e) {
    const el = dashRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 7;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -4;
    el.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg)`;
  }
  function onDashLeave() {
    if (dashRef.current) dashRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'sent' : 'error');
  }

  return (
    <>
      <Head>
        <title>RestaurantIQ – KI-Reservierungssystem für Restaurants</title>
        <meta name="description" content="RestaurantIQ beantwortet Reservierungsanfragen automatisch. Per KI, auf Deutsch, direkt auf Ihrer Website. Sie bestätigen mit einem Klick." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg:     #ffffff;
          --bg-alt: #f5f5f7;
          --ink:    #1d1d1f;
          --ink-2:  #3d3d3f;
          --muted:  #6e6e73;
          --gold:   #a8864a;
          --gold-light: #c4a060;
          --line:   #e0e0e5;
          --r:      12px;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--ink);
          background: var(--bg);
          -webkit-font-smoothing: antialiased;
        }

        /* ── ANIMATIONS ── */

        @keyframes glow-drift {
          0%, 100% { transform: translate(-50%, -45%) scale(1) rotate(0deg); opacity: 0.7; }
          33%       { transform: translate(-46%, -48%) scale(1.08) rotate(60deg); opacity: 0.9; }
          66%       { transform: translate(-54%, -42%) scale(0.94) rotate(-60deg); opacity: 0.75; }
        }

        @keyframes glow-drift2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 0.6; }
        }

        @keyframes gradient-shift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes typing-bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40%           { transform: scale(1);   opacity: 1; }
        }

        @keyframes msg-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes stat-pop {
          from { opacity: 0; transform: scale(0.8) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes shine {
          from { left: -80%; }
          to   { left: 120%; }
        }

        /* ── REVEAL ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal.d1 { transition-delay: 0.08s; }
        .reveal.d2 { transition-delay: 0.16s; }
        .reveal.d3 { transition-delay: 0.24s; }
        .reveal.d4 { transition-delay: 0.32s; }
        .reveal.d5 { transition-delay: 0.40s; }
        .reveal.d6 { transition-delay: 0.48s; }

        /* ── NAV ── */
        nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(0,0,0,0.88);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.3s;
        }
        nav.scrolled {
          background: rgba(0,0,0,0.96);
          border-bottom-color: rgba(255,255,255,0.09);
        }
        .nav-inner {
          max-width: 1080px; margin: 0 auto; padding: 0 24px;
          height: 56px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }
        .nav-logo { height: 30px; width: auto; filter: brightness(0) invert(1); }
        .nav-wordmark { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.01em; }
        .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
        .nav-links a {
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.6); text-decoration: none;
          letter-spacing: 0.01em; transition: color 0.15s;
        }
        .nav-links a:hover { color: #fff; }
        .nav-cta {
          background: #fff; color: #000 !important;
          padding: 8px 18px; border-radius: 980px;
          font-size: 13px !important; font-weight: 600 !important;
          white-space: nowrap; transition: opacity 0.15s !important;
        }
        .nav-cta:hover { opacity: 0.85; }
        @media (max-width: 680px) { .nav-links { display: none; } }

        /* ── SECTIONS ── */
        section { width: 100%; }
        .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

        /* ── HERO ── */
        .hero {
          position: relative; overflow: hidden;
          padding: 110px 0 120px;
          text-align: center;
          background: #000;
        }

        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          width: 900px; height: 700px;
          background: radial-gradient(ellipse at center, rgba(168,134,74,0.22) 0%, rgba(120,80,20,0.10) 45%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -45%);
          pointer-events: none;
          animation: glow-drift 14s ease-in-out infinite;
          filter: blur(50px);
        }

        .hero-glow2 {
          position: absolute;
          width: 600px; height: 500px;
          background: radial-gradient(ellipse at center, rgba(168,134,74,0.10) 0%, transparent 65%);
          top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: glow-drift2 8s ease-in-out infinite;
          filter: blur(30px);
        }

        .hero > .container { position: relative; z-index: 1; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 6px 14px; border-radius: 999px;
          margin-bottom: 28px;
          background: rgba(255,255,255,0.04);
        }

        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold);
          animation: glow-drift2 2s ease-in-out infinite;
        }

        .hero h1 {
          font-size: clamp(38px, 6vw, 72px);
          font-weight: 700; line-height: 1.06;
          letter-spacing: -0.035em;
          color: #fff; max-width: 840px;
          margin: 0 auto 28px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #c4a060 0%, #e8c880 40%, #a8864a 70%, #d4a55a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s linear infinite;
        }

        .hero p {
          font-size: clamp(16px, 2.5vw, 19px);
          font-weight: 300; color: rgba(255,255,255,0.5);
          line-height: 1.7; max-width: 540px;
          margin: 0 auto 44px;
        }

        .hero-actions {
          display: flex; align-items: center;
          justify-content: center; gap: 12px; flex-wrap: wrap;
        }

        .btn-primary {
          position: relative; overflow: hidden;
          background: #fff; color: #000;
          padding: 14px 30px; border-radius: 980px;
          font-size: 15px; font-weight: 600;
          text-decoration: none;
          transition: opacity 0.15s; border: none; cursor: pointer;
        }
        .btn-primary::after {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shine 3.5s ease-in-out infinite 1.5s;
        }
        .btn-primary:hover { opacity: 0.88; }

        .btn-secondary {
          background: transparent; color: rgba(255,255,255,0.8);
          padding: 14px 30px; border-radius: 980px;
          font-size: 15px; font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.18);
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.5); color: #fff; }

        /* ── HERO CHAT MOCKUP ── */
        .hero-visual {
          margin-top: 80px;
          max-width: 680px; margin-left: auto; margin-right: auto;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(168,134,74,0.08);
          background: #fff;
        }

        .mockup-bar {
          background: #f5f5f7; padding: 14px 18px;
          display: flex; align-items: center; gap: 8px;
          border-bottom: 1px solid var(--line);
        }
        .mockup-dot { width: 10px; height: 10px; border-radius: 50%; }

        .mockup-messages {
          padding: 28px 24px;
          display: flex; flex-direction: column;
          gap: 10px; min-height: 300px;
        }

        .mockup-msg {
          max-width: 76%; padding: 11px 16px;
          border-radius: 18px; font-size: 14px;
          line-height: 1.55; font-weight: 400;
          animation: msg-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .mockup-msg.bot {
          background: #f5f5f7; color: var(--ink);
          border-radius: 4px 18px 18px 18px;
          align-self: flex-start;
        }
        .mockup-msg.user {
          background: var(--ink); color: #fff;
          border-radius: 18px 4px 18px 18px;
          align-self: flex-end;
        }

        .typing-indicator {
          display: flex; gap: 5px;
          padding: 12px 16px;
          background: #f5f5f7;
          border-radius: 4px 18px 18px 18px;
          align-self: flex-start; width: 56px;
          animation: msg-in 0.3s ease both;
        }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #c0c0c5;
          animation: typing-bounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        .mockup-input {
          border-top: 1px solid var(--line);
          padding: 14px 20px;
          display: flex; align-items: center; gap: 10px;
          background: #fff;
        }
        .mockup-input-bar {
          flex: 1; background: #f5f5f7; border-radius: 999px;
          padding: 9px 16px; font-size: 13px; color: var(--muted);
        }
        .mockup-send {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .mockup-send svg { width: 13px; height: 13px; fill: #fff; }

        /* ── STATS ── */
        .stats {
          background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .stats-grid {
          max-width: 1080px; margin: 0 auto; padding: 0 24px;
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-left: 1px solid var(--line);
        }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat {
          padding: 40px 28px;
          border-right: 1px solid var(--line);
          text-align: center;
        }
        .stat-value {
          font-size: clamp(28px, 3.5vw, 38px);
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--ink); line-height: 1;
        }
        .stat-label {
          font-size: 13px; color: var(--muted);
          margin-top: 6px; font-weight: 400;
        }
        .stat.revealed .stat-value { animation: stat-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .stat.revealed:nth-child(2) .stat-value { animation-delay: 0.08s; }
        .stat.revealed:nth-child(3) .stat-value { animation-delay: 0.16s; }
        .stat.revealed:nth-child(4) .stat-value { animation-delay: 0.24s; }

        /* ── PROBLEM ── */
        .problem { padding: 100px 0; background: var(--bg-alt); }
        .section-label {
          font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 16px;
        }
        .section-title {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700; line-height: 1.15;
          letter-spacing: -0.02em; color: var(--ink);
          max-width: 600px; margin-bottom: 56px;
        }
        .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 760px) { .cards { grid-template-columns: 1fr; } }
        .card {
          background: var(--bg); border-radius: var(--r);
          padding: 32px 28px; border: 1px solid var(--line);
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          border-color: rgba(29,29,31,0.25);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }
        .card-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--bg-alt); border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; color: var(--ink);
        }
        .card-title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 10px; letter-spacing: -0.01em; }
        .card p { font-size: 14px; font-weight: 300; color: var(--muted); line-height: 1.7; }

        /* ── HOW IT WORKS ── */
        .how { padding: 100px 0; background: var(--bg); }
        .steps {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0; margin-top: 56px; position: relative;
        }
        .steps::before {
          content: ''; position: absolute;
          top: 20px; left: calc(16.66% + 20px); right: calc(16.66% + 20px);
          height: 1px; background: var(--line);
        }
        @media (max-width: 760px) {
          .steps { grid-template-columns: 1fr; }
          .steps::before { display: none; }
        }
        .step { padding: 0 24px; text-align: center; }
        .step-num {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--ink); color: #fff;
          font-size: 14px; font-weight: 500;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; position: relative; z-index: 1;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .step:hover .step-num {
          transform: scale(1.12);
          box-shadow: 0 0 0 6px rgba(29,29,31,0.08);
        }
        .step-title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .step p { font-size: 14px; font-weight: 300; color: var(--muted); line-height: 1.7; }
        .trust-strip {
          margin-top: 64px; padding-top: 40px;
          border-top: 1px solid var(--line);
          display: flex; align-items: center;
          justify-content: center; gap: 40px; flex-wrap: wrap;
        }
        .trust-item {
          font-size: 13px; color: var(--muted); font-weight: 400;
          display: flex; align-items: center; gap: 8px;
        }
        .trust-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }

        /* ── FEATURES ── */
        .features { padding: 100px 0; background: var(--bg-alt); }
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--line);
          border: 1px solid var(--line); border-radius: var(--r);
          overflow: hidden; margin-top: 56px;
        }
        @media (max-width: 760px) { .features-grid { grid-template-columns: 1fr; } }
        .feature {
          background: var(--bg); padding: 32px 28px;
          transition: background 0.2s;
        }
        .feature:hover { background: #fafafa; }
        .feature-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--bg-alt); border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; color: var(--ink);
          transition: background 0.2s, border-color 0.2s;
        }
        .feature:hover .feature-icon {
          background: var(--ink); border-color: var(--ink); color: #fff;
        }
        .feature-title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 10px; letter-spacing: -0.01em; }
        .feature p { font-size: 13.5px; font-weight: 300; color: var(--muted); line-height: 1.7; }

        /* ── DASHBOARD ── */
        .dashboard { padding: 100px 0 120px; background: #080808; position: relative; overflow: hidden; }
        .dashboard::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 64px 64px; pointer-events: none;
        }
        .dashboard .section-label { color: rgba(255,255,255,0.3); }
        .dashboard .section-title { color: #fff; margin-bottom: 0; }
        .dashboard-subtitle {
          margin-top: 16px; font-size: 16px; font-weight: 300;
          color: rgba(255,255,255,0.4); line-height: 1.65; max-width: 520px;
        }
        .dashboard-stage { margin-top: 56px; position: relative; z-index: 1; }
        .browser-window {
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.09), 0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(168,134,74,0.06);
          background: #1a1a1a;
          transition: transform 0.12s ease-out;
        }
        .browser-chrome {
          background: #2c2c2e; padding: 12px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0;
        }
        .browser-dots { display: flex; gap: 6px; flex-shrink: 0; }
        .browser-dot { width: 10px; height: 10px; border-radius: 50%; }
        .browser-bar {
          flex: 1; background: rgba(255,255,255,0.07); border-radius: 6px;
          height: 24px; display: flex; align-items: center; padding: 0 12px;
          max-width: 380px; margin: 0 auto;
        }
        .browser-bar-text { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.01em; }
        .browser-screenshot {
          width: 100%; display: block;
          aspect-ratio: 16 / 9; object-fit: cover; object-position: top left;
          background: #1d1d1f;
        }
        .dash-tabs { display: flex; gap: 4px; margin-top: 20px; flex-wrap: wrap; }
        .dash-tab {
          flex: 1; min-width: 120px; padding: 12px 16px;
          border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04); cursor: pointer;
          transition: background 0.15s, border-color 0.15s; text-align: left;
        }
        .dash-tab:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.14); }
        .dash-tab.active { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.22); }
        .dash-tab-label {
          font-size: 10px; font-weight: 500;
          color: rgba(255,255,255,0.45); letter-spacing: 0.06em;
          margin-bottom: 4px; text-transform: uppercase;
        }
        .dash-tab.active .dash-tab-label { color: rgba(255,255,255,0.75); }
        .dash-tab-caption { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.28); line-height: 1.5; display: none; }
        @media (min-width: 640px) { .dash-tab-caption { display: block; } }
        .dash-tab.active .dash-tab-caption { color: rgba(255,255,255,0.48); }
        @media (max-width: 640px) {
          .dash-tabs { gap: 8px; }
          .dash-tab { min-width: calc(50% - 4px); flex: none; }
        }

        /* ── PRICING ── */
        .pricing { padding: 100px 0; background: var(--bg); }
        .pricing-wrap { max-width: 520px; margin: 56px auto 0; }
        .price-glow-border {
          position: relative; padding: 2px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(168,134,74,0.6), rgba(200,160,80,0.2), rgba(168,134,74,0.6));
          background-size: 200% 200%;
          animation: gradient-shift 3s linear infinite;
        }
        .price-card {
          background: var(--ink); border-radius: 12px;
          padding: 44px 40px; position: relative; overflow: hidden;
        }
        .price-card::before {
          content: ''; position: absolute;
          top: -60%; right: -20%; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(168,134,74,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .price-badge {
          display: inline-block; font-size: 10px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gold); background: rgba(168,134,74,0.15);
          padding: 5px 12px; border-radius: 999px; margin-bottom: 24px;
          border: 1px solid rgba(168,134,74,0.25);
        }
        .price-name { font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 10px; }
        .price-amount {
          font-size: 64px; font-weight: 700; color: #fff;
          line-height: 1; margin-bottom: 4px; letter-spacing: -0.04em;
        }
        .price-period { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
        .price-setup { font-size: 12px; color: rgba(255,255,255,0.3); margin-bottom: 32px; }
        .price-divider { height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 28px; }
        .price-features { list-style: none; display: flex; flex-direction: column; gap: 13px; margin-bottom: 36px; }
        .price-features li {
          font-size: 14px; font-weight: 300;
          color: rgba(255,255,255,0.75);
          display: flex; align-items: flex-start; gap: 12px;
        }
        .price-check {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(168,134,74,0.2); border: 1px solid rgba(168,134,74,0.4);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .price-check::after {
          content: ''; width: 5px; height: 3px;
          border-left: 1.5px solid var(--gold); border-bottom: 1.5px solid var(--gold);
          transform: rotate(-45deg) translateY(-1px);
        }
        .btn-price-gold {
          display: block; text-align: center;
          padding: 15px 24px; border-radius: 980px;
          font-size: 15px; font-weight: 600;
          background: linear-gradient(135deg, #c4a060, #a8864a);
          color: #fff; text-decoration: none;
          transition: opacity 0.15s; cursor: pointer; border: none;
          box-shadow: 0 4px 20px rgba(168,134,74,0.4);
        }
        .btn-price-gold:hover { opacity: 0.9; }
        .pricing-notes {
          display: flex; justify-content: center; gap: 28px;
          margin-top: 20px; flex-wrap: wrap;
        }
        .pricing-note-item {
          font-size: 12px; color: var(--muted);
          display: flex; align-items: center; gap: 6px;
        }
        .pricing-note-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--muted); flex-shrink: 0;
        }

        /* ── CONTACT ── */
        .contact { padding: 100px 0; background: var(--bg-alt); }
        .contact-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        @media (max-width: 800px) { .contact-inner { grid-template-columns: 1fr; gap: 48px; } }
        .contact-channels { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; }
        .contact-channel {
          display: flex; align-items: center; gap: 14px;
          background: var(--bg); border: 1px solid var(--line);
          border-radius: var(--r); padding: 16px 20px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
        }
        .contact-channel:hover {
          border-color: var(--ink);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transform: translateX(4px);
        }
        .contact-channel-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .contact-channel-label {
          font-size: 11px; font-weight: 500; color: var(--muted);
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px;
        }
        .contact-channel-value { font-size: 14px; font-weight: 500; color: var(--ink); }
        .contact form { display: flex; flex-direction: column; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label {
          font-size: 11px; font-weight: 500; color: var(--muted);
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .field input, .field textarea {
          font-family: 'Inter', sans-serif; font-size: 15px;
          font-weight: 300; color: var(--ink); background: var(--bg);
          border: 1px solid var(--line); border-radius: 8px;
          padding: 12px 16px; outline: none;
          transition: border-color 0.15s; resize: none;
        }
        .field input:focus, .field textarea:focus { border-color: var(--ink); }
        .field input::placeholder, .field textarea::placeholder { color: var(--line); }
        .form-status { margin-top: 16px; font-size: 14px; color: var(--muted); }
        .form-status.sent { color: #3a9e5f; }
        .form-status.error { color: #c0392b; }

        /* ── FOOTER ── */
        footer { background: var(--ink); padding: 48px 0; }
        .footer-inner {
          max-width: 1080px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .footer-logo { height: 28px; width: auto; filter: invert(1); opacity: 0.6; }
        .footer-links { display: flex; align-items: center; gap: 24px; list-style: none; }
        .footer-links a {
          font-size: 12px; color: rgba(255,255,255,0.35);
          text-decoration: none; transition: color 0.15s;
        }
        .footer-links a:hover { color: rgba(255,255,255,0.75); }
        .footer-copy {
          font-size: 12px; color: rgba(255,255,255,0.2);
          width: 100%; text-align: center;
          margin-top: 24px; padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        /* ── WIDGET ── */
        .widget-btn {
          position: fixed; bottom: 28px; right: 28px; z-index: 9000;
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--ink); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .widget-btn:hover { transform: scale(1.07); box-shadow: 0 8px 32px rgba(0,0,0,0.35); }
        .widget-btn svg { width: 22px; height: 22px; fill: #fff; }
        .widget-panel {
          position: fixed; bottom: 96px; right: 28px; z-index: 8999;
          width: 380px; height: 620px; border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06);
          background: #000; transform-origin: bottom right;
          transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
          display: flex; flex-direction: column;
        }
        .widget-panel.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: all; }
        .widget-panel.closed { opacity: 0; transform: scale(0.92) translateY(12px); pointer-events: none; }
        .widget-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px; height: 52px; background: #1d1d1f;
          border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
        }
        .widget-header-title { display: flex; align-items: center; gap: 10px; }
        .widget-header-title img { height: 22px; width: auto; filter: brightness(0) invert(1); opacity: 0.9; }
        .widget-header-title span { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7); }
        .widget-close {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .widget-close:hover { background: rgba(255,255,255,0.18); }
        .widget-iframe { width: 100%; flex: 1; border: none; display: block; min-height: 0; }
        @media (max-width: 480px) {
          .widget-panel { right: 0; bottom: 0; width: 100vw; height: 100svh; border-radius: 0; }
          .widget-btn { bottom: 20px; right: 16px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className={navScrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="RestaurantIQ" className="nav-logo" />
            <span className="nav-wordmark">RestaurantIQ</span>
          </a>
          <ul className="nav-links">
            <li><a href="#wie-es-funktioniert">Wie es funktioniert</a></li>
            <li><a href="#preise">Preise</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
          <a href="#kontakt" className="nav-cta">Demo anfragen</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="container">
          <div className="hero-badge reveal">
            <span className="hero-badge-dot" />
            KI-Reservierungssystem
          </div>
          <h1 className="reveal d1">
            Ihr Restaurant antwortet.<br />
            <span className="gradient-text">Auch wenn Sie schlafen.</span>
          </h1>
          <p className="reveal d2">
            RestaurantIQ nimmt Reservierungsanfragen automatisch entgegen, prüft Verfügbarkeiten und informiert Sie per E-Mail. Sie bestätigen mit einem Klick.
          </p>
          <div className="hero-actions reveal d3">
            <a href="#kontakt" className="btn-primary">1 Monat gratis starten</a>
            <a href="https://restaurant-iq-demo.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-secondary">Demo ausprobieren</a>
          </div>

          <div className="hero-visual reveal d4" ref={chatRef}>
            <div className="mockup-bar">
              <div className="mockup-dot" style={{ background: '#ff5f57' }} />
              <div className="mockup-dot" style={{ background: '#febc2e' }} />
              <div className="mockup-dot" style={{ background: '#28c840' }} />
            </div>
            <div className="mockup-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`mockup-msg ${msg.role}`}>{msg.text}</div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              )}
            </div>
            <div className="mockup-input">
              <div className="mockup-input-bar">Ihre Antwort...</div>
              <div className="mockup-send">
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="problem">
        <div className="container">
          <div className="section-label reveal">Das Problem</div>
          <h2 className="section-title reveal d1">Wie Reservierungen heute laufen — und warum das nicht mehr reicht.</h2>
          <div className="cards">
            <div className="card reveal d1">
              <div className="card-title">Das Telefon klingelt zur falschen Zeit</div>
              <p>Mittags volles Lokal, abends Feierabend. Gäste rufen trotzdem an. Wer nicht rangeht, verliert die Buchung.</p>
            </div>
            <div className="card reveal d2">
              <div className="card-title">Reservierungen gehen unter</div>
              <p>Zwischen Zetteln, WhatsApp-Nachrichten und mündlichen Absprachen passieren Fehler. Doppelbuchungen kosten Vertrauen.</p>
            </div>
            <div className="card reveal d3">
              <div className="card-title">Nachts existieren Sie nicht</div>
              <p>Wer um 22 Uhr einen Tisch sucht, bucht beim Restaurant das antwortet. Nicht unbedingt beim besten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="wie-es-funktioniert">
        <div className="container">
          <div className="section-label reveal">So funktioniert es</div>
          <h2 className="section-title reveal d1">Einmal einrichten. Danach läuft es.</h2>
          <div className="steps">
            <div className="step reveal d1">
              <div className="step-num">1</div>
              <div className="step-title">Gast schreibt</div>
              <p>Der Gast schreibt auf Ihrer Website, zu jeder Uhrzeit und an jedem Tag. Kein Telefon, kein Warten.</p>
            </div>
            <div className="step reveal d2">
              <div className="step-num">2</div>
              <div className="step-title">KI antwortet</div>
              <p>Unser Assistent führt das Gespräch, prüft die Verfügbarkeit und nimmt alle Details auf.</p>
            </div>
            <div className="step reveal d3">
              <div className="step-num">3</div>
              <div className="step-title">Sie bestätigen</div>
              <p>Sie erhalten eine E-Mail mit den Buchungsdaten und bestätigen per Klick. Fertig.</p>
            </div>
          </div>
          <div className="trust-strip reveal">
            <span className="trust-item"><span className="trust-dot" />Einrichtung in unter einem Tag</span>
            <span className="trust-item"><span className="trust-dot" />Kein technisches Wissen nötig</span>
            <span className="trust-item"><span className="trust-dot" />1 Monat kostenlos testen</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="container">
          <div className="section-label reveal">Was inbegriffen ist</div>
          <h2 className="section-title reveal d1">Alles was Sie brauchen, nichts was Sie nicht brauchen.</h2>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`feature reveal d${(i % 3) + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD ── */}
      <section className="dashboard" id="dashboard">
        <div className="container">
          <div className="section-label reveal">Das Admin-Panel</div>
          <h2 className="section-title reveal d1">Alle Buchungen auf einen Blick.</h2>
          <p className="dashboard-subtitle reveal d2">
            Ihr persönliches Dashboard zeigt neue Anfragen, bestätigte Reservierungen und den Monatskalender übersichtlich und von überall erreichbar.
          </p>
          <div className="dashboard-stage reveal d3">
            <div
              ref={dashRef}
              className="browser-window"
              onMouseMove={onDashMove}
              onMouseLeave={onDashLeave}
            >
              <div className="browser-chrome">
                <div className="browser-dots">
                  <div className="browser-dot" style={{ background: '#ff5f57' }} />
                  <div className="browser-dot" style={{ background: '#febc2e' }} />
                  <div className="browser-dot" style={{ background: '#28c840' }} />
                </div>
                <div className="browser-bar">
                  <span className="browser-bar-text">restaurantiq.de/admin</span>
                </div>
              </div>
              <img
                className="browser-screenshot"
                src={DASH_TABS[activeTab].img}
                alt={`Admin Panel ${DASH_TABS[activeTab].label}`}
                key={activeTab}
              />
            </div>
            <div className="dash-tabs">
              {DASH_TABS.map((tab, i) => (
                <button
                  key={i}
                  className={`dash-tab${activeTab === i ? ' active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  <div className="dash-tab-label">{tab.label}</div>
                  <div className="dash-tab-caption">{tab.caption}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="preise">
        <div className="container">
          <div className="section-label reveal">Preise</div>
          <h2 className="section-title reveal d1">Transparent. Ohne Überraschungen.</h2>
          <div className="pricing-wrap reveal d2">
            <div className="price-glow-border">
              <div className="price-card">
                <div className="price-badge">Alles inklusive</div>
                <div className="price-name">Monatliche Pauschale</div>
                <div className="price-amount">59€</div>
                <div className="price-period">pro Monat, quartalsweise kündbar</div>
                <div className="price-setup">zzgl. 199 € Einrichtung (einmalig)</div>
                <div className="price-divider" />
                <ul className="price-features">
                  {[
                    'KI-Assistent auf Ihrer Website',
                    'Admin-Dashboard mit Kalender',
                    'E-Mail-Benachrichtigungen in Echtzeit',
                    'Automatische Bestätigung an den Gast',
                    'Unbegrenzte Reservierungen',
                    'Einrichtung und persönliche Einweisung',
                  ].map(item => (
                    <li key={item}><span className="price-check" />{item}</li>
                  ))}
                </ul>
                <a href="#kontakt" className="btn-price-gold">Jetzt gratis testen</a>
              </div>
            </div>
            <div className="pricing-notes">
              {['Zahlung erst ab Monat 2', 'Quartalsweise kündbar', 'Rechnung per E-Mail'].map(t => (
                <span key={t} className="pricing-note-item">
                  <span className="pricing-note-dot" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="kontakt">
        <div className="container">
          <div className="contact-inner">
            <div>
              <div className="section-label reveal">Kontakt</div>
              <h2 className="section-title reveal d1">Wir richten es gemeinsam ein.</h2>
              <p className="reveal d2" style={{ fontSize: 15, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75 }}>
                Rufen Sie uns an, schreiben Sie uns auf WhatsApp oder schicken Sie kurz eine Nachricht. Wir melden uns am selben Tag.
              </p>
              <div className="contact-channels reveal d3">
                <a className="contact-channel" href="tel:+4917841864965">
                  <div className="contact-channel-icon" style={{ background: '#f0f0f5' }}>📞</div>
                  <div>
                    <div className="contact-channel-label">Telefon</div>
                    <div className="contact-channel-value">+49 178 4186496</div>
                  </div>
                </a>
                <a className="contact-channel" href="https://wa.me/4917841864965" target="_blank" rel="noopener noreferrer">
                  <div className="contact-channel-icon" style={{ background: '#e8f8f0' }}>💬</div>
                  <div>
                    <div className="contact-channel-label">WhatsApp</div>
                    <div className="contact-channel-value">Nachricht schreiben</div>
                  </div>
                </a>
                <a className="contact-channel" href="mailto:team.restaurantiq@gmail.com">
                  <div className="contact-channel-icon" style={{ background: '#f5f0ff' }}>✉️</div>
                  <div>
                    <div className="contact-channel-label">E-Mail</div>
                    <div className="contact-channel-value">team.restaurantiq@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="reveal d2">
              {status === 'sent' ? (
                <div className="form-status sent" style={{ fontSize: 16, marginTop: 8 }}>
                  Vielen Dank. Wir melden uns in Kürze bei Ihnen.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label>Name des Restaurants</label>
                    <input type="text" placeholder="Ristorante Bella Vista" required value={form.restaurant} onChange={e => setForm({ ...form, restaurant: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Ihre E-Mail</label>
                    <input type="email" placeholder="mario@example.de" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Nachricht (optional)</label>
                    <textarea rows={4} placeholder="Was interessiert Sie besonders?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ color: '#000' }}>
                      {status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
                    </button>
                  </div>
                  {status === 'error' && <div className="form-status error">Etwas ist schiefgelaufen. Rufen Sie uns einfach an.</div>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <img src="/logo.png" alt="RestaurantIQ" className="footer-logo" />
          <ul className="footer-links">
            <li><a href="/impressum">Impressum</a></li>
            <li><a href="/datenschutz">Datenschutz</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="mailto:team.restaurantiq@gmail.com">team.restaurantiq@gmail.com</a></li>
          </ul>
          <div className="footer-copy">© 2026 Benjamin Zielbauer · RestaurantIQ</div>
        </div>
      </footer>

      {/* ── WIDGET ── */}
      <div className={`widget-panel ${widgetOpen ? 'open' : 'closed'}`}>
        <div className="widget-header">
          <div className="widget-header-title">
            <img src="/logo.png" alt="RestaurantIQ" />
            <span>Demo ausprobieren</span>
          </div>
          <button className="widget-close" onClick={() => setWidgetOpen(false)} aria-label="Chat schließen">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {widgetOpen && (
          <iframe className="widget-iframe" src="https://restaurant-iq-demo.vercel.app/demo?restaurant=RestaurantIQ+Demo" title="RestaurantIQ Demo" allow="autoplay" />
        )}
      </div>

      {!widgetOpen && (
        <button className="widget-btn" onClick={() => setWidgetOpen(true)} aria-label="Demo ausprobieren">
          <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" /></svg>
        </button>
      )}
    </>
  );
}
