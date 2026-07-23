import supabase from './db-client.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const [protocol, pillars, timeline, principles, quotes] = await Promise.all([
        supabase.from('protocol_items').select('*').order('id', { ascending: true }),
        supabase.from('pillars').select('*').order('id', { ascending: true }),
        supabase.from('day_events').select('*').order('id', { ascending: true }),
        supabase.from('principles').select('*').order('id', { ascending: true }),
        supabase.from('athlete_quotes').select('*').order('id', { ascending: true }),
      ]);
      if (protocol.error) throw protocol.error;
      if (pillars.error) throw pillars.error;
      if (timeline.error) throw timeline.error;
      if (principles.error) throw principles.error;
      if (quotes.error) throw quotes.error;
      return res.status(200).json({
        protocol: protocol.data,
        pillars: pillars.data,
        timeline: timeline.data,
        principles: principles.data,
        quotes: quotes.data,
      });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('narrative error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
