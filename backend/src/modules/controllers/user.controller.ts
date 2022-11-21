import { Request, Response } from "express";
import  UserService from "../services/user.service";

const userService = new UserService();

export class UserController {
    async createUser (req: Request, res: Response) {
        const { username, password } = req.body;

       const { status, result } = await userService.createUser(username, password);
    
        return res.status(status).json(result);            
    };
    
    async getUserAccount (req: Request, res: Response) {
        const { id } = req.params;

        const { status, result } = await userService.getUserAccount(Number(id));

        return res.status(status).json(result);
    };

    async createTransaction (req: Request, res: Response) {
        const { id } = req.params;
        const { username, value } = req.body;

        const { status, result } = await userService.createTransaction(Number(id), username, value);

        return res.status(status).json(result);
    };

    async getTransactionsById (req: Request, res: Response) {
        const { id } = req.params;

        const { status, result } = await userService.getTransactionsById(Number(id));

        return res.status(status).json(result);
    }
};