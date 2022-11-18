import { NextFunction, Request, Response } from "express";
import { body } from "./user.joi.rules";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const { error } = body.validate(user);   

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    return next();
};
