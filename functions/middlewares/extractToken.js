function extractToken(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    req.accessToken = token;
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports = extractToken;