import { config } from "dotenv";
import router from "./routes/router";
import express from "express";
import cors from "cors";

config();

const corsConfig = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

app.use("/api", router);

import main from "../config/conn";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API Working in port ${port}! ⚡️`);
  main().catch((err) => console.log(err));
});
