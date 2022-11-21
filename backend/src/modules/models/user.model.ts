import { Account, Transaction, User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AccountTypes } from "./interfaces/AccountTypes";
import { CreateUserTYPES } from "./interfaces/CreateUserTypes";
import { transactionsTypes } from "./interfaces/transactionsTypes";

export class UserModel {
    async createUser ({ username, password }: CreateUserTYPES): Promise<User> {
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

    async getUserAccount ({ id }: AccountTypes) {
        const userAccount = await prisma.account.findUnique({ where: { id } });

        return { id, balance: userAccount?.balance };
    };

    async createTransaction ({ id, username, value }: transactionsTypes) {
        const debitedUser = await prisma.user.findUnique({ where: { id } });
        const creditedUser = await prisma.user.findUnique({ where: { username } });

        const data = {
            debitedAccountId: Number(debitedUser?.id),
            creditedAccountId: Number(creditedUser?.id),
            value
        };

        const debitedAccount = await prisma.account.findUnique({ where: { id } });
        const creditedAccount = await prisma.account.findUnique({ where: { id: creditedUser?.id } });

        const debitedBalance = Number(debitedAccount?.balance) - Number(value);
        const creditedBalance = Number(creditedAccount?.balance) + Number(value);

        await prisma.transaction.create({ data });

        await prisma.account.update({
            where: { id },
            data: { balance: debitedBalance }
        });

        await prisma.account.update({
            where: { id: creditedUser?.id },
            data: { balance:  creditedBalance}
        });

        const newTransaction = await prisma.transaction.findFirst({
            where: { id },
            include: {
                debited: true,
                credited: true,
            }
        });

        return newTransaction;
    };
};
