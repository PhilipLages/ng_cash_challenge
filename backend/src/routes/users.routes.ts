import express from 'express';
import { CreateUserController } from '../modules/controllers/user.controller';
import { validateUser } from '../modules/middlewares/user.middlewares';

const { createUser } = new CreateUserController();

export const usersRouter = express.Router();

usersRouter.post('/', validateUser, createUser);