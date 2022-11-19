import LoginModel from '../models/login.model';
import bcrypt from 'bcrypt';
import statusCodes from '../../utils/statusCodes';

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

        return { status: OK, result: { message: 'successfully logged in' } };
    };
};