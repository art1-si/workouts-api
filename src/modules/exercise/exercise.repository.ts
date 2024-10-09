import { execute } from "../../data_source/postgresql_database_client";
import { Exercise } from "./exercise.model";

/**
 * Get all exercises
 * @returns All exercises
 * @throws {Error} When the query fails
 */
export const getExercises = async (): Promise<Exercise[]> => {
    const sql = 'SELECT * FROM exercise';
    const result = await execute(sql);
    return result.rows;
}

/**
 * Get an exercise by ID
 * @param id - The exercise ID
 * @returns The exercise with the given ID
 * @throws {Error} When the query fails
 */
export const getExerciseById = async (id: number): Promise<Exercise | null> => {
    const sql = 'SELECT * FROM exercise WHERE id = $1';
    const result = await execute(sql, [id]);
    return result.rows[0] || null;
}