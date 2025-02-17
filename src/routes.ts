import { Request, Response } from "express";
import { app } from "./index";
import createIncomeHandler from "./controllers/income.controllers";
import validateRequest from "./middlewares/validate";
import {
  createExpenseSchema,
  deleteExpenseSchema,
  updateExpenseSchema,
} from "./schemas/expense.schemas";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
} from "./controllers/expense.controllers";
const router = () => {
  app.server.get("/healthCheck", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.server.post("/api/income", createIncomeHandler);
  app.server.get("/api/expenses", getExpensesHandler);
  app.server.post(
    "/api/expenses",
    validateRequest(createExpenseSchema),
    createExpenseHandler
  );

  app.server.put(
    "/api/expenses/:expense_id",
    validateRequest(updateExpenseSchema),
    updateExpenseHandler
  );
  app.server.delete(
    "/api/expenses/:expense_id",
    validateRequest(deleteExpenseSchema),
    deleteExpenseHandler
  );
};

export default router;
