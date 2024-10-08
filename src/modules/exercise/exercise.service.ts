import { Exercise } from "./exercise.model";
import * as ExerciseRepository from './exercise.repository';

export const getExercises = async (): Promise<Exercise[]> => {
return ExerciseRepository.getExercises();
}

export const getExerciseById = async (id: number): Promise<Exercise | null> => {
return ExerciseRepository.getExerciseById(id);
}