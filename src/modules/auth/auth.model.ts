/**
 * User model
 * @typedef {Object} User
 * @property {number} id - User id
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {Date} createdAt - User creation date
 * @property {Date} updatedAt - User update date
*/
export type User = {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}