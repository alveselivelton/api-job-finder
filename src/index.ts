import { config } from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/router";

config();

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

import main from "../config/conn";

app.listen(port, () => {
  console.log(`API Working in port ${port}!`);
  main().catch((err) => console.log(err));
});
