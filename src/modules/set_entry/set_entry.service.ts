import { ForbiddenException } from '../auth/auth.exceptions';
import { SetEntry } from './set_entry.model';
import * as SetEntryRepository from './set_entry.repository';

export const createSetEntry = async (setEntry: SetEntry): Promise<SetEntry> => {
    return SetEntryRepository.create(setEntry.exerciseId, setEntry.userId, setEntry.weight, setEntry.reps);
};

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

export const getSetEntriesByUserAndExercise = async (userId: number, exerciseId: number): Promise<SetEntry[]> => {
    return SetEntryRepository.getByUserAndExercise(userId, exerciseId);
};

export const getSetEntries = async (userId: number): Promise<SetEntry[]> => {
    return SetEntryRepository.getAll(userId);
};

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

