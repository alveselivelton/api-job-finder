import { config } from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/router";

config();

const app = express();

app.use(
  cors({ credentials: true, origin: "https://api-job-finder.vercel.app" })
);

app.use(express.json());

app.use("/api", router);

import main from "../config/conn";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API Working in port ${port}!`);
  main().catch((err) => console.log(err));
});
