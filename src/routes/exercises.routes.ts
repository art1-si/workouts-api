import { Router } from 'express';

export const exercisesRoute = Router();

exercisesRoute.get('/exercises', (req, res) => {
  res.send("What's up doc ?!");
});