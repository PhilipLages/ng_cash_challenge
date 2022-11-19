import { Request, Response } from "express";
import LoginService from "../services/login.service";
import jwt from 'jsonwebtoken';

export class LoginController {
    async login (req: Request, res: Response) {
        const { username, password } = req.body;

        const login = new LoginService();
        
        const { status, result } = await login.execute(username, password);        

        return res.status(status).json(result);
    };
};