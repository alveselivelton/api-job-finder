import { config } from "dotenv";
import router from "./routes/router";
import express from "express";
import cors from "cors";

config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

const port = process.env.PORT;

import main from "../config/conn";

app.listen(port, () => {
  console.log(`API Working in port ${port}!`);
  main().catch((err) => console.log(err));
});
