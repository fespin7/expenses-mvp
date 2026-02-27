import type { Category } from "../constants/categories";

export type ExpenseInput = {
  category: Category | "";
  title: string;
  amount: number;
};
