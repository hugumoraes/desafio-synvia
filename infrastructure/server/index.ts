/* ---------- External ---------- */
import cors from 'cors';
import express, { Request, Response } from 'express';
import { logger } from '../utils/logs';

/* ---------- Routes ---------- */

/* ---------- Helpers ---------- */

/* ---------- Helpers constansts ---------- */
const port = 3333;

/**
 * Manages NodeJS server settings.
 *  ---------- */
const app = express();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(cors());

/* ---------- Routes ---------- */
app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

/* ---------- Server start ---------- */
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
