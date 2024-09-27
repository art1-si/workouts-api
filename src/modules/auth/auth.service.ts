import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as AuthRepository from './auth.repository';
import {EmailAlreadyInUseException, InvalidCredentialsException, UserNotFoundException} from './auth.exceptions';


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';

// Create a new account
export const createAccount = async (email: string, password: string) => {
    const user = await AuthRepository.findUserByUsername(email);
    if (user) {
        throw new EmailAlreadyInUseException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthRepository.createUser(email, hashedPassword);
    return newUser;
};

// Login an existing user
export const login = async (email: string, password: string) => {


    const user = await AuthRepository.findUserByUsername(email);
    if (!user) throw new UserNotFoundException('User not found');
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new InvalidCredentialsException('Invalid password');
    
    return user;
};

// Generate JWT token
export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

// Generate refresh token
export const generateRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

// Verify and refresh JWT token
export const refreshToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return generateToken(decoded.userId);
    } catch {
        throw new Error('Invalid refresh token');
    }
};