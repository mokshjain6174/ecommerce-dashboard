import * as z from "zod";

export const ProductValidation = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().min(0.1, "Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  description: z.string().max(500, "Description is too long"),
});