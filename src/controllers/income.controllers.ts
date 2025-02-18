import { app } from "../index";
import { Request, Response } from "express";
export const createIncomeHandler = (req: Request, res: Response) => {
  try {
    const { income } = req.body;
    const incomeNumerical = parseInt(income);

    app.income = incomeNumerical;
    res.status(200).json({ status: "ok" });
  } catch (e: any) {
    res.status(400).json({ error: e });
  }
};

export const getIncomeHandler = (req: Request, res: Response) => {
  res.status(200).json({ income: app.income });
};
