import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { exerciseRoute } from './modules/exercise/exercise.routes';
import { authRoute } from './modules/auth/auth.routes';


import './configs/env_configs';
import { verifyToken } from './modules/auth/auth.middleware';






const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(helmet())

// Pre-authentication routes
app.use('/', authRoute)

// Post-authentication routes
app.use('/', verifyToken)
app.use('/', exerciseRoute)



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});