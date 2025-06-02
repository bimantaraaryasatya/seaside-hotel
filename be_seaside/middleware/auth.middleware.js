const jwt = require('jsonwebtoken')

// Middleware untuk autentikasi token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Format: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    req.user = decoded; // Simpan data user ke request
    next();
  });
}

// Middleware untuk otorisasi berdasarkan role
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: 'User role not found in token',
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied, you are not authorized',
      });
    }

    next();
  };
}

module.exports = {authenticateToken, authorizeRoles};
