import CreateUserModel from '../models/createUser.model';
import bcrypt from 'bcrypt';
import { prisma } from '../../../prisma/client';
import statusCodes from '../../utils/statusCodes';

const { ALREADY_EXISTS, CREATED } = statusCodes;

export default class CreateUserService {
    async execute(username: string, password: string ) {
        const userExists = await prisma.user.findUnique({ where: { username } });

        const hashedPassword = await bcrypt.hash(password, 10);       

        if(userExists) {
            return { status: ALREADY_EXISTS, result: { message: 'User already exists' } };
        }
        
        const createUser = new CreateUserModel();

        const result = await createUser.execute({ username, password: hashedPassword })
        
        return { status: CREATED, result };
    };
};