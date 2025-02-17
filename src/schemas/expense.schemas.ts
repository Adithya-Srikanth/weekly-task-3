import { object, number, string } from "zod";

export type Expense = {
  title: string;
  cost: number;
  date: string;
};

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),

    cost: number({
      required_error: "cost is required",
    }),
    date: string({
      required_error: "date is required",
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
};

export const createExpenseSchema = object({
  ...payload,
});

export const updateExpenseSchema = object({
  ...payload,
  ...params,
});

export const deleteExpenseSchema = object({
  ...params,
});
