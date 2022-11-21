import { Transaction, User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AccountTypes } from "./interfaces/AccountTypes";
import { CreateUserTYPES } from "./interfaces/CreateUserTypes";
import { CreatetransactionsTypes } from "./interfaces/CreateTransactionsTypes";
import { TransactionsTypes } from "./interfaces/TransactionsTypes";

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

    async createTransaction ({ id, username, value }: CreatetransactionsTypes) {
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

        const newTransaction = await prisma.transaction.create({ data });

        // atualiza conta do usuário que realizou cash out
        await prisma.account.update({
            where: { id },
            data: { balance: debitedBalance }
        });

        // atualiza conta do usuário que obteve um cash in
        await prisma.account.update({
            where: { id: creditedUser?.id },
            data: { balance: creditedBalance}
        });

        return newTransaction;
    };

    async getTransactionsById({ id }: TransactionsTypes): Promise<Transaction[]> {
        const debitedTransactions = await prisma.transaction.findMany({ 
            where: { 
                debitedAccountId: id , 
            },
        });

        const creditedTransactions = await prisma.transaction.findMany({ 
            where: { 
                creditedAccountId: id , 
            },
        });

        return [...debitedTransactions, ...creditedTransactions];
    };
};
