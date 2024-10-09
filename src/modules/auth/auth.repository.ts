import { execute } from "../../data_source/postgresql_database_client";
import { User } from './auth.model';

/**
 * Create a new user
 * @param email - The user's email
 * @param hashedPassword - The user's hashed password
 * @returns The created user
 * @throws {Error} When the query fails
 */
export const createUser = async (email: string, hashedPassword: string): Promise<User> => {
    const sql = 'INSERT INTO workout_user (email, password) VALUES ($1, $2) RETURNING id, email';
    const result = await execute(sql, [email, hashedPassword]);
    return result.rows[0];
};

/**
 * Find a user by email
 * @param email - The user's email
 * @returns The user with the given email
 * @throws {Error} When the query fails
 */
export const findUserByUsername = async (email: string): Promise<User | null> => {
    const sql = 'SELECT * FROM workout_user WHERE email = $1';
    const result = await execute(sql, [email]);
    return result.rows[0] || null;
};

