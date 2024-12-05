import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
