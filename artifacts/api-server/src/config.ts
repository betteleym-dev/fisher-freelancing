// Configuration helper: returns allowed origins based on NODE_ENV and ALLOWED_ORIGINS env var.
// In development, default to common localhost ports for the dev server/front-end.
export function getAllowedOrigins(): string[] {
  const env = process.env.NODE_ENV || 'development';
  const fromEnv = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (fromEnv.length > 0) return fromEnv;

  if (env === 'production') {
    // Require ALLOWED_ORIGINS in production — fallback to a placeholder to avoid accidental wildcard behavior.
    return ['https://your-domain.com'];
  }

  // Development sensible defaults
  return [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];
}
