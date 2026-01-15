import { useState } from "react";
import type { ExpenseInput } from "./models/ExpenseInput";

interface ExpenseFormProps {
  onAddExpense: (expenseInput: ExpenseInput) => void;
}

type ExpenseFormErrors = {
  category?: string;
  title?: string;
  amount?: string;
};

function validate(form: ExpenseInput): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {};
  if (!form.category) {
    errors.category = "Category is required.";
  }
  if (!form.title) {
    errors.title = "Title is required.";
  }
  if (form.amount <= 0) {
    errors.amount = "Amount must be greater than zero.";
  }
  return errors;
}

const errorStyle = { color: "red", marginTop: "0", marginBottom: "0" };

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [form, setForm] = useState<ExpenseInput>({
    category: "",
    title: "",
    amount: 0,
  });
  const [errors, setErrors] = useState<ExpenseFormErrors>({});

  const handleAddExpenseClick = () => {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    onAddExpense(form);
    setForm({
      category: "",
      title: "",
      amount: 0,
    });
    setErrors({});
  };

  //   const isFormValid = Object.keys(validate(form)).length === 0;

  return (
    <div>
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      {errors.category && <p style={errorStyle}>{errors.category}</p>}
      <br />
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      {errors.title && <p style={errorStyle}>{errors.title}</p>}
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: Number(e.target.value) || 0 })
        }
      />
      {errors.amount && <p style={errorStyle}>{errors.amount}</p>}
      <br />
      <br />
      <button onClick={handleAddExpenseClick}>Add Expense</button>
    </div>
  );
}
