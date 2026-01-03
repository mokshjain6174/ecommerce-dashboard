"use server";

import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/Product"; 
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// ☁️ CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 1. CREATE
export async function createProduct(productData: any) {
  try {
    await connectToDB();

    // 👇 CLOUDINARY LOGIC:
    // If the image is a "Base64" string (looks like "data:image..."), upload it!
    if (productData.imageUrl && productData.imageUrl.startsWith("data:image")) {
       const uploadResponse = await cloudinary.uploader.upload(productData.imageUrl, {
         folder: "ecommerce_products", // Folder name in Cloudinary
       });
       // Replace the long Base64 string with the short Cloudinary URL
       productData.imageUrl = uploadResponse.secure_url;
    }

    const newProduct = await Product.create(productData);
    revalidatePath("/");
    return { success: true, id: newProduct._id.toString() }; 
  } catch (error) {
    console.error("Create failed:", error);
    return { success: false, message: "Failed to create product" };
  }
}

// 2. GET ALL
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

// 3. GET ONE
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

// 4. UPDATE
export async function updateProduct(id: string, productData: any) {
  try {
    await connectToDB();

    // 👇 CLOUDINARY LOGIC FOR EDITING:
    if (productData.imageUrl && productData.imageUrl.startsWith("data:image")) {
       const uploadResponse = await cloudinary.uploader.upload(productData.imageUrl, {
         folder: "ecommerce_products",
       });
       productData.imageUrl = uploadResponse.secure_url;
    }

    await Product.findByIdAndUpdate(id, productData);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false };
  }
}

// 5. SELL
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

// 6. DELETE
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