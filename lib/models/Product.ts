import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  // 👇 NEW: Category & Sales Tracking
  category: { type: String, default: "General" }, 
  soldCount: { type: Number, default: 0 },
}, { timestamps: true });

// Check if model exists before creating (Fixes hot-reload errors)
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;