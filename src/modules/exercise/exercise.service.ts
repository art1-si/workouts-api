import { Exercise } from "./exercise.model";
import * as ExerciseRepository from './exercise.repository';

/**
 * Get all exercises
 * @returns All exercises
 */
export const getExercises = async (): Promise<Exercise[]> => {
return ExerciseRepository.getExercises();
}

/**
 * Get an exercise by ID
 * @param id - The exercise ID
 * @returns The exercise with the given ID
 */
export const getExerciseById = async (id: number): Promise<Exercise | null> => {
return ExerciseRepository.getExerciseById(id);
}