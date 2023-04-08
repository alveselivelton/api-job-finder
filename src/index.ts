import { config } from "dotenv";
import router from "./routes/router";
import express from "express";
import cors from "cors";

config();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/api", router);

import main from "../config/conn";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API Working in port ${port}!`);
  main().catch((err) => console.log(err));
});
