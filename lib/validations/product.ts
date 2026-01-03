import * as z from "zod";

/**
 * ProductValidation Schema
 * Defined using Zod, this schema provides a "source of truth" for 
 * data validation on both the client and the server.
 * * It ensures that all incoming product data follows the correct types 
 * and meets the minimum business requirements.
 */
export const ProductValidation = z.object({
  // Ensures the name is a string and long enough to be descriptive
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),

  /**
   * z.coerce.number() is used because form inputs often return 
   * values as strings. This automatically converts them to numbers 
   * for validation.
   */
  price: z.coerce.number().min(0.1, { message: "Price must be greater than 0" }),
  stock: z.coerce.number().min(0, { message: "Stock must be 0 or more" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  
  /**
   * imageUrl is optional because a user might want to save a product 
   * draft without an image initially, or the image might be handled 
   * separately during the upload process.
   */
  imageUrl: z.string().optional(), 
});