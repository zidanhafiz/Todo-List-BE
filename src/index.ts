import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { corsOptions } from './configs/corsOptions';
import { credentials } from './middlewares/credentials';
import { isAuthenticate, verifyJWT } from './middlewares';

// Routes module
import authRoutes from '@routes/auth';
import userRoutes from '@routes/userRoutes';
import todoRoutes from '@routes/todoRoutes';

const app = express();

// Middlewares init
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Auth route
app.use('/auth', authRoutes);

// Middleware for check the authentication
app.use(verifyJWT);
app.use(isAuthenticate);

// API or other routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

export default app;
