import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { restaurant, email, message } = req.body;
  if (!restaurant || !email) return res.status(400).json({ error: 'Fehlende Felder' });

  if (!process.env.GMAIL_USER) return res.status(200).json({ ok: true });

  const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  const html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"></head><body style="font-family:sans-serif;background:#f5f5f7;padding:32px;margin:0">
<div style="background:#fff;border-radius:12px;padding:32px;max-width:480px;margin:0 auto">
  <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#a8864a;margin-bottom:16px">RestaurantIQ</div>
  <h2 style="font-size:20px;color:#1d1d1f;margin:0 0 24px">Neue Demo-Anfrage</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:8px 0;font-size:13px;color:#6e6e73;width:130px">Restaurant</td><td style="padding:8px 0;font-size:14px;color:#1d1d1f">${restaurant}</td></tr>
    <tr><td style="padding:8px 0;font-size:13px;color:#6e6e73">E-Mail</td><td style="padding:8px 0;font-size:14px;color:#1d1d1f">${email}</td></tr>
    ${message ? `<tr><td style="padding:8px 0;font-size:13px;color:#6e6e73;vertical-align:top">Nachricht</td><td style="padding:8px 0;font-size:14px;color:#1d1d1f">${message}</td></tr>` : ''}
  </table>
  <div style="margin-top:24px;padding-top:24px;border-top:1px solid #f0f0f0;font-size:11px;color:#c0c0c0;text-align:center">RestaurantIQ · Zielbauer &amp; Winkler GbR</div>
</div></body></html>`;

  await mailer.sendMail({
    from: `"RestaurantIQ Website" <${process.env.GMAIL_USER}>`,
    to: 'team.restaurantiq@gmail.com',
    replyTo: email,
    subject: `Demo-Anfrage: ${restaurant}`,
    html,
  });

  res.status(200).json({ ok: true });
}
