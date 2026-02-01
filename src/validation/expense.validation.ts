export const categoryRules = {
  required: "Category is required.",
  validate: (value: string) => value.trim() !== "" || "Category is required.",
};

export const titleRules = {
  required: "Title is required.",
  validate: (value: string) => value.trim() !== "" || "Title is required.",
};

export const amountRules = {
  valueAsNumber: true,
  required: "Amount is required.",
  min: { value: 0.01, message: "Amount must be greater than 0." },
};
