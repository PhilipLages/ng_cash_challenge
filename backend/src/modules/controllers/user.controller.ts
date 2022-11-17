import { Request, Response } from "express";
import { CreateUser } from "../services/user.service";

export class CreateUserController {
    async createUser (req: Request, res: Response) {
        const { username, password } = req.body;

        const createUser = new CreateUser();

        const result = await createUser.execute({ username, password });

        return res.status(201).json(result);
    };
}