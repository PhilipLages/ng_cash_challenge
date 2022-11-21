import express from 'express';
import { UserController } from '../modules/controllers/user.controller';
import { LoginController } from '../modules/controllers/login.controller';
import { authenticateLogin } from '../modules/middlewares/login.middlewares';
import { validateUser } from '../modules/middlewares/user.middlewares';

const userController = new UserController();
const loginController = new LoginController();

export const usersRouter = express.Router();

usersRouter.get('/:id', userController.getUserAccount);

usersRouter.get('/:id/transactions', userController.getTransactionsById);

usersRouter.post('/:id/transactions', userController.createTransaction);

usersRouter.post('/signup', validateUser, userController.createUser);

usersRouter.post('/login', authenticateLogin, loginController.login);
