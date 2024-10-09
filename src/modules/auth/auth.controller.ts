import { RequestHandler } from "express";
import * as AuthService from './auth.service';
import { generateToken, generateRefreshToken } from './auth.service'; 
import { EmailAlreadyInUseException, InvalidCredentialsException, UserNotFoundException } from "./auth.exceptions";


/**
 * Handles the login request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
 */
export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.login(email, password);
        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.status(200).json({ user: { 
            id: user.id, 
            createdAt: user.createdAt,
            email: user.email
        },access_token: token,refresh_token: refreshToken });
    } catch (error) {
        if (error instanceof EmailAlreadyInUseException){
            return res.status(409).json({message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

/**
 * Handles the create account request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
 */
export const createAccount: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.createAccount(email, password);
        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.status(201).json({ user: { 
            id: user.id, 
            createdAt: user.createdAt,
            email: user.email
        },access_token: token,refresh_token: refreshToken });
    } catch (error) {
        if (error instanceof UserNotFoundException){
            return res.status(404).json({message: error.message });
        }
        if (error instanceof InvalidCredentialsException){
            return res.status(401).json({message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

/**
 * Handles the refresh token request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
 */
export const refreshToken: RequestHandler = async (req, res) => {
    try{
        console.log('Refreshing Token');
        res.status(200).json({ message: 'Token Refreshed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Handles the logout request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
 */
export const logout: RequestHandler = async (req, res) => {
    try{
        console.log('Logging Out');
        res.status(200).json({ message: 'Logged Out' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};