import { useForm } from "react-hook-form";
import type { ExpenseInput } from "./models/ExpenseInput";
import FormError from "./FormError";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseSchema } from "./validation/expense.schema";

interface ExpenseFormYupProps {
  onSubmitExpense: (expenseInput: ExpenseInput) => void;
  defaultValues?: ExpenseInput | null;
  onCancelEdit?: () => void;
}

export default function ExpenseFormYup({
  onSubmitExpense,
  defaultValues,
  onCancelEdit = () => {},
}: ExpenseFormYupProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseInput>({
    resolver: yupResolver(expenseSchema),
  });

  useEffect(() => {
    reset(defaultValues ?? { category: "", title: "", amount: 0 });
  }, [defaultValues, reset]);

  const onSubmit = (data: ExpenseInput) => {
    onSubmitExpense(data);
    if (!defaultValues) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" placeholder="Category" {...register("category")} />
        {errors.category && <FormError message={errors.category.message} />}
        <br />
        <input type="text" placeholder="Title" {...register("title")} />
        {errors.title && <FormError message={errors.title.message} />}
        <br />
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          {...register("amount")}
        />
        {errors.amount && <FormError message={errors.amount.message} />}
        <br />
        <br />
        <button type="submit">
          {defaultValues ? "Update Expense" : "Add Expense"}
        </button>
        {defaultValues && (
          <button type="button" onClick={() => onCancelEdit()}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
