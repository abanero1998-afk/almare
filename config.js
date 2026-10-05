window.ALMARE_CONFIG = {
  SUPABASE_URL: localStorage.getItem('almare_sb_url') || '',
  SUPABASE_ANON_KEY: localStorage.getItem('almare_sb_key') || '',
};
window.almareIsSupabaseReady = function () {
  const c = window.ALMARE_CONFIG;
  return !!(c.SUPABASE_URL && c.SUPABASE_ANON_KEY && window.supabase);
};
