import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CreateUserTYPES } from "./interfaces/CreateUserTYPES";

export class CreateUserModel {
    async execute({ username, password }: CreateUserTYPES): Promise<User> {
        const balance = 100.00;

        // Cria nova conta de usuário
        const newAccount = await prisma.account.create({ data: { balance } });

        const data = {
            username,
            password,
            accountId: newAccount.id
        };

        // Cria novo usuário
        const newUser = await prisma.user.create({ data });

        return newUser;
    };
};
