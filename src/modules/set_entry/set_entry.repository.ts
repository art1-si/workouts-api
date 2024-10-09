import { SetEntry, setEntryParser } from "./set_entry.model";
import { execute } from "../../data_source/postgresql_database_client";


/**
 * Create a new set entry
 * @param exerciseId - The exercise id
 * @param userId - The user id
 * @param weight - The weight used
 * @param reps - The number of reps
 * @returns The created set entry
 * @throws {Error} When the query fails
 */
export const create = async (exerciseId: number, userId: number, weight: number, reps: number): Promise<SetEntry> => {
    const sql = 'INSERT INTO set_entry (exercise_id, user_id, weight, reps) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await execute(sql, [exerciseId, userId, weight, reps]);
    const created = result.rows[0];

    if (!created) {
        throw new Error('Failed to create set entry');
    }

    return setEntryParser(created);
};

/**
 * Update a set entry
 * @param id - The set entry id
 * @param weight - The weight used
 * @param reps - The number of reps
 * @returns The updated set entry
 * @throws {Error} When the query fails
 */
export const update = async (id: number, weight: number, reps: number): Promise<SetEntry | null> => {
    const currentTime = new Date().toISOString();
    const sql = 'UPDATE set_entry SET weight = COALESCE($1,weight), reps = COALESCE($2,reps), updated_at = $3 WHERE id = $4 RETURNING *';
    const result = await execute(sql, [weight, reps, currentTime ,id]);
    const updated = result.rows[0] || null;

    if (!updated) {
        return null;
    }

    return setEntryParser(updated);
};

/**
 * Get a set entry by ID
 * @param id - The set entry ID
 * @returns The set entry with the given ID
 * @throws {Error} When the query fails
 */
export const getById = async (id: number): Promise<SetEntry | null> => {
    const sql = 'SELECT * FROM set_entry WHERE id = $1';
    const result = await execute(sql, [id]);
    const setEntry = result.rows[0];

    if (!setEntry) {
        return null;
    }

    const parsed = setEntryParser(setEntry);

    return parsed;
};

/**
 * Get a set entry by user and exercise
 * @param userId - The user ID
 * @param exerciseId - The exercise ID
 * @returns The set entry with the given user and exercise
 * @throws {Error} When the query fails
 */
export const getByUserAndExercise = async (userId: number, exerciseId: number): Promise<SetEntry[]> => {
    const sql = 'SELECT * FROM set_entry WHERE user_id = $1 AND exercise_id = $2';
    const result = await execute(sql, [userId, exerciseId]);

    return result.rows.map(setEntryParser);
};

/**
 * Get all set entries for a user
 * @param userId - The user ID
 * @returns All set entries
 * @throws {Error} When the query fails
 */
export const getAll = async (userId: number): Promise<SetEntry[]> => {
    const sql = 'SELECT * FROM set_entry WHERE user_id = $1';
    const result = await execute(sql, [userId]);
    return result.rows.map(setEntryParser);
};

/**
 * Delete a set entry by ID
 * @param id - The set entry ID
 * @returns True if the set entry was deleted, otherwise false
 * @throws {Error} When the query fails
 */
export const deleteById = async (id : number): Promise<boolean> => {
    const sql = 'DELETE FROM set_entry WHERE id = $1';
    await execute(sql, [id]);
    return true;
}