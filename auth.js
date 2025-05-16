const basicAuth = (req, res, next) => {
    // Basic authentication middleware
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    // For demo purposes, using basic authentication
    // In production, use proper authentication like JWT
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');
    const user = auth[0];
    const pass = auth[1];
  
    if (user === 'admin' && pass === 'password') {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  module.exports = basicAuth;