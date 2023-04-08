import { config } from "dotenv";
import router from "./routes/router";
import express from "express";
// import cors from "cors";

config();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/api", router);

import main from "../config/conn";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API Working in port ${port}!`);
  main().catch((err) => console.log(err));
});
