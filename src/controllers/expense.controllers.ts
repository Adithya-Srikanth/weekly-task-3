import { Response, Request } from "express";
import { Expense } from "../schemas/expense.schemas";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../services/expense.services";
import log from "../utils/logger";
export const createExpenseHandler = async (req: Request, res: Response) => {
  const payload: Expense = req.body;
  try {
    const resId = await createExpense(payload);
    res.status(200).json({ res: resId });
  } catch (e) {
    log(`error in creating expense:${e}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getExpensesHandler = async (req: Request, res: Response) => {
  try {
    const expenses = await getExpenses();
    res.status(200).json({ res: expenses });
  } catch (e) {
    log(`error in getting expenses:${e}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExpenseHandler = async (req: Request, res: Response) => {
  const payload: Expense = req.body;
  const { expense_id } = req.params;
  try {
    const resId = await updateExpense(expense_id, payload);
    if (resId) {
      res.status(200).json({ res: resId });
    } else {
      res.status(200).json({ res: "no rows to update" });
    }
  } catch (e) {
    log(`error in getting expenses:${e}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExpenseHandler = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  try {
    const resId = await deleteExpense(expense_id);
    if (resId) {
      res.status(200).json({ res: resId });
    } else {
      res.status(200).json({ res: "no rows to delete" });
    }
  } catch (e) {
    log(`error in getting expenses:${e}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
