"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default function ProductList({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 The Magic Filter Logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. The Search Bar & Title */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-l-4 border-indigo-500 pl-4">
        <h2 className="text-2xl font-bold text-slate-700">Live Inventory</h2>
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="🔍 Search products..." 
          // 👇 UPDATED: Added 'text-slate-900' and 'placeholder:text-slate-500'
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full sm:w-64 text-slate-900 placeholder:text-slate-500 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 2. The Grid List */}
      <div className="grid gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
              
              {/* Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                <Image
                  src={product.imageUrl || "https://placehold.co/600x400/png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name & Stock */}
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
                <p className="text-slate-400 text-sm">{product.stock} units available</p>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <span className="block text-xl font-bold text-indigo-600">${product.price}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={`/products/${product._id}`} 
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </Link>
                  <DeleteButton id={product._id.toString()} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400 italic">
            No products match your search.
          </div>
        )}
      </div>
    </div>
  );
}