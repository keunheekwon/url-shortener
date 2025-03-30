import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.headers['username'];
  const password = req.headers['password'];

  if (!username || !password) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }

  next();
};
