import * as yup from "yup";
import type { expenseSchema } from "../validation/expense.schema";

export type ExpenseInput = yup.InferType<typeof expenseSchema>;
