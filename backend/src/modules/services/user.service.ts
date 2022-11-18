import CreateUserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { prisma } from '../../../prisma/client';

export default class CreateUser {
    async execute(username: string, password: string ) {
        const userExists = await prisma.user.findUnique({ where: { username } });

        const hashedPassword = await bcrypt.hash(password, 10);       

        if(userExists) {
            return { status: 400, result: { message: 'User already exists' } };
        }
        
        const createUser = new CreateUserModel();

        const result = await createUser.execute({ username, password: hashedPassword })
        
        return { status: 201, result };
    };
};