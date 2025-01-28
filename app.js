import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/config/db.js";
import routes from "./src/routes/index.js";

dotenv.config();
const app = express();

connectDb();

app.use(express.json());

app.use("/api", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is listen on ${port}`);
});
