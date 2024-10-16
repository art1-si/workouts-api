import { Router } from 'express';
import { getExercises } from './exercise.controller';

export const exerciseRoute = Router();

exerciseRoute.get('/exercises/:id?', getExercises);