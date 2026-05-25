import * as yup from "yup";
// import { CATEGORIES, type Category } from "../constants/categories";

export const expenseSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  categoryId: yup
    .number()
    .notOneOf([0], "Category is required")
    .typeError("Category is required")
    .required("Category is required"),
  amount: yup
    .number()
    .typeError("Amount is required")
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .moreThan(0, "Amount must be greater than zero"),
});
