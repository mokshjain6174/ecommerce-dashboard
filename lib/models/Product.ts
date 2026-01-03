import mongoose from "mongoose";

/**
 * Product Schema
 * Defines the structure and validation rules for product documents in MongoDB.
 * Using 'timestamps: true' automatically adds 'createdAt' and 'updatedAt' fields.
 */
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Unit price of the product
  price: { type: Number, required: true,min: [0, "Price cannot be negative"] },
  // Current quantity available in the warehouse
  stock: { type: Number, required: true,min: [0, "Stock cannot be negative"] },
  // Optional detailed explanation of the product
  description: { type: String },
  // Permanent HTTPS URL of the image hosted on Cloudinary
  imageUrl: { type: String },
  // Organizing field for grouping products (e.g., Electronics, Clothing)
  category: { type: String, default: "General" }, 
  // Tracks the historical number of units sold for analytics
  soldCount: { type: Number, default: 0 },
}, { timestamps: true });

/**
 * Model Initialization
 * In Next.js, files are reloaded during development (Hot Module Replacement).
 * We check if the 'Product' model already exists in mongoose.models to prevent
 * an 'OverwriteModelError'. If it doesn't exist, we create it.
 */
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;