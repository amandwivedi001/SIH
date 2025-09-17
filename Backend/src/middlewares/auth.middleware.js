import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach to request object
      req.user = await db.Commuter.findByPk(decoded.id, {
        // Exclude sensitive data if you add a password field later
        // attributes: { exclude: ['password'] }
      });

      if (!req.user) {
         return res.status(401).json({ message: 'User not found.' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token.' });
  }
};