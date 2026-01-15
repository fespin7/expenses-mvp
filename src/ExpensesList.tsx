import type { Expense } from "./models/Expense";

interface ExpensesListProps {
  expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <div>
      <h2>Expenses List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} - {expense.title}: ${expense.amount} on{" "}
            {expense.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
