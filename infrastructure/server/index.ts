/* ---------- External ---------- */
import cors from 'cors';
import express, { Request, Response } from 'express';

/* ---------- Routes ---------- */

/* ---------- Helpers ---------- */

/* ---------- Helpers constansts ---------- */
const port = 3333;

/* ---------- Server ---------- */
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
  console.log(`Server started on port ${port}`);
});
