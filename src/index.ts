import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Application from "./app";

import cors from "cors";

import { config } from "./config";
import log from "./utils/logger";
import createExpensesTable from "./utils/createDB";
import router from "./routes";
export const app = new Application(express(), config);

app.server.use(express.json());
app.server.use(cors());

const port = app.config.port;
app.server.listen(port, async () => {
  //db conn test
  await createExpensesTable();
  log(`server running on port:${port}`);
  router();
});
