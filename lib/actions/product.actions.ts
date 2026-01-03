"use server";

import { connectToDB } from "../mongoose";
import Product from "@/lib/models/Product"; 
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";
/**
 * Cloudinary Configuration
 * image uploads from the server side.
 */
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Create Product
 * Handles the end-to-end process of adding a new item:
 * 1. Connects to the database.
 * 2. Uploads the image to Cloudinary if a Base64 string is provided.
 * 3. Saves the product document to MongoDB.
 * 4. Refreshes the homepage data.
 */
export async function createProduct(productData: any) {
  try {
    await connectToDB();

    // Image Upload Logic:
    if (productData.imageUrl && productData.imageUrl.startsWith("data:image")) {
       const uploadResponse = await cloudinary.uploader.upload(productData.imageUrl, {
         folder: "ecommerce_products", // Folder name in Cloudinary
       });
       // Replace the long Base64 string with the short Cloudinary URL
       productData.imageUrl = uploadResponse.secure_url;
    }

    const newProduct = await Product.create(productData);
    // Purge the Next.js cache for the homepage to show the new item immediately
    revalidatePath("/");
    return { success: true, id: newProduct._id.toString() }; 
  } catch (error) {
    console.error("Create failed:", error);
    return { success: false, message: "Failed to create product" };
  }
}

/**
 * Get All Products
 * Retrieves the entire inventory from MongoDB, sorted by newest first.
 * Uses JSON stringify/parse to prevent Next.js "Serializing" errors with Mongo IDs.
 */
export async function getAllProducts() {
  try {
    await connectToDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * Get Product By ID
 * Fetches a single product document for the Edit page or details view.
 */
export async function getProductById(productId: string) {
  try {
    await connectToDB();
    const product = await Product.findById(productId);
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Update Product
 * Updates an existing document and manages navigation/cache purging.
 */
export async function updateProduct(id: string, productData: any) {
  try {
    await connectToDB();

    // ... (Your Cloudinary & Update Logic) ...

    await Product.findByIdAndUpdate(id, productData);

    // Revalidate both the list view and the specific edit page
    revalidatePath("/"); 
    revalidatePath(`/products/${id}`);

    // Redirect to dashboard after successful update
    redirect("/"); 

  } catch (error) {
    
    // We must catch the redirect error and re-throw it, or the redirect won't happen.
    if ((error as Error).message === "NEXT_REDIRECT") {
      throw error;
    }
    
    console.error("Update failed:", error);
    return { success: false };
  }
}

/**
 * Sell Product
 * Atomically updates stock and soldCount when a sale is recorded.
 */
export async function sellProduct(productId: string, quantity: number = 1) {
  try {
    await connectToDB();
    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) return { success: false };

    product.stock -= quantity;
    product.soldCount += quantity;
    
    await product.save();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

/**
 * Delete Product
 * Permanently removes a product from the database.
 */
export async function deleteProduct(id: string) {
  try {
    await connectToDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false };
  }
}