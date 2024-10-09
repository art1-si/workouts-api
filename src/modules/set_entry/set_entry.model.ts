/**
 * Object representing a set entry.
 * @typedef {Object} SetEntry
 * @property {number} id - Set entry id
 * @property {number} userId - User id
 * @property {number} exerciseId - Exercise id
 * @property {number} weight - Weight used
 * @property {number} reps - Number of reps
 * @property {string} createdAt - Set entry creation date
 * @property {string} updatedAt - Set entry update date
 */
export type SetEntry = {
    id: number;
    userId: number;
    exerciseId: number;
    weight: number;
    reps: number;
    createdAt: string;
    updatedAt: string;
};

/**
 * Method for parsing a set entry object with snake type case.
 * @param setEntry 
 * @returns The set entry object with camel case.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setEntryParser = (setEntry: any): SetEntry => {
    return {
        id: setEntry.id,
        userId: setEntry.user_id,
        exerciseId: setEntry.exercise_id,
        weight: setEntry.weight,
        reps: setEntry.reps,
        createdAt: setEntry.created_at,
        updatedAt: setEntry.updated_at,
    };
}