"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductValidation } from "@/lib/validations/product";
import { createProduct } from "@/lib/actions/product.actions";
import { useState, ChangeEvent } from "react";
import * as z from "zod";
import Image from "next/image";

export default function ProductForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setImagePreview(imageDataUrl);
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  // 👇 The Function to Upload to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    // ⚠️ REPLACE 'ecommerce_preset' WITH THE PRESET NAME YOU COPIED IN STEP 1
    formData.append("upload_preset", "ecommerce_preset"); 

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.secure_url; // Returns the internet link (https://res.cloudinary...)
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  async function onSubmit(values: z.infer<typeof ProductValidation>) {
    setIsUploading(true);
    try {
      let finalImageUrl = values.imageUrl;

      // If user selected a new file, upload it to Cloudinary
      if (files.length > 0) {
        finalImageUrl = await uploadToCloudinary(files[0]);
      } else {
        finalImageUrl = "https://placehold.co/600x400/png"; 
      }

      await createProduct({
        ...values,
        imageUrl: finalImageUrl,
      });

      alert("✨ Product Created Successfully!");
      form.reset();
      setImagePreview("");
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Add New Item</h3>
      
      <div className="space-y-5">
        
        {/* Image Upload */}
        <div className="flex flex-col gap-4">
            <label className="block text-sm font-semibold text-slate-600">Product Image</label>
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-indigo-100">
                 <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-full h-20 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                No image selected
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) => handleImage(e, (v) => {})} 
              suppressHydrationWarning
            />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">Product Name</label>
          <input {...form.register("name")} suppressHydrationWarning className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>

        {/* Price & Stock */}
        <div className="flex gap-6">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Price ($)</label>
            <input type="number" step="0.01" {...form.register("price")} suppressHydrationWarning className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Stock</label>
            <input type="number" {...form.register("stock")} suppressHydrationWarning className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">Description</label>
          <textarea {...form.register("description")} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none" rows={3} />
        </div>

        <button 
          type="submit" 
          disabled={isUploading || form.formState.isSubmitting}
          className="w-full py-3 px-6 rounded-lg text-white font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50"
        >
          {isUploading ? "Uploading Image..." : (form.formState.isSubmitting ? "Saving..." : "🚀 Create Product")}
        </button>
      </div>
    </form>
  );
}