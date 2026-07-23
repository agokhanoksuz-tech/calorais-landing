import supabase from './db-client.js';

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
      return res.status(201).json({ ok: true, count: count ?? 1 });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('waitlist error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
