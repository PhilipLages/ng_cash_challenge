import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/statusCodes';
import JWT_SECRET from '../../secret';
import { LoginRequest } from '../models/interfaces/LoginRequestTypes';

const { ANAUTHORIZED } = statusCodes;

export const authenticateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer', ' ');    

    if (!token) {
        res.status(ANAUTHORIZED).json({ message: 'Please authenticate' });
    }

    // const decoded = jwt.verify(token, JWT_SECRET);
    // (req as LoginRequest).token = decoded;

    return next();
};
