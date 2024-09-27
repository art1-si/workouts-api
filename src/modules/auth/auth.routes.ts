import { Router } from 'express';
import { login, createAccount, refreshToken, logout } from './auth.controller';

export const authRoute = Router();

authRoute.post('/register', createAccount);
authRoute.post('/login', login);
authRoute.post('/refreshToken', refreshToken);
authRoute.post('/logout', logout);