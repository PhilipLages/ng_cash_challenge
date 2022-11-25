import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { prisma } from '../../../prisma/client';
import statusCodes from '../../utils/statusCodes';
import { Decimal } from '@prisma/client/runtime';

const { ALREADY_EXISTS, CREATED, NOT_FOUND, OK, ANAUTHORIZED } = statusCodes;

const userModel = new UserModel();

export default class UserService {
    async createUser (username: string, password: string ) {
        const userExists = await prisma.user.findUnique({ where: { username } });

        const hashedPassword = await bcrypt.hash(password, 10);       

        if(userExists) {
            return { status: ALREADY_EXISTS, result: { message: 'Usuário já existe' } };
        }        

        const result = await userModel.createUser({ username, password: hashedPassword })
        
        return { status: CREATED, result };
    };

    async getUserAccount (id: number) {
        const result = await userModel.getUserAccount({ id });

        if(!result.userAccount) {
            return { status: NOT_FOUND, result: { message: 'Conta não encontrada' }};
        }

        return { status: OK, result };
    };

    async createTransaction (id: number, username: string, value: Decimal) {
        const debitedUser = await prisma.user.findUnique({ where: { id } });
        const userExists = await prisma.user.findUnique({ where: { username } });
        const debitedAccount = await prisma.account.findUnique({ where: { id } });

        if(!userExists) {
            return { status: NOT_FOUND, result: { message: 'Usuário não encontrado' } };
        }

        if(userExists.id === debitedUser?.id) {
            return { status:  ANAUTHORIZED, result: { message: 'Você não pode realizar uma transação para si mesmo' }};
        }

        const balanceNotValid = Number(debitedAccount?.balance) - Number(value) < 0;

        if(balanceNotValid) {
            return { status:  ANAUTHORIZED, result: { message: 'Você não pode ficar com saldo negativo' }};
        }

        const result = await userModel.createTransaction({ id, username, value }); 
        
        return { status: CREATED, result };
    };

    async getTransactionsById (id: number) {
        const result = await userModel.getTransactionsById({ id });

        if(!result) {
            return { status: NOT_FOUND, result: { message: 'Nenhuma transação encontrada' } };
        }

        return { status: OK, result };
    };
};