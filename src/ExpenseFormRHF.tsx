import { useForm } from "react-hook-form";
import type { ExpenseInput } from "./models/ExpenseInput";
import {
  amountRules,
  categoryRules,
  titleRules,
} from "./validation/expense.validation";
import FormError from "./FormError";
import { useEffect } from "react";

interface ExpenseFormRHFProps {
  onSubmitExpense: (expenseInput: ExpenseInput) => void;
  defaultValues?: ExpenseInput | null;
  onCancelEdit?: () => void;
}

export default function ExpenseFormRHF({
  onSubmitExpense,
  defaultValues,
  onCancelEdit = () => {},
}: ExpenseFormRHFProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseInput>({
    defaultValues: defaultValues ?? { category: "", title: "", amount: 0 },
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
        <input
          type="text"
          placeholder="Category"
          {...register("category", categoryRules)}
        />
        {errors.category && <FormError message={errors.category.message} />}
        <br />
        <input
          type="text"
          placeholder="Title"
          {...register("title", titleRules)}
        />
        {errors.title && <FormError message={errors.title.message} />}
        <br />
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          {...register("amount", amountRules)}
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
