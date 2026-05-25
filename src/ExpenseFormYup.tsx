import { useForm } from "react-hook-form";
import type { ExpenseInput } from "./models/ExpenseInput";
import type { Category } from "./models/Category";
import FormError from "./FormError";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseSchema } from "./validation/expense.schema";
import { CATEGORIES } from "./constants/categories";

interface ExpenseFormYupProps {
  onSubmitExpense: (expenseInput: ExpenseInput) => void;
  defaultValues?: ExpenseInput;
  onCancelEdit?: () => void;
}

const getCategories = (): Category[] => {
  return CATEGORIES.map((cat, index) => ({
    id: index + 1,
    name: cat,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  }));
};

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
    defaultValues: {
      title: "",
      amount: 0,
      categoryId: 0,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({ title: "", amount: 0, categoryId: 0 }); // ← Pasa los valores iniciales explícitamente
    }
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
        <select {...register("categoryId")}>
          <option value="0">Select Category</option>
          {getCategories().map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <FormError message={errors.categoryId.message} />}
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
