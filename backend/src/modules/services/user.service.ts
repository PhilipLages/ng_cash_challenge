import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { prisma } from '../../../prisma/client';
import statusCodes from '../../utils/statusCodes';

const { ALREADY_EXISTS, CREATED, NOT_FOUND, OK } = statusCodes;

const userModel = new UserModel();

export default class UserService {
    async createUser(username: string, password: string ) {
        const userExists = await prisma.user.findUnique({ where: { username } });

        const hashedPassword = await bcrypt.hash(password, 10);       

        if(userExists) {
            return { status: ALREADY_EXISTS, result: { message: 'User already exists' } };
        }        

        const result = await userModel.createUser({ username, password: hashedPassword })
        
        return { status: CREATED, result };
    };

    async getUserAccount(id: number) {
        const result = await userModel.getUserAccount({ id });

        if(!result) {
            return { status: NOT_FOUND, result: { message: 'Account not found' }};
        }

        return { status: OK, result };
    };
};