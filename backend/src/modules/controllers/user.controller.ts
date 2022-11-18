import { Request, Response } from "express";
import  CreateUserService from "../services/user.service";

export class CreateUserController {
    async createUser (req: Request, res: Response) {
        const { username, password } = req.body;

        const createUser = new CreateUserService();

       const { status, result } = await createUser.execute(username, password);
    
        return res.status(status).json(result);            
    };
};