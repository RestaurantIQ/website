import { useState } from 'react';

const categories = [
  {
    label: 'Einrichtung',
    items: [
      {
        q: 'Wie lange dauert die Einrichtung?',
        a: 'In der Regel 1–2 Werktage. Wir richten alles für Sie ein – Sie müssen nur ein kurzes Gespräch mit uns führen, damit wir den Bot auf Ihr Restaurant abstimmen können. Danach ist er live.',
      },
      {
        q: 'Muss ich technisches Wissen haben?',
        a: 'Nein. Sie müssen lediglich einen kleinen Code-Schnipsel auf Ihrer Website einfügen – das erklärt Ihr Webmaster oder wir zeigen es Ihnen in zwei Minuten. Den Rest übernehmen wir komplett.',
      },
      {
        q: 'Funktioniert das auf meiner bestehenden Website?',
        a: 'Ja, RestaurantIQ funktioniert auf jeder Website – egal ob WordPress, Wix, Squarespace oder eine individuelle Seite. Es wird als kleines Widget eingebunden, das Ihren bestehenden Auftritt nicht verändert.',
      },
    ],
  },
  {
    label: 'Der Bot',
    items: [
      {
        q: 'Was passiert wenn der Bot eine falsche Antwort gibt?',
        a: 'Der Bot bestätigt keine Reservierungen eigenständig – das tun immer Sie. Er nimmt die Anfrage auf und sendet Ihnen alle Daten per E-Mail. Sie bestätigen mit einem Klick. Fehler beim Gast landen also nie ohne Ihre Prüfung.',
      },
      {
        q: 'Kann ich die Inhalte des Bots anpassen?',
        a: 'Ja. Bei der Einrichtung stimmen wir gemeinsam ab: Öffnungszeiten, Tischkapazitäten, besondere Hinweise, Ton der Antworten. Wenn sich später etwas ändert, melden Sie sich einfach bei uns.',
      },
      {
        q: 'In welchen Sprachen antwortet der Bot?',
        a: 'Der Bot antwortet standardmäßig auf Deutsch. Schreibt ein Gast auf Englisch oder einer anderen Sprache, antwortet er ebenfalls in dieser Sprache.',
      },
    ],
  },
  {
    label: 'Preise & Vertrag',
    items: [
      {
        q: 'Wie funktioniert der kostenlose erste Monat?',
        a: 'Sie zahlen die Einrichtungsgebühr von 199 € einmalig, und der erste Monat läuft dann vollständig kostenlos. Erst ab dem zweiten Monat werden 59 € monatlich fällig.',
      },
      {
        q: 'Wie kann ich kündigen?',
        a: 'Nach dem ersten Monat läuft der Vertrag quartalsweise. Sie können jeweils zum Ende eines Quartals kündigen – mit einer einfachen Nachricht per E-Mail oder Telefon. Kein Papierkram, keine Fristen die man leicht verpasst.',
      },
      {
        q: 'Wie wird abgerechnet?',
        a: 'Sie erhalten monatlich eine Rechnung per E-Mail, die Sie per Überweisung bezahlen. Auf Wunsch auch quartalsweise – dann erhalten Sie einmal pro Quartal eine Sammelrechnung. Keine automatischen Abbuchungen, keine Kreditkarte erforderlich.',
      },
      {
        q: 'Gibt es einen Vertrag den ich unterschreiben muss?',
        a: 'Ja, wir schicken Ihnen eine kurze schriftliche Vereinbarung – zwei Seiten, klare Sprache, keine versteckten Klauseln. Das schützt Sie genauso wie uns.',
      },
    ],
  },
  {
    label: 'Support',
    items: [
      {
        q: 'Was passiert wenn etwas nicht funktioniert?',
        a: 'Sie erreichen uns direkt per Telefon oder E-Mail – keine Ticket-Systeme, kein Call-Center. Wir kümmern uns persönlich und in der Regel am selben Tag.',
      },
      {
        q: 'Wie erreiche ich euch?',
        a: 'Per Telefon unter +49 178 4186496 oder per E-Mail an team.restaurantiq@gmail.com. Wir sind Montag bis Freitag erreichbar.',
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  function toggle(key) {
    setOpen(prev => prev === key ? null : key);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; background: #f5f5f7; color: #1d1d1f; -webkit-font-smoothing: antialiased; }

        nav {
          background: rgba(0,0,0,0.92);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        nav a { text-decoration: none; display: flex; align-items: center; gap: 10px; }
        nav img { height: 28px; filter: brightness(0) invert(1); }
        nav span { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6); }
        nav span:hover { color: #fff; transition: color 0.15s; }

        .wrap { max-width: 720px; margin: 0 auto; padding: 80px 24px 120px; }

        .page-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6e6e73;
          margin-bottom: 16px;
        }

        h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #1d1d1f;
          line-height: 1.1;
          margin-bottom: 64px;
        }

        .category { margin-bottom: 48px; }

        .category-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6e6e73;
          margin-bottom: 16px;
        }

        .faq-item {
          border-bottom: 1px solid #e0e0e5;
        }

        .faq-item:first-of-type { border-top: 1px solid #e0e0e5; }

        .faq-question {
          width: 100%;
          background: none;
          border: none;
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }

        .faq-question-text {
          font-size: 15px;
          font-weight: 500;
          color: #1d1d1f;
          line-height: 1.45;
        }

        .faq-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f5f5f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.25s;
        }

        .faq-icon.is-open {
          background: #1d1d1f;
          transform: rotate(45deg);
        }

        .faq-icon svg { transition: stroke 0.15s; }
        .faq-icon.is-open svg path { stroke: #fff; }

        .faq-answer {
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;
        }

        .faq-answer-inner {
          padding-bottom: 20px;
          font-size: 14px;
          font-weight: 300;
          color: #6e6e73;
          line-height: 1.8;
        }

        .cta-block {
          margin-top: 64px;
          background: #1d1d1f;
          border-radius: 20px;
          padding: 40px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }

        .cta-block h2 {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .cta-block p {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          font-weight: 300;
        }

        .cta-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }

        .cta-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 10px 16px;
          transition: background 0.15s;
          white-space: nowrap;
        }

        .cta-link:hover { background: rgba(255,255,255,0.14); }

        footer {
          text-align: center;
          padding: 40px 24px;
          font-size: 12px;
          color: #6e6e73;
          border-top: 1px solid #e0e0e5;
        }

        footer a { color: #6e6e73; text-decoration: none; }
        footer a:hover { color: #1d1d1f; }

        @media (max-width: 600px) {
          .cta-block { padding: 28px 24px; }
          .cta-block h2 { font-size: 17px; }
        }
      `}</style>

      <nav>
        <a href="/">
          <img src="/logo.png" alt="RestaurantIQ" />
        </a>
        <a href="/#kontakt"><span>Demo anfragen →</span></a>
      </nav>

      <div className="wrap">
        <div className="page-label">FAQ</div>
        <h1>Häufige Fragen.</h1>

        {categories.map((cat, ci) => (
          <div className="category" key={ci}>
            <div className="category-label">{cat.label}</div>
            {cat.items.map((item, ii) => {
              const key = `${ci}-${ii}`;
              const isOpen = open === key;
              return (
                <div className="faq-item" key={ii}>
                  <button className="faq-question" onClick={() => toggle(key)}>
                    <span className="faq-question-text">{item.q}</span>
                    <span className={`faq-icon${isOpen ? ' is-open' : ''}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>
                  <div className="faq-answer" style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}>
                    <div className="faq-answer-inner">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="cta-block">
          <div>
            <h2>Noch eine Frage?</h2>
            <p>Wir antworten persönlich – in der Regel am selben Tag.</p>
          </div>
          <div className="cta-links">
            <a className="cta-link" href="tel:+4917841864965">
              📞 +49 178 4186496
            </a>
            <a className="cta-link" href="mailto:team.restaurantiq@gmail.com">
              ✉️ team.restaurantiq@gmail.com
            </a>
          </div>
        </div>
      </div>

      <footer>
        <a href="/">RestaurantIQ</a> · <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a> · © 2026 Benjamin Zielbauer
      </footer>
    </>
  );
}
