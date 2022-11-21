import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/users.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
