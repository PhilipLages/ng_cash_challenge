import express from 'express';
import { CreateUserController } from '../modules/controllers/user.controller';

const { createUser } = new CreateUserController();

export const usersRouter = express.Router();

usersRouter.post('/', createUser);