import express from 'express';
import { UserController } from '../modules/controllers/user.controller';
import { LoginController } from '../modules/controllers/login.controller';
import { validateUser } from '../modules/middlewares/user.middlewares';
import authMiddleware from '../modules/middlewares/auth.middleware';

const userController = new UserController();
const loginController = new LoginController();

export const usersRouter = express.Router();

usersRouter.post('/signup', validateUser, userController.createUser);
usersRouter.post('/login', loginController.login);

usersRouter.use(authMiddleware);

usersRouter.get('/:id', userController.getUserAccount);

usersRouter.post('/:id/transactions', userController.createTransaction);

usersRouter.get('/:id/transactions', userController.getTransactionsById);



