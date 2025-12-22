import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String },
  imageUrl: { type: String }, 
}, { timestamps: true }); 

// "If the model already exists, use it. Otherwise, create a new one."
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;