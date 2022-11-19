import { Account, User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AccountTypes } from "./interfaces/AccountTypes";
import { CreateUserTYPES } from "./interfaces/CreateUserTypes";

export class UserModel {
    async createUser({ username, password }: CreateUserTYPES): Promise<User> {
        const balance = 100;

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

    async getUserAccount({ id }: AccountTypes) {
        const userAccount = await prisma.account.findUnique({ where: { id } });

        return { id: userAccount?.id, balance: Number(userAccount?.balance) };
    };
};
