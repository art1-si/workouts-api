import { ForbiddenException } from '../auth/auth.exceptions';
import { SetEntry } from './set_entry.model';
import * as SetEntryRepository from './set_entry.repository';

/**
 * Create a new set entry.
 * @param setEntry - The set entry object.
 * @returns The newly created set entry.
 */
export const createSetEntry = async (setEntry: SetEntry): Promise<SetEntry> => {
    return SetEntryRepository.create(setEntry.exerciseId, setEntry.userId, setEntry.weight, setEntry.reps);
};

/**
 * Update a set entry.
 * @param id - The set entry id.
 * @param userId - The user id.
 * @param weight - The weight used.
 * @param reps - The number of reps.
 * @returns The updated set entry.
 */
export const updateSetEntry = async (id: number, userId: number, weight: number | null, reps: number | null): Promise<SetEntry | null> => {
    const existingSetEntry = await SetEntryRepository.getById(id);
    if (!existingSetEntry) {
        return null;
    }
    if (existingSetEntry.userId !== userId) {
        throw new ForbiddenException('Forbidden: Not sufficient permissions. Only user who created the set entry can update it.');
    }

    return SetEntryRepository.update(id, weight, reps);
};

/**
 * Get all set entries by user and exercise.
 * @param userId - The user id.
 * @param exerciseId - The exercise id.
 * @returns All set entries by user and exercise.
 */
export const getSetEntriesByUserAndExercise = async (userId: number, exerciseId: number): Promise<SetEntry[]> => {
    return SetEntryRepository.getByUserAndExercise(userId, exerciseId);
};

/**
 * Get all set entries.
 * @param userId - The user id.
 * @returns All set entries.
 */
export const getSetEntries = async (userId: number): Promise<SetEntry[]> => {
    return SetEntryRepository.getAll(userId);
};

/**
 * Delete a set entry.
 * @param id - The set entry id.
 * @param userId - The user id.
 * @returns True if the set entry was deleted, false otherwise.
 */
export const deleteSetEntry = async (id: number, userId: number): Promise<boolean> => {
    const existingSetEntry = await SetEntryRepository.getById(id);
    if (!existingSetEntry) {
        return false;
    }
    if (existingSetEntry.userId !== userId) {
        throw new ForbiddenException('Forbidden: Not sufficient permissions. Only user who created the set entry can delete it.');
    }
    return SetEntryRepository.deleteById(id);
};

