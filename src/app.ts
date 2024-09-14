import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { exerciseRoute } from './routes/exercise.routes';
import './configs/env_configs';






const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(helmet())

app.use('/', exerciseRoute)



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});