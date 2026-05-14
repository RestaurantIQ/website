import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [form, setForm] = useState({ restaurant: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);

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
        <meta name="description" content="RestaurantIQ beantwortet Reservierungsanfragen automatisch. Per KI, auf Deutsch, direkt auf Ihrer Website." />
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

        /* ── NAV ── */
        nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(0,0,0,0.92);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .nav-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .nav-logo {
          height: 32px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .nav-wordmark {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
        }

        .nav-links a {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.15s;
        }

        .nav-links a:hover { color: #fff; }

        .nav-cta {
          background: #fff;
          color: #000 !important;
          padding: 8px 18px;
          border-radius: 980px;
          font-size: 13px !important;
          font-weight: 600 !important;
          white-space: nowrap;
          transition: opacity 0.15s !important;
        }

        .nav-cta:hover { opacity: 0.85; }

        @media (max-width: 680px) {
          .nav-links { display: none; }
        }

        /* ── SECTIONS ── */
        section { width: 100%; }

        .container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── HERO ── */
        .hero {
          padding: 100px 0 100px;
          text-align: center;
          background: #000;
        }

        .hero-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 24px;
        }

        .hero h1 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(38px, 6vw, 68px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          max-width: 820px;
          margin: 0 auto 24px;
        }

        .hero p {
          font-size: clamp(16px, 2.5vw, 19px);
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          max-width: 560px;
          margin: 0 auto 40px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          padding: 14px 28px;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.15s;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover { opacity: 0.85; }

        .btn-secondary {
          background: transparent;
          color: rgba(255,255,255,0.8);
          padding: 14px 28px;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          transition: border-color 0.15s, color 0.15s;
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        .hero-visual {
          margin-top: 72px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08);
          background: #ffffff;
        }

        .mockup-bar {
          background: #f5f5f7;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--line);
        }

        .mockup-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }

        .mockup-messages {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 340px;
        }

        .mockup-msg {
          max-width: 76%;
          padding: 11px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.55;
          font-weight: 400;
        }

        .mockup-msg.bot {
          background: #f5f5f7;
          color: var(--ink);
          border-radius: 4px 18px 18px 18px;
          align-self: flex-start;
        }

        .mockup-msg.user {
          background: var(--ink);
          color: #fff;
          border-radius: 18px 4px 18px 18px;
          align-self: flex-end;
        }

        .mockup-input {
          border-top: 1px solid var(--line);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
        }

        .mockup-input-bar {
          flex: 1;
          background: #f5f5f7;
          border-radius: 999px;
          padding: 9px 16px;
          font-size: 13px;
          color: var(--muted);
        }

        .mockup-send {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .mockup-send svg { width: 13px; height: 13px; fill: #fff; }

        /* ── PROBLEM ── */
        .problem {
          padding: 100px 0;
          background: var(--bg-alt);
        }

        .section-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--ink);
          max-width: 600px;
          margin-bottom: 56px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 760px) {
          .cards { grid-template-columns: 1fr; }
        }

        .card {
          background: var(--bg);
          border-radius: var(--r);
          padding: 32px 28px;
          border: 1px solid var(--line);
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .card p {
          font-size: 14px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.7;
        }

        /* ── HOW IT WORKS ── */
        .how {
          padding: 100px 0;
          background: var(--bg);
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 56px;
          position: relative;
        }

        .steps::before {
          content: '';
          position: absolute;
          top: 20px;
          left: calc(16.66% + 16px);
          right: calc(16.66% + 16px);
          height: 1px;
          background: var(--line);
        }

        @media (max-width: 760px) {
          .steps { grid-template-columns: 1fr; }
          .steps::before { display: none; }
        }

        .step {
          padding: 0 24px;
          text-align: center;
        }

        .step-num {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--ink);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
          z-index: 1;
        }

        .step-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 10px;
        }

        .step p {
          font-size: 14px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.7;
        }

        .trust-strip {
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .trust-item {
          font-size: 13px;
          color: var(--muted);
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trust-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--muted);
          flex-shrink: 0;
        }

        /* ── FEATURES ── */
        .features {
          padding: 100px 0;
          background: var(--bg-alt);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
          margin-top: 56px;
        }

        @media (max-width: 760px) {
          .features-grid { grid-template-columns: 1fr; }
        }

        .feature {
          background: var(--bg);
          padding: 32px 28px;
        }

        .feature-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .feature p {
          font-size: 13.5px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.7;
        }

        /* ── PRICING ── */
        .pricing {
          padding: 100px 0;
          background: var(--bg);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 800px;
          margin: 56px auto 0;
        }

        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr; }
        }

        .price-card {
          border-radius: var(--r);
          padding: 40px 36px;
          border: 1px solid var(--line);
        }

        .price-card.pro {
          background: var(--ink);
          border-color: var(--ink);
          color: #fff;
        }

        .price-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(168,134,74,0.12);
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 20px;
        }

        .price-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 8px;
        }

        .price-card.pro .price-name { color: #fff; }

        .price-amount {
          font-family: 'Cormorant', Georgia, serif;
          font-size: 52px;
          font-weight: 400;
          color: var(--ink);
          line-height: 1;
          margin-bottom: 4px;
        }

        .price-card.pro .price-amount { color: #fff; }

        .price-period {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 28px;
        }

        .price-card.pro .price-period { color: rgba(255,255,255,0.5); }

        .price-divider {
          height: 1px;
          background: var(--line);
          margin-bottom: 28px;
        }

        .price-card.pro .price-divider { background: rgba(255,255,255,0.12); }

        .price-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .price-features li {
          font-size: 14px;
          font-weight: 300;
          color: var(--ink-2);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .price-card.pro .price-features li { color: rgba(255,255,255,0.8); }

        .price-check {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(29,29,31,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .price-check::after {
          content: '';
          width: 5px;
          height: 3px;
          border-left: 1.5px solid var(--ink);
          border-bottom: 1.5px solid var(--ink);
          transform: rotate(-45deg) translateY(-1px);
        }

        .price-card.pro .price-check {
          background: rgba(255,255,255,0.15);
        }

        .price-card.pro .price-check::after {
          border-left-color: #fff;
          border-bottom-color: #fff;
        }

        .btn-price {
          display: block;
          text-align: center;
          padding: 13px 24px;
          border-radius: 980px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.15s;
          cursor: pointer;
          border: none;
        }

        .btn-price-outline {
          background: transparent;
          border: 1px solid var(--line);
          color: var(--ink);
        }

        .btn-price-outline:hover { border-color: var(--ink); }

        .btn-price-gold {
          background: var(--gold);
          color: #fff;
        }

        .btn-price-gold:hover { opacity: 0.88; }

        .pricing-note {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: var(--muted);
        }

        /* ── CONTACT ── */
        .contact {
          padding: 100px 0;
          background: var(--bg-alt);
        }

        .contact-inner {
          max-width: 560px;
        }

        .contact form {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-size: 12px;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .field input,
        .field textarea {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: var(--ink);
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.15s;
          resize: none;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: var(--ink);
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: var(--line);
        }

        .form-submit {
          margin-top: 8px;
        }

        .form-status {
          margin-top: 16px;
          font-size: 14px;
          color: var(--muted);
        }

        .form-status.sent { color: #3a9e5f; }
        .form-status.error { color: #c0392b; }

        /* ── FOOTER ── */
        footer {
          background: var(--ink);
          padding: 48px 0;
        }

        .footer-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-logo {
          height: 28px;
          width: auto;
          filter: invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85);
          opacity: 0.7;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 24px;
          list-style: none;
        }

        .footer-links a {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.15s;
        }

        .footer-links a:hover { color: rgba(255,255,255,0.8); }

        .footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          width: 100%;
          text-align: center;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        /* ── WIDGET ── */
        .widget-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9000;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #1d1d1f;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .widget-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 8px 28px rgba(0,0,0,0.3);
        }

        .widget-btn svg {
          width: 22px;
          height: 22px;
          fill: #fff;
          transition: opacity 0.15s;
        }

        .widget-panel {
          position: fixed;
          bottom: 96px;
          right: 28px;
          z-index: 8999;
          width: 380px;
          height: 620px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06);
          background: #000;
          transform-origin: bottom right;
          transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
          display: flex;
          flex-direction: column;
        }

        .widget-panel.open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }

        .widget-panel.closed {
          opacity: 0;
          transform: scale(0.92) translateY(12px);
          pointer-events: none;
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 52px;
          background: #1d1d1f;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .widget-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .widget-header-title img {
          height: 22px;
          width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .widget-header-title span {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          letter-spacing: -0.01em;
        }

        .widget-close {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }

        .widget-close:hover {
          background: rgba(255,255,255,0.18);
        }

        .widget-iframe {
          width: 100%;
          flex: 1;
          border: none;
          display: block;
          min-height: 0;
        }

        @media (max-width: 480px) {
          .widget-panel {
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100svh;
            border-radius: 0;
          }
          .widget-btn {
            bottom: 20px;
            right: 16px;
          }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-inner">
          <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
            <img src="/logo.png" alt="RestaurantIQ" className="nav-logo" />
            <span className="nav-wordmark">RestaurantIQ</span>
          </a>
          <ul className="nav-links">
            <li><a href="#wie-es-funktioniert">Wie es funktioniert</a></li>
            <li><a href="#preise">Preise</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
          <a href="#kontakt" className="nav-cta">Demo anfragen</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <span className="hero-label">KI-Reservierungssystem</span>
          <h1>Ihr Restaurant ist ab sofort rund um die Uhr erreichbar.</h1>
          <p>RestaurantIQ beantwortet Reservierungsanfragen automatisch. Per KI, auf Deutsch, direkt auf Ihrer Website. Sie bestätigen mit einem Klick.</p>
          <div className="hero-actions">
            <a href="#kontakt" className="btn-primary">1 Monat gratis starten</a>
            <a href="https://restaurant-iq-demo.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-secondary">Demo ausprobieren</a>
          </div>
          <div className="hero-visual">
            <div className="mockup-bar">
              <div className="mockup-dot" style={{background:'#ff5f57'}} />
              <div className="mockup-dot" style={{background:'#febc2e'}} />
              <div className="mockup-dot" style={{background:'#28c840'}} />
            </div>
            <div className="mockup-messages">
              <div className="mockup-msg bot">Guten Abend! Wie kann ich Ihnen helfen? Ich nehme gerne eine Reservierung für Sie auf.</div>
              <div className="mockup-msg user">Ich würde gerne einen Tisch für Samstag reservieren.</div>
              <div className="mockup-msg bot">Sehr gerne. Für wie viele Personen darf ich einplanen?</div>
              <div className="mockup-msg user">Wir sind zu viert.</div>
              <div className="mockup-msg bot">Perfekt. Zu welcher Uhrzeit möchten Sie kommen?</div>
            </div>
            <div className="mockup-input">
              <div className="mockup-input-bar">Ihre Antwort…</div>
              <div className="mockup-send">
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="problem">
        <div className="container">
          <div className="section-label">Das Problem</div>
          <h2 className="section-title">Wie Reservierungen heute laufen — und warum das nicht mehr reicht.</h2>
          <div className="cards">
            <div className="card">
              <div className="card-title">Das Telefon klingelt zur falschen Zeit</div>
              <p>Mittags volles Lokal, abends Feierabend. Gäste rufen trotzdem an. Wer nicht rangeht, verliert die Buchung.</p>
            </div>
            <div className="card">
              <div className="card-title">Reservierungen gehen unter</div>
              <p>Zwischen Zetteln, WhatsApp-Nachrichten und mündlichen Absprachen passieren Fehler. Doppelbuchungen und vergessene Anfragen kosten Vertrauen.</p>
            </div>
            <div className="card">
              <div className="card-title">Nachts und am Ruhetag existieren Sie nicht</div>
              <p>Wer um 22 Uhr einen Tisch sucht, bucht beim Restaurant das antwortet. Nicht unbedingt beim besten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="wie-es-funktioniert">
        <div className="container">
          <div className="section-label">So funktioniert es</div>
          <h2 className="section-title">Einmal einrichten. Danach läuft es.</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-title">Gast schreibt</div>
              <p>Der Gast schreibt auf Ihrer Website, zu jeder Uhrzeit und an jedem Tag. Kein Telefon, kein Warten.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-title">KI antwortet</div>
              <p>Unser Assistent führt das Gespräch, prüft die Verfügbarkeit und nimmt alle Details auf.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-title">Sie bestätigen</div>
              <p>Sie erhalten eine E-Mail mit den Buchungsdaten und bestätigen per Klick. Fertig.</p>
            </div>
          </div>
          <div className="trust-strip">
            <span className="trust-item"><span className="trust-dot" />Einrichtung in unter einem Tag</span>
            <span className="trust-item"><span className="trust-dot" />Kein technisches Wissen nötig</span>
            <span className="trust-item"><span className="trust-dot" />1 Monat kostenlos testen</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="container">
          <div className="section-label">Was inbegriffen ist</div>
          <h2 className="section-title">Alles was Sie brauchen, nichts was Sie nicht brauchen.</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-title">KI-Assistent auf Ihrer Website</div>
              <p>Ihr digitaler Gastgeber nimmt Reservierungsanfragen entgegen, stellt die richtigen Fragen und führt das Gespräch zu Ende. Ohne dass Sie dabei sein müssen.</p>
            </div>
            <div className="feature">
              <div className="feature-title">Verfügbarkeiten selbst verwalten</div>
              <p>Sie legen fest wann und wie viele Tische frei sind. Einzelne Zeiten oder ganze Tage lassen sich mit einem Klick sperren.</p>
            </div>
            <div className="feature">
              <div className="feature-title">Sofort-Benachrichtigung per Mail</div>
              <p>Sobald eine neue Anfrage eingeht, bekommen Sie eine übersichtliche E-Mail mit allen Daten und können direkt bestätigen oder absagen.</p>
            </div>
            <div className="feature">
              <div className="feature-title">Automatische Bestätigung an den Gast</div>
              <p>Hat der Gast eine E-Mail-Adresse hinterlassen, bekommt er automatisch eine Zusammenfassung seiner Buchung zugeschickt.</p>
            </div>
            <div className="feature">
              <div className="feature-title">Übersicht im Admin-Dashboard</div>
              <p>Alle Reservierungen auf einen Blick. Mit Status, Datum und Kontaktdaten, sortiert und filterbar.</p>
            </div>
            <div className="feature">
              <div className="feature-title">WhatsApp-Link mit einem Klick</div>
              <p>Direkt aus der Benachrichtigungsmail heraus können Sie den Gast per WhatsApp kontaktieren, ohne die Nummer abtippen zu müssen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="preise">
        <div className="container">
          <div className="section-label">Preise</div>
          <h2 className="section-title">Transparent. Ohne Überraschungen.</h2>
          <div style={{maxWidth:520,margin:'56px auto 0'}}>
            <div className="price-card pro" style={{position:'relative'}}>
              <div className="price-badge">Alles inklusive</div>
              <div className="price-name">Monatliche Pauschale</div>
              <div className="price-amount">59€</div>
              <div className="price-period" style={{marginBottom:4}}>pro Monat · danach quartalsweise kündbar</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.45)',marginBottom:28}}>zzgl. 199 € Einrichtung (einmalig)</div>
              <div className="price-divider" />
              <ul className="price-features">
                <li><span className="price-check" />KI-Assistent auf Ihrer Website</li>
                <li><span className="price-check" />Admin-Dashboard mit Kalender</li>
                <li><span className="price-check" />E-Mail-Benachrichtigungen in Echtzeit</li>
                <li><span className="price-check" />Automatische Bestätigung an den Gast</li>
                <li><span className="price-check" />Unbegrenzte Reservierungen</li>
                <li><span className="price-check" />Einrichtung & persönliche Einweisung</li>
              </ul>
              <a href="#kontakt" className="btn-price btn-price-gold" style={{fontSize:15,padding:'14px 24px'}}>Jetzt Gratis testen</a>
            </div>
            <div style={{display:'flex',justifyContent:'center',gap:32,marginTop:20,flexWrap:'wrap'}}>
              {['Zahlung erst ab Monat 2','Danach quartalsweise kündbar','Rechnung per E-Mail'].map(t => (
                <span key={t} style={{fontSize:12,color:'var(--muted)',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:4,height:4,borderRadius:'50%',background:'var(--muted)',display:'inline-block',flexShrink:0}} />
                  {t}
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
            <div className="section-label">Kontakt</div>
            <h2 className="section-title">Wir richten es gemeinsam ein.</h2>
            <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>
              Schreiben Sie uns kurz. Wir melden uns innerhalb eines Werktags und zeigen Ihnen in einem kurzen Gespräch wie RestaurantIQ für Ihr Restaurant aussieht.
            </p>
            {status === 'sent' ? (
              <div className="form-status sent" style={{ marginTop: 40, fontSize: 16 }}>
                Vielen Dank. Wir melden uns in Kürze bei Ihnen.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Name des Restaurants</label>
                  <input
                    type="text"
                    placeholder="Ristorante Bella Vista"
                    required
                    value={form.restaurant}
                    onChange={e => setForm({ ...form, restaurant: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Ihre E-Mail</label>
                  <input
                    type="email"
                    placeholder="mario@example.de"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Nachricht (optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Was interessiert Sie besonders?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <div className="form-submit">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Wird gesendet...' : 'Demo anfragen'}
                  </button>
                </div>
                {status === 'error' && (
                  <div className="form-status error">
                    Etwas ist schiefgelaufen. Schreiben Sie uns direkt an team.restaurantiq@gmail.com.
                  </div>
                )}
              </form>
            )}
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
            <li><a href="mailto:team.restaurantiq@gmail.com">team.restaurantiq@gmail.com</a></li>
          </ul>
          <div className="footer-copy">© 2026 Benjamin Zielbauer · RestaurantIQ</div>
        </div>
      </footer>

      {/* ── CHAT WIDGET ── */}
      <div className={`widget-panel ${widgetOpen ? 'open' : 'closed'}`}>
        <div className="widget-header">
          <div className="widget-header-title">
            <img src="/logo.png" alt="RestaurantIQ" />
            <span>Demo ausprobieren</span>
          </div>
          <button className="widget-close" onClick={() => setWidgetOpen(false)} aria-label="Chat schließen">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {widgetOpen && (
          <iframe
            className="widget-iframe"
            src="https://restaurant-iq-demo.vercel.app/demo?restaurant=RestaurantIQ+Demo"
            title="RestaurantIQ Demo"
            allow="autoplay"
          />
        )}
      </div>

      <button
        className="widget-btn"
        onClick={() => setWidgetOpen(o => !o)}
        aria-label={widgetOpen ? 'Chat schließen' : 'Demo ausprobieren'}
      >
        {widgetOpen ? (
          <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
        )}
      </button>
    </>
  );
}

