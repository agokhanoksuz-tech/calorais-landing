import supabase from './db-client.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const [metricsRes, activityRes, workoutsRes] = await Promise.all([
        supabase.from('dashboard_metrics').select('*').order('id', { ascending: true }),
        supabase.from('weekly_activity').select('*').order('id', { ascending: true }),
        supabase.from('recent_workouts').select('*').order('id', { ascending: false }).limit(5),
      ]);
      if (metricsRes.error) throw metricsRes.error;
      if (activityRes.error) throw activityRes.error;
      if (workoutsRes.error) throw workoutsRes.error;
      return res.status(200).json({
        metrics: metricsRes.data,
        activity: activityRes.data,
        workouts: workoutsRes.data,
      });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('dashboard error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
