import type { Expense } from "./models/Expense";

interface ExpensesSummaryProps {
  expenses: Expense[];
}

export default function ExpensesSummary({ expenses }: ExpensesSummaryProps) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return <div>Total Expenses: ${total}</div>;
}
