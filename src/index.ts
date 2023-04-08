import { config } from "dotenv";
import router from "./routes/router";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

config();

app.use("/api", router);

import main from "../config/conn";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API Working in port ${port}! ⚡️`);
  main().catch((err) => console.log(err));
});
