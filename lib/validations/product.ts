import * as z from "zod";

export const ProductValidation = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  price: z.coerce.number().min(0.1, { message: "Price must be greater than 0" }),
  stock: z.coerce.number().min(0, { message: "Stock must be 0 or more" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  
  // 👇 WE ADDED THIS LINE:
  imageUrl: z.string().optional(), 
});