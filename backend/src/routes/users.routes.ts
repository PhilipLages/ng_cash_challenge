import express from 'express';
import { CreateUserController } from '../modules/controllers/createUser.controller';
import { LoginController } from '../modules/controllers/login.controller';
import { validateUser } from '../modules/middlewares/user.middlewares';

const { createUser } = new CreateUserController();
const { login } = new LoginController()

export const usersRouter = express.Router();

usersRouter.post('/login', login);
usersRouter.post('/', validateUser, createUser);