import { Express } from "express";
import { Config } from "./config";
import { Pool } from "pg";
import connPool from "./utils/dbPool";
class Application {
  public readonly server: Express;
  public readonly config: Config;
  public income: number;
  public readonly month: string;
  public readonly pool: Pool = connPool;
  constructor(server: Express, config: Config) {
    this.server = server;
    this.config = config;
    this.income = 0;
    this.month = "february";
  }
}

export default Application;
