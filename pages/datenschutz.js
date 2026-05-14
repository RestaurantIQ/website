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

export default function Datenschutz() {
  return (
    <>
      <style>{sharedStyle}</style>
      <nav>
        <a href="/"><img src="/logo.png" alt="RestaurantIQ" /></a>
      </nav>
      <div className="wrap">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>Zielbauer &amp; Winkler GbR, [STRASSE NR], [PLZ] [STADT].<br />E-Mail: team.restaurantiq@gmail.com</p>

        <h2>2. Kontaktformular</h2>
        <p>Wenn Sie das Kontaktformular nutzen, werden Ihr Restaurantname und Ihre E-Mail-Adresse verarbeitet, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nicht an Dritte weitergegeben und nach Abschluss der Anfrage gelöscht.</p>

        <h2>3. Hosting</h2>
        <p>Diese Website wird bei Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA gehostet. Beim Aufruf der Website werden automatisch Verbindungsdaten an Vercel übermittelt. Vercel verarbeitet diese Daten auf Grundlage von Standardvertragsklauseln gemäß Art. 46 DSGVO.</p>

        <h2>4. E-Mail-Versand</h2>
        <p>Anfragen über das Kontaktformular werden über Google Gmail (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4) versendet. Google verarbeitet dabei die E-Mail-Inhalte als Auftragsverarbeiter gemäß Art. 28 DSGVO.</p>

        <h2>5. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie das Recht auf Datenübertragbarkeit. Wenden Sie sich dazu an team.restaurantiq@gmail.com. Sie haben außerdem das Recht, sich bei der zuständigen Datenschutzbehörde zu beschweren.</p>
      </div>
      <footer>© 2026 Zielbauer &amp; Winkler GbR · RestaurantIQ</footer>
    </>
  );
}
