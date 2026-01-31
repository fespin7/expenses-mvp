import type { Expense } from "./models/Expense";

interface ExpensesListProps {
  expenses: Expense[];
  onEditExpense: (expense: Expense) => void;
}

export default function ExpensesList({
  expenses,
  onEditExpense,
}: ExpensesListProps) {
  return (
    <div>
      <h2>Expenses List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} - {expense.title}: ${expense.amount} on{" "}
            {expense.dateCreated.toLocaleDateString()} -{" "}
            <a href="#" onClick={() => onEditExpense(expense)}>
              Edit
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
