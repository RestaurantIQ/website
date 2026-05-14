export default function Impressum() {
  return (
    <>
      <style>{$shared_style}</style>
      <nav><a href="/"><img src="/logo.png" alt="RestaurantIQ" /></a></nav>
      <div className="wrap">
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>[GESELLSCHAFTER 1] und [GESELLSCHAFTER 2]<br />Zielbauer &amp; Winkler GbR<br />[STRASSE NR]<br />[PLZ] [STADT]</p>
        <h2>Kontakt</h2>
        <p>E-Mail: team.restaurantiq@gmail.com</p>
        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [UST-IDNR]</p>
        <h2>Technischer Betrieb</h2>
        <p>RestaurantIQ wird betrieben von der Zielbauer &amp; Winkler GbR. Hosting über Vercel Inc., San Francisco, USA.</p>
      </div>
      <footer>© 2026 Zielbauer &amp; Winkler GbR · RestaurantIQ</footer>
    </>
  );
}