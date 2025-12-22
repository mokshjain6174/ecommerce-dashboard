"use server"; // IMPORTANT: This creates a secure server environment

import { connectToDB } from "../mongoose";
import Product from "../models/Product";
import { revalidatePath } from "next/cache";

// Function 1: Create a new product
export async function createProduct(productData: any) {
  try {
    await connectToDB();

    const newProduct = await Product.create(productData);

    // Refresh the dashboard data immediately
    revalidatePath("/"); 

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

// Function 2: Get all products
export async function getAllProducts() {
  try {
    await connectToDB();
    
    // Find all products and sort them by newest first
    const products = await Product.find().sort({ createdAt: -1 });
    
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// 👇 Add this at the bottom of the file
export async function deleteProduct(id: string) {
  try {
    await connectToDB();
    
    // 1. Delete the item
    await Product.findByIdAndDelete(id);
    
    // 2. Refresh the page data automatically
    revalidatePath('/'); 
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete:", error);
    return { success: false };
  }
}

// 👇 Update an existing product
export async function updateProduct(id: string, productData: any) {
  try {
    await connectToDB();

    // Find the product by ID and update it with new data
    await Product.findByIdAndUpdate(id, productData);
    
    // Refresh the page to show new details
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false };
  }
}

// 👇 Fetch a single product (so we can fill the form later)
export async function getProductById(id: string) {
  try {
    await connectToDB();
    const product = await Product.findById(id);
    if (!product) return null;
    return JSON.parse(JSON.stringify(product)); // Convert to clean JSON
  } catch (error) {
    console.error(error);
    return null;
  }
}