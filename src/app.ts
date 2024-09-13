import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { exercisesRoute } from './routes/exercises.routes';




dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())

app.use('/', exercisesRoute)



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});