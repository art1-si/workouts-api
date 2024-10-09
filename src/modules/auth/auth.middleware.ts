import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


/**
 * Middleware to verify the JWT token from the request headers.
 * 
 * @param req - The request object from Express.
 * @param res - The response object from Express.
 * @param next - The next middleware function in the Express stack.
 * 
 * @returns A response with status 401 if the access token is missing,
 *          or status 403 if the token is invalid. Otherwise, it calls the next middleware.
 * 
 * @remarks
 * The JWT_SECRET is retrieved from the environment variables or defaults to 'your_jwt_secret'.
 * The token is expected to be in the 'Authorization' header in the format 'Bearer <token>'.
 * If the token is valid, the decoded userId is attached to the request body.
 */
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