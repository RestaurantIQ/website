const sharedStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Cormorant:wght@400&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', -apple-system, sans-serif; background: #f5f5f7; color: #1d1d1f; -webkit-font-smoothing: antialiased; }
  nav { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid #d2d2d7; padding: 0 24px; height: 56px; display: flex; align-items: center; }
  nav img { height: 32px; }
  .wrap { max-width: 720px; margin: 0 auto; padding: 80px 24px; }
  h1 { font-family: 'Cormorant', Georgia, serif; font-size: 40px; font-weight: 400; margin-bottom: 40px; color: #1d1d1f; }
  h2 { font-size: 15px; font-weight: 600; margin: 32px 0 10px; color: #1d1d1f; }
  p { font-size: 14px; font-weight: 300; line-height: 1.8; color: #6e6e73; margin-bottom: 12px; }
  a { color: #a8864a; text-decoration: none; }
  footer { text-align: center; padding: 40px 24px; font-size: 12px; color: #6e6e73; border-top: 1px solid #d2d2d7; margin-top: 40px; }
`;

export default function Impressum() {
  return (
    <>
      <style>{sharedStyle}</style>
      <nav>
        <a href="/"><img src="/logo.png" alt="RestaurantIQ" /></a>
      </nav>
      <div className="wrap">
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Benjamin Zielbauer<br />
          Waldhornstr. 6<br />
          68804 Altlußheim
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: team.restaurantiq@gmail.com
        </p>

        <h2>Steuernummer</h2>
        <p>Wird nach Gewerbeanmeldung ergänzt.</p>

        <h2>Technischer Betrieb</h2>
        <p>RestaurantIQ wird betrieben von Benjamin Zielbauer. Hosting über Vercel Inc., 340 Pine Street Suite 701, San Francisco, California 94104, USA.</p>

        <h2>Streitschlichtung</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>
      <footer>© 2026 Benjamin Zielbauer · RestaurantIQ</footer>
    </>
  );
}
