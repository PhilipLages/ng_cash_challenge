import LoginModel from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import statusCodes from '../../utils/statusCodes';
import JWT_SECRET from '../../secret';

const { NOT_FOUND, OK, ANAUTHORIZED } = statusCodes;

export default class LoginService {
    async execute(username: string, password: string) {
        const login = new LoginModel();

        const result = await login.execute({ username, password });

        if (!result) {
            return { status: NOT_FOUND, result: { message: 'user not found' } };
        }

        const isMatch = bcrypt.compareSync(password, result.password);

        if (!isMatch) {
            return { status: ANAUTHORIZED, result: { message: 'invalid password' }};
        }

        const user = {
            id: result.id,
            username: result.username
        }

        const token = jwt.sign({ 
            id: result.id?.toString(),  
            username: result.username,
        }, JWT_SECRET, {
            expiresIn: '1 day',
        });

        return { status: OK, result: { user, token } };
    };
};