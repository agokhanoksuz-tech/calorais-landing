import supabase from './db-client.js';
import { FALLBACK_PLANS, isMissingTable } from './fallback-data.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('plan_tiers')
        .select('*')
        .order('price', { ascending: true });
      if (isMissingTable(error)) return res.status(200).json(FALLBACK_PLANS);
      if (error) throw error;
      return res.status(200).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('plans error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
