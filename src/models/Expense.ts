import type { BaseEntity } from "./BaseEntity";
import type { ExpenseInput } from "./ExpenseInput";

export type Expense = BaseEntity & ExpenseInput;
