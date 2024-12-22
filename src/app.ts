import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3500;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const routes = require("./routes/routes");
app.use("/order", routes);

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
