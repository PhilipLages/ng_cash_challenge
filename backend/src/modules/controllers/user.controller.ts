import { Request, Response } from "express";
import { CreateUser } from "../services/user.service";

export class CreateUserController {
    async createUser (req: Request, res: Response) {
        const { username, password } = req.body;

        const createUser = new CreateUser();

        const result = await createUser.execute({ username, password });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(201).json(result);
    };
}