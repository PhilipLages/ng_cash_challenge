import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CreateUserTYPES } from "../interfaces/CreateUserTYPES";
import bcrypt from 'bcrypt';
import { AppError } from "../../errors/appError";

export class CreateUser {
    async execute({ username, password }: CreateUserTYPES): Promise<User> {
        // verifica se usuário já existe
        const doesUserExists = await prisma.user.findUnique({ where: { username }});

        if (doesUserExists) {
            // error
            throw new AppError('User already exists');
        }

        const balance = 100.00;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAccount = await prisma.account.create({ data: { balance } });

        const data = {
            username,
            password: hashedPassword,
            accountId: newAccount.id
        };

        // cria conta e usuário
        const newUser = await prisma.user.create({ data });

        return newUser;
    };
};