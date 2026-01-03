"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { useRouter } from "next/navigation";


const CATEGORIES = ["Electronics", "Clothing", "Home & Garden", "Books", "Toys", "General"];

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    soldCount: initialData?.soldCount || 0,
    category: initialData?.category || "General",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👇 NEW: Handles selecting a file from your computer
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Check file size (e.g., limit to 2MB to keep DB happy)
        if (file.size > 2 * 1024 * 1024) {
            alert("File is too large. Please choose an image under 2MB.");
            return;
        }
      // Convert file to a data URL (Base64 string)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 👇 NEW: Removes the selected image
  const removeImage = () => {
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (initialData) {
      await updateProduct(initialData._id, formData);
      // router.refresh(); 
      // router.push("/");
    } else {
      await createProduct(formData);
      setFormData({ name: "", price: 0, stock: 0, soldCount: 0, category: "General", description: "", imageUrl: "" });
      router.refresh();
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        {initialData ? "Edit Product" : "Add New Item"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Product Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full mt-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Category</label>
          <select
            name="category"
            className="w-full mt-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-900"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Price ($)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full mt-1 p-2 border border-slate-200 rounded-lg outline-none text-slate-900"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Stock</label>
            <input
              type="number"
              name="stock"
              required
              min="0"
              className="w-full mt-1 p-2 border border-slate-200 rounded-lg outline-none text-slate-900"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Sold Units</label>
            <input
              type="number"
              name="soldCount"
              min="0"
              className="w-full mt-1 p-2 border border-slate-200 rounded-lg outline-none bg-slate-50 text-slate-900"
              value={formData.soldCount}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full mt-1 p-2 border border-slate-200 rounded-lg outline-none resize-none text-slate-900"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* 👇 NEW: Modern File Uploader UI */}
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
            {!formData.imageUrl ? (
                // Upload State
                <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {/* Cloud Upload Icon */}
                        <svg className="w-10 h-10 mb-3 text-slate-400 group-hover:text-indigo-500 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-1 text-sm text-slate-500 group-hover:text-indigo-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                    {/* Hidden File Input */}
                    <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                </div>
            ) : (
                // Preview State
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                    {/* Remove Button (shows on hover) */}
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all shadow-md opacity-0 group-hover:opacity-100"
                        title="Remove image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : (initialData ? "Update Product" : "Create Product")}
        </button>
      </form>
    </div>
  );
}