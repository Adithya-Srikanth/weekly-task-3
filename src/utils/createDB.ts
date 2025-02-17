import { log } from "console";
import { app } from "../index";

const createExpensesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      cost INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  try {
    await app.pool.query(query);
    log("database 'expenses' created successfully");
  } catch (e) {
    log(`error creating database 'expenses':${e}`);
    process.exit(1);
  }
};

export default createExpensesTable;
