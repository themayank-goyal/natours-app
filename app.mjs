import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
