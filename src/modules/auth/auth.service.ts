import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as AuthRepository from './auth.repository';
import {EmailAlreadyInUseException, InvalidCredentialsException, UserNotFoundException} from './auth.exceptions';


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';

/**
 * Create a new user account.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The created user.
 * @throws {EmailAlreadyInUseException} When the email is already in use.
 * @throws {Error} When the query fails.
*/
export const createAccount = async (email: string, password: string) => {
    const user = await AuthRepository.findUserByUsername(email);
    if (user) {
        throw new EmailAlreadyInUseException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthRepository.createUser(email, hashedPassword);
    return newUser;
};

/**
 * Login with email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The user.
 * @throws {UserNotFoundException} When the user is not found.
 * @throws {InvalidCredentialsException} When the email, or password is invalid.
 * @throws {Error} When the query fails.
*/
export const login = async (email: string, password: string) => {
    const user = await AuthRepository.findUserByUsername(email);
    if (!user) throw new UserNotFoundException('User not found');
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new InvalidCredentialsException('Invalid password');
    
    return user;
};

/**
 * Generate a JWT token.
 * @param userId - The user ID.
 * @returns The generated token.
 */
export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

/**
 * Generate a refresh token.
 * @param userId - The user ID.
 * @returns The generated refresh token.
*/
export const generateRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

/**
 * Refresh the access token.
 * @param token - The refresh token.
 * @returns The new access token.
 * @throws {Error} When the token is invalid.
*/
export const refreshToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return generateToken(decoded.userId);
    } catch {
        throw new Error('Invalid refresh token');
    }
};