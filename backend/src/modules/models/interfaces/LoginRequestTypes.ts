import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface LoginRequest extends Request {
    token: string | JwtPayload;
};