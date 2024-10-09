export type SetEntry = {
    id: number;
    userId: number;
    exerciseId: number;
    weight: number;
    reps: number;
    createdAt: string;
    updatedAt: string;
};

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