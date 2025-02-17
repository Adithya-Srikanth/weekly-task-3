import { app } from "../index";
import { Request, Response } from "express";
const createIncomeHandler = (req: Request, res: Response) => {
  try {
    const { income } = req.body;
    const incomeNumerical = parseInt(income);
    if (app.income === 0) {
      app.income = incomeNumerical;
      res.status(200).json({ status: "ok" });
      return;
    }
    res.status(400).json({ error: "income has been set already" });
  } catch (e: any) {
    res.status(400).json({ error: e });
  }
};

export default createIncomeHandler;
