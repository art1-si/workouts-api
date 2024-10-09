/**
 * Exercise model.
 * @typedef {Object} Exercise
 * @property {number} id - Exercise id
 * @property {string} name - Exercise name
 * @property {string} type - Exercise type
 * @property {string} description - Exercise description
 * @property {boolean} userDefined - Whether the exercise is user defined
 * @property {Date} createdAt - Exercise creation date
 * @property {Date} updatedAt - Exercise update date
 * @property {number} definedByUserId - The user id that defined the exercise
 */
export type Exercise = {
    id: number;
    name: string;
    type: string;
    description: string;
    userDefined: boolean;
    createdAt: Date;
    updatedAt: Date;
    definedByUserId: number;
}