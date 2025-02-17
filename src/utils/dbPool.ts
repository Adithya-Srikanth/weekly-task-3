import { Pool } from "pg";
import { config } from "../config";

const connPool = new Pool({
  host: config.pgHost,

  database: config.pgDatabase,
  user: config.pgUser,
  password: config.pgPassword,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default connPool;
