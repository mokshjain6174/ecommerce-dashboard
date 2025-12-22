"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductValidation } from "@/lib/validations/product";
import { createProduct } from "@/lib/actions/product.actions";
import { useState, ChangeEvent } from "react"; // 👈 New Import
import * as z from "zod";
import Image from "next/image"; // 👈 New Import

export default function ProductForm() {
  const [files, setFiles] = useState<File[]>([]); // Store the file
  const [imagePreview, setImagePreview] = useState(""); // Show the preview

  const form = useForm({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  // 👇 This magic function converts the Photo to Text
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
        fieldChange(imageDataUrl); // Tell the form we have an image
      };

      fileReader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof ProductValidation>) {
    try {
      // Send the Real Image (imagePreview) instead of the placeholder
      await createProduct({
        ...values,
        imageUrl: imagePreview || "https://placehold.co/600x400/png", 
      });
      alert("✨ Product Created Successfully!");
      form.reset();
      setImagePreview(""); // Clear the preview
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  }

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Add New Item</h3>
      
      <div className="space-y-5">
        
        {/* 👇 NEW IMAGE UPLOAD SECTION */}
        <div className="flex flex-col gap-4">
            <label className="block text-sm font-semibold text-slate-600">Product Image</label>
            
            {/* The Image Preview Box */}
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-indigo-100">
                 <Image 
                   src={imagePreview} 
                   alt="Preview" 
                   fill 
                   className="object-cover"
                 />
              </div>
            ) : (
              <div className="w-full h-20 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                No image selected
              </div>
            )}

            {/* The Hidden Input Trick */}
            <input
              type="file"
              accept="image/*"
              placeholder="Upload Image"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) => handleImage(e, (v) => {})} 
              suppressHydrationWarning
            />
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">Product Name</label>
          <input 
            {...form.register("name")} 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium" 
          />
        </div>

        {/* Price & Stock Row */}
        <div className="flex gap-6">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Price ($)</label>
            <input 
              type="number" 
              step="0.01" 
              {...form.register("price")} 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium" 
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Stock</label>
            <input 
              type="number" 
              {...form.register("stock")} 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium" 
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">Description</label>
          <textarea 
            {...form.register("description")} 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium" 
            rows={3} 
          />
        </div>

        <button 
          type="submit" 
          disabled={form.formState.isSubmitting}
          className="w-full py-3 px-6 rounded-lg text-white font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
        >
          {form.formState.isSubmitting ? "Uploading..." : "🚀 Create Product"}
        </button>
      </div>
    </form>
  );
}