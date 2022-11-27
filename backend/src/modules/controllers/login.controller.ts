import { Request, Response } from "express";
import LoginService from "../services/login.service";

export class LoginController {
    async login (req: Request, res: Response) {
        const { username, password } = req.body;        

        const loginService = new LoginService();
        
        const { status, result } = await loginService.login(username, password);        

        return res.status(status).json(result);
    };
};