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
        <p>
          Benjamin Zielbauer<br />
          Waldhornstr. 6<br />
          68804 Altlußheim<br />
          E-Mail: team.restaurantiq@gmail.com<br />
          Telefon: +49 178 4186496
        </p>

        <h2>2. Kontaktformular</h2>
        <p>Wenn Sie das Kontaktformular nutzen, werden Ihr Restaurantname und Ihre E-Mail-Adresse verarbeitet, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Die Daten werden nicht an Dritte weitergegeben und nach abschließender Bearbeitung der Anfrage gelöscht.</p>

        <h2>3. Hosting</h2>
        <p>Diese Website wird bei Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, USA gehostet. Beim Aufruf der Website werden automatisch Verbindungsdaten (u. a. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs) an Server von Vercel übermittelt. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website). Vercel verarbeitet diese Daten auf Grundlage von Standardvertragsklauseln gemäß Art. 46 DSGVO.</p>

        <h2>4. Google Fonts</h2>
        <p>Diese Website verwendet Google Fonts, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden der Seite wird eine Verbindung zu Servern von Google hergestellt, wodurch Ihre IP-Adresse an Google übertragen wird. Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen Darstellung der Website). Google verarbeitet diese Daten ggf. auch in den USA auf Grundlage von Standardvertragsklauseln. Weitere Informationen finden Sie unter <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>

        <h2>5. E-Mail-Versand</h2>
        <p>Anfragen über das Kontaktformular werden über Google Gmail (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) versendet. Google verarbeitet dabei die E-Mail-Inhalte als Auftragsverarbeiter gemäß Art. 28 DSGVO.</p>

        <h2>6. Keine Cookies / Kein Tracking</h2>
        <p>Diese Website verwendet keine Tracking-Cookies und setzt keine Analyse- oder Werbedienste ein. Es werden keine Nutzerprofile erstellt.</p>

        <h2>7. Ihre Rechte</h2>
        <p>Sie haben gemäß DSGVO folgende Rechte gegenüber dem Verantwortlichen:</p>
        <p>
          · Recht auf Auskunft (Art. 15 DSGVO)<br />
          · Recht auf Berichtigung (Art. 16 DSGVO)<br />
          · Recht auf Löschung (Art. 17 DSGVO)<br />
          · Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)<br />
          · Recht auf Datenübertragbarkeit (Art. 20 DSGVO)<br />
          · Widerspruchsrecht (Art. 21 DSGVO)
        </p>
        <p>Zur Ausübung Ihrer Rechte wenden Sie sich an: team.restaurantiq@gmail.com</p>
        <p>Sie haben außerdem das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. In Baden-Württemberg ist dies der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Postfach 10 29 32, 70025 Stuttgart.</p>
      </div>
      <footer>© 2026 Benjamin Zielbauer · RestaurantIQ</footer>
    </>
  );
}
