import { useState } from "react";
import type { Expense } from "./models/Expense";
import ExpensesList from "./ExpensesList";
// import ExpenseForm from "./ExpenseForm";
import ExpensesSummary from "./ExpensesSummary";
import type { ExpenseInput } from "./models/ExpenseInput";
import ExpenseFormRHF from "./ExpenseFormRHF";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense(input: ExpenseInput) {
    if (!input.category || !input.title || input.amount <= 0) {
      // alert("Please fill in all fields correctly.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      date: new Date(),
      ...input,
    };
    setExpenses([...expenses, newExpense]);
  }

  return (
    <>
      <div style={{ padding: "1rem", maxWidth: 400 }}>
        <h1>Expense Tracker</h1>
        {/* <ExpenseForm onAddExpense={addExpense} /> */}
        <ExpenseFormRHF onAddExpense={addExpense} />
        <hr />
        <ExpensesList expenses={expenses} />
        <ExpensesSummary expenses={expenses} />
      </div>
    </>
  );
}

export default App;
