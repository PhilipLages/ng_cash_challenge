import { NextFunction, Request, Response } from "express";
import statusCodes from "../../utils/statusCodes";
import jwt from 'jsonwebtoken';
import JWT_SECRET from "../../secret";
import { TokenTypes } from "../models/interfaces/tokenTypes";

const { ANAUTHORIZED } = statusCodes;

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(ANAUTHORIZED).json({ message: 'Please authenticate' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, JWT_SECRET);    
    
    const { id } = data as TokenTypes;

    req.userId = id;

    return next();
  } catch {
    return res.status(ANAUTHORIZED);
  }
};