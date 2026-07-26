import supabase from './db-client.js';
import { FALLBACK_NARRATIVE, isMissingTable } from './fallback-data.js';

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
      const errors = [protocol.error, pillars.error, timeline.error, principles.error, quotes.error].filter(Boolean);
      if (errors.some(isMissingTable)) return res.status(200).json(FALLBACK_NARRATIVE);
      if (errors.length) throw errors[0];
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
