import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [form, setForm] = useState({ restaurant: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant:wght@400;500&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg:     #ffffff;
          --bg-alt: #f5f5f7;
          --ink:    #1d1d1f;
          --ink-2:  #3d3d3f;
          --muted:  #6e6e73;
          --gold:   #a8864a;
          --line:   #d2d2d7;
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
          background: rgba(255,255,255,0.85);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--line);
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
          height: 36px;
          width: auto;
          object-fit: contain;
          object-position: center center;
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
          color: var(--ink-2);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.15s;
        }

        .nav-links a:hover { color: var(--ink); }

        .nav-cta {
          background: var(--ink);
          color: #fff !important;
          padding: 8px 18px;
          border-radius: 980px;
          font-size: 13px !important;
          font-weight: 500 !important;
          white-space: nowrap;
          transition: opacity 0.15s !important;
        }

        .nav-cta:hover { opacity: 0.8; }

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
          padding: 100px 0 80px;
          text-align: center;
          background: var(--bg);
        }

        .hero-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
        }

        .hero h1 {
          font-family: 'Cormorant', Georgia, serif;
          font-size: clamp(42px, 7vw, 72px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--ink);
          max-width: 800px;
          margin: 0 auto 24px;
        }

        .hero p {
          font-size: clamp(16px, 2.5vw, 19px);
          font-weight: 300;
          color: var(--muted);
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
          background: var(--ink);
          color: #fff;
          padding: 14px 28px;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.15s;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover { opacity: 0.8; }

        .btn-secondary {
          background: transparent;
          color: var(--ink);
          padding: 14px 28px;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid var(--line);
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: var(--ink);
          background: var(--bg-alt);
        }

        .hero-visual {
          margin-top: 72px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px var(--line);
          background: #f0ebe0;
        }

        .hero-visual iframe {
          width: 100%;
          height: 560px;
          border: none;
          display: block;
        }

        @media (max-width: 600px) {
          .hero-visual iframe { height: 420px; }
        }

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
          color: var(--gold);
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Cormorant', Georgia, serif;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.15;
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
          background: var(--gold);
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
          background: rgba(168,134,74,0.15);
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
          border-left: 1.5px solid var(--gold);
          border-bottom: 1.5px solid var(--gold);
          transform: rotate(-45deg) translateY(-1px);
        }

        .price-card.pro .price-check {
          background: rgba(168,134,74,0.25);
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
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-inner">
          <img src="/logo.png" alt="RestaurantIQ" className="nav-logo" />
          <ul className="nav-links">
            <li><a href="#wie-es-funktioniert">Wie es funktioniert</a></li>
            <li><a href="#preise">Preise</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
            <li><a href="#kontakt" className="nav-cta">Demo anfragen</a></li>
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <span className="hero-label">KI-Reservierungssystem</span>
          <h1>Ihr Restaurant ist ab sofort rund um die Uhr erreichbar.</h1>
          <p>RestaurantIQ beantwortet Reservierungsanfragen automatisch. Per KI, auf Deutsch, direkt auf Ihrer Website. Sie bestätigen mit einem Klick.</p>
          <div className="hero-actions">
            <a href="https://restaurant-iq-demo.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary">Demo ausprobieren</a>
            <a href="#kontakt" className="btn-secondary">Gespräch vereinbaren</a>
          </div>
          <div className="hero-visual">
            <iframe
              src="https://restaurant-iq-demo.vercel.app"
              title="RestaurantIQ Live Demo"
              loading="lazy"
            />
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
            <span className="trust-item"><span className="trust-dot" />Monatlich kündbar</span>
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
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-name">Starter</div>
              <div className="price-amount">79€</div>
              <div className="price-period">pro Monat</div>
              <div className="price-divider" />
              <ul className="price-features">
                <li><span className="price-check" />KI-Assistent auf Ihrer Website</li>
                <li><span className="price-check" />Admin-Dashboard</li>
                <li><span className="price-check" />E-Mail-Benachrichtigungen</li>
                <li><span className="price-check" />Automatische Gästebestätigung</li>
                <li><span className="price-check" />Bis zu 200 Reservierungen pro Monat</li>
              </ul>
              <a href="#kontakt" className="btn-price btn-price-outline">Demo anfragen</a>
            </div>
            <div className="price-card pro">
              <div className="price-badge">Empfohlen</div>
              <div className="price-name">Pro</div>
              <div className="price-amount">149€</div>
              <div className="price-period">pro Monat</div>
              <div className="price-divider" />
              <ul className="price-features">
                <li><span className="price-check" />Alles aus Starter</li>
                <li><span className="price-check" />Einbettbares Website-Widget</li>
                <li><span className="price-check" />Kalender-Verwaltung mit Sperrtagen</li>
                <li><span className="price-check" />Unbegrenzte Reservierungen</li>
                <li><span className="price-check" />Bevorzugter Support</li>
              </ul>
              <a href="#kontakt" className="btn-price btn-price-gold">Demo anfragen</a>
            </div>
          </div>
          <p className="pricing-note">Einmalige Einrichtung 299 € &nbsp;·&nbsp; 30 Tage kostenlos testen &nbsp;·&nbsp; Monatlich kündbar</p>
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
          <div className="footer-copy">© 2026 Zielbauer &amp; Winkler GbR · RestaurantIQ</div>
        </div>
      </footer>
    </>
  );
}
