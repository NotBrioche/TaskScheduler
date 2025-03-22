import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { router } from './routes/routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
