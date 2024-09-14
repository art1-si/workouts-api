import { Router } from 'express';
import { getExercises } from '../controllers/exercise.controller';

export const exerciseRoute = Router();

exerciseRoute.get('/exercises', getExercises);