import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SerializedUser } from '../types/auth';

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const has_authentication = req.headers['authorization'];

  if (has_authentication) {
    const token = has_authentication.split(' ')[1];

    jwt.verify(token, String(process.env.SECRET), (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized ', err});

      req.user = decoded as SerializedUser;

      next();
    });

    return;
  }

  return res.status(401).json({ message: 'No token provided' });
};
