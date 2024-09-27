import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.body.userId = decoded.userId;
        next();
    } catch  {
        return res.status(403).json({ message: 'Invalid token' });
    }
};