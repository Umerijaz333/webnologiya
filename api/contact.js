// Vercel serverless function — handles the contact form submission.
// Runs server-side only. Requires two environment variables set in Vercel:
//   RESEND_API_KEY   → your API key from resend.com
//   LEAD_EMAIL_TO    → the email address that should receive new leads

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, need, email, message } = req.body || {};

  // Basic validation — reject empty required fields
  if (!name || !business || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // The form field accepts an email OR a WhatsApp number — only use it as
  // reply_to when it actually looks like an email address, since Resend
  // rejects a reply_to that isn't a valid address.
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO;

  if (!RESEND_API_KEY || !LEAD_EMAIL_TO) {
    console.error('Missing RESEND_API_KEY or LEAD_EMAIL_TO environment variable');
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Webnologiya Leads <leads@webnologiya.com>', // must be a domain verified in Resend
        to: [LEAD_EMAIL_TO],
        ...(isEmail ? { reply_to: email } : {}),
        subject: `New lead: ${business}`,
        text:
          `Name: ${name}\n` +
          `Business: ${business}\n` +
          (need ? `What they need: ${need}\n` : '') +
          `Email/WhatsApp: ${email}\n\n` +
          `Message:\n${message || '(none provided)'}`
      })
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('Resend API error:', errText);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
