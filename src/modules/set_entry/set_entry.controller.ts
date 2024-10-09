import { ForbiddenException } from '../auth/auth.exceptions';
import * as SetEntryService from './set_entry.service';
import { RequestHandler } from 'express';

/**
 * Handles the create set entry request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
*/
export const createSetEntry: RequestHandler = async (req, res) => {
    const setEntry = req.body;

    try {
        const result = await SetEntryService.createSetEntry(setEntry);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Handles the update set entry request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
*/
export const updateSetEntry: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userId = req.body.userId;
    const weight = req.body.weight;
    const reps = req.body.reps;

    try {
        const result = await SetEntryService.updateSetEntry(id, userId, weight, reps);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof ForbiddenException) {
            return res.status(403).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Handles the get set entries request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
*/
export const getSetEntries: RequestHandler = async (req, res) => {
    const userId = req.body.userId;
    const exerciseIdQueryParam = req.query.exerciseId;

    try {
        if (exerciseIdQueryParam) {
            const exerciseId = parseInt(exerciseIdQueryParam as string, 10);
            const setEntries = await SetEntryService.getSetEntriesByUserAndExercise(userId, exerciseId);
            return res.status(200).json(setEntries);
        } else {
            const setEntries = await SetEntryService.getSetEntries(userId);
            return res.status(200).json(setEntries);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

/**
 * Handles the delete set entry request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The RequestHandler function.
*/
export const deleteSetEntry: RequestHandler = async (req, res) => {
const idParam = req.params.id;
const userId = req.body.userId;
if (!idParam) {
    return res.status(400).json({ message: 'ID is required' });
}

const id = parseInt(idParam, 10);

try {
    const result = await SetEntryService.deleteSetEntry(id, userId);
    res.status(200).json(result);

} catch (error) {
    if (error instanceof ForbiddenException) {
        return res.status(403).json({ message: error.message });
    }


    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });

}
}