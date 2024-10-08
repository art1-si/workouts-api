import { execute } from "../../data_source/postgresql_database_client";
import { Exercise } from "./exercise.model";

export const getExercises = async (): Promise<Exercise[]> => {
    const sql = 'SELECT * FROM exercise';
    const result = await execute(sql);
    return result.rows;
}

export const getExerciseById = async (id: number): Promise<Exercise | null> => {
    const sql = 'SELECT * FROM exercise WHERE id = $1';
    const result = await execute(sql, [id]);
    return result.rows[0] || null;
}