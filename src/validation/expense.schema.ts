import * as yup from "yup";

export const expenseSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  category: yup
    .string()
    .required("Category is required")
    .min(2, "Category must be at least 2 characters long")
    .max(150, "Category must be at most 150 characters long"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .moreThan(0, "Amount must be greater than zero"),
});
