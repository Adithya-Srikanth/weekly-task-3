import { Expense } from "../schemas/expense.schemas";
import { app } from "../index";
export const createExpense = async (payload: Expense) => {
  const { title, cost, date } = payload;

  const query =
    "INSERT INTO expenses (title,cost, date) VALUES ($1, $2, $3) RETURNING id";
  const values = [title, cost, date];
  try {
    const res = await app.pool.query(query, values);
    return res.rows[0].id;
  } catch (e) {
    throw e;
  }
};

export const getExpenses = async () => {
  const query = "SELECT * FROM expenses";
  try {
    const res = await app.pool.query(query);
    return res.rows;
  } catch (e) {
    throw e;
  }
};

export const updateExpense = async (id: string, payload: Expense) => {
  const { title, cost, date } = payload;

  const query =
    "UPDATE expenses SET title = $1, cost = $2, date = $3 WHERE id = $4 RETURNING id";
  const values = [title, cost, date, id];

  try {
    const res = await app.pool.query(query, values);
    return res.rows.length > 0 ? res.rows[0].id : null;
  } catch (e) {
    throw e;
  }
};

export const deleteExpense = async (id: string) => {
  const query = "DELETE FROM expenses WHERE id = $1 RETURNING id";
  const values = [id];

  try {
    const res = await app.pool.query(query, values);
    return res.rows.length > 0 ? res.rows[0].id : null;
  } catch (e) {
    throw e;
  }
};
