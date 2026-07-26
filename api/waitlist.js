import supabase from './db-client.js';

async function sendWelcomeEmail(email) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('waitlist email skipped: RESEND_API_KEY is not configured');
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Calorais <hello@calorais.com>',
      to: [email],
      subject: 'You’re on the Calorais waitlist',
      html: `
        <!doctype html>
        <html lang="en">
          <body style="margin:0;background:#08090b;color:#f7f7f5;font-family:Arial,sans-serif;">
            <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
              <div style="color:#c8ff3d;font-size:13px;font-weight:700;letter-spacing:0.18em;">CALORAIS</div>
              <h1 style="margin:32px 0 16px;font-size:36px;line-height:1.1;letter-spacing:-0.03em;">Your place is confirmed.</h1>
              <p style="margin:0;color:#b9bbc1;font-size:17px;line-height:1.7;">Welcome to Calorais. You’re now on the early-access waitlist.</p>
              <p style="margin:16px 0 0;color:#b9bbc1;font-size:17px;line-height:1.7;">We’ll let you know when your invitation is ready. Until then, keep preparing.</p>
              <div style="margin-top:40px;padding-top:24px;border-top:1px solid #24262b;color:#777b84;font-size:13px;line-height:1.6;">Every day, prepared.<br><a href="https://calorais.com" style="color:#c8ff3d;text-decoration:none;">calorais.com</a></div>
            </div>
          </body>
        </html>`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('waitlist email error:', response.status, detail.slice(0, 500));
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return res.status(200).json({ count: count ?? 0 });
    }

    if (req.method === 'POST') {
      const { email } = req.body || {};
      const clean = String(email || '').trim().toLowerCase();
      if (clean.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }

      const { data: existing, error: selError } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', clean)
        .limit(1);
      if (selError) throw selError;
      if (existing && existing.length > 0) {
        return res.status(409).json({ error: 'This email is already registered \u2014 you\'re all set.' });
      }

      const { error: insError } = await supabase
        .from('waitlist')
        .insert({ email: clean, created_at: new Date().toISOString() });
      if (insError) throw insError;

      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      // Registration is the source of truth. An email-provider outage must not
      // lose a valid waitlist signup or make the user submit twice.
      const emailSent = await sendWelcomeEmail(clean);
      return res.status(201).json({ ok: true, count: count ?? 1, email_sent: emailSent });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('waitlist error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
