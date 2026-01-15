import { useForm } from "react-hook-form";
import type { ExpenseInput } from "./models/ExpenseInput";
import {
  amountRules,
  categoryRules,
  titleRules,
} from "./validation/expense.validation";

interface ExpenseFormRHFProps {
  onAddExpense: (expenseInput: ExpenseInput) => void;
}

const errorStyle = { color: "red", marginTop: "0", marginBottom: "0" };

export default function ExpenseFormRHF({ onAddExpense }: ExpenseFormRHFProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseInput>({
    defaultValues: { category: "", title: "", amount: 0 },
  });

  const onSubmit = (data: ExpenseInput) => {
    onAddExpense({ ...data, amount: Number(data.amount) });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Category"
          {...register("category", categoryRules)}
        />
        {errors.category && <p style={errorStyle}>{errors.category.message}</p>}
        <br />
        <input
          type="text"
          placeholder="Title"
          {...register("title", titleRules)}
        />
        {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
        <br />
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          {...register("amount", amountRules)}
        />
        {errors.amount && <p style={errorStyle}>{errors.amount.message}</p>}
        <br />
        <br />
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
