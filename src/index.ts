import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

// Routes module
import authRoutes from '@routes/auth';
import userRoutes from '@routes/userRoutes';
import todoRoutes from '@routes/todoRoutes';
import { corsOptions } from './configs/corsOptions';
import { credentials } from './middlewares/credentials';

const app = express();

// Middleware init
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes init
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

export default app;
