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