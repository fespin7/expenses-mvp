import { useState } from "react";
import type { Expense } from "./models/Expense";
import ExpensesList from "./ExpensesList";
// import ExpenseForm from "./ExpenseForm";
import ExpensesSummary from "./ExpensesSummary";
import type { ExpenseInput } from "./models/ExpenseInput";
import ExpenseFormRHF from "./ExpenseFormRHF";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  function addOrEditExpense(input: ExpenseInput) {
    if (!input.category || !input.title || input.amount <= 0) {
      // alert("Please fill in all fields correctly.");
      return;
    }

    if (editingExpense) {
      const updatedExpense: Expense = {
        ...editingExpense,
        ...input,
        dateUpdated: new Date(),
      };
      setExpenses(
        expenses.map((exp) =>
          exp.id === editingExpense.id ? updatedExpense : exp,
        ),
      );
      setEditingExpense(null);
    } else {
      const newExpense: Expense = {
        id: Date.now(),
        dateCreated: new Date(),
        dateUpdated: new Date(),
        ...input,
      };
      setExpenses([...expenses, newExpense]);
    }
  }

  function editExpense(updatedExpense: Expense) {
    console.log("Editing expense:", updatedExpense);
    setEditingExpense(updatedExpense);
  }

  function getExpenseInput(
    edittingExpense: Expense | null,
  ): ExpenseInput | null {
    if (!edittingExpense) return null;
    return {
      title: edittingExpense.title,
      amount: edittingExpense.amount,
      category: edittingExpense.category,
    } as ExpenseInput;
  }

  return (
    <>
      <div style={{ padding: "1rem", maxWidth: 400 }}>
        <h1>Expense Tracker</h1>
        {/* <ExpenseForm onAddExpense={addExpense} /> */}
        <ExpenseFormRHF
          onSubmitExpense={addOrEditExpense}
          defaultValues={getExpenseInput(editingExpense)}
        />
        <hr />
        <ExpensesList expenses={expenses} onEditExpense={editExpense} />
        <ExpensesSummary expenses={expenses} />
      </div>
    </>
  );
}

export default App;
