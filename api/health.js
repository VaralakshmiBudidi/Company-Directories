// Health check endpoint
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'CORS preflight' });
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    res.status(200).json({ 
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
      status: 'ok'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      message: 'API health check failed',
      error: error.message 
    });
  }
}
