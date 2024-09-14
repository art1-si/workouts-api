export type Exercise = {
    id: number;
    name: string;
    type: string;
    description: string;
    userDefined: boolean;
    createdAt: Date;
    updatedAt: Date;
    definedByUserId: number;
}