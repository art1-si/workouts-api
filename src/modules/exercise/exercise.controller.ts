import { RequestHandler } from "express";
import * as ExerciseService from './exercise.service';

/**
 * Handles the get exercises request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
 */
export const getExercises: RequestHandler = async (req, res) => {
    const idParam = req.params.id;

    try {
        if (idParam) {
            // Parse the id as a number
            const id = parseInt(idParam, 10);

            // Fetch a single exercise by ID
            console.log(`Fetching exercise with ID: ${id}`);
            const exercise = await ExerciseService.getExerciseById(id);

            if (!exercise) {
                return res.status(404).json({ message: 'Exercise not found' });
            }

            return res.status(200).json(exercise);
        } else {
            // Fetch all exercises
            console.log('Fetching all exercises');
            const result = await ExerciseService.getExercises();
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
 
};

