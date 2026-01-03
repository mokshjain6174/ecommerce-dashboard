"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default function ProductList({ products }: { products: any[] }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="border-l-4 border-indigo-600 pl-3">
          <h3 className="text-xl font-bold text-slate-800">Live Inventory</h3>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-slate-400 py-10">No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <h4 className="font-bold text-slate-800">{product.name}</h4>
                  <p className="text-sm text-slate-500">
                    {product.stock} units available 
                    {product.stock < 5 && <span className="text-red-500 font-bold ml-1">•</span>}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-bold text-indigo-600">${product.price}</p>
                  
                  {product.stock < 5 ? (
                    <span className="text-[10px] uppercase font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center gap-1">
                      ⚠️ Low Stock
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                   <Link href={`/products/${product._id}`}>
                     <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                     </button>
                   </Link>
                   {/* 👇 THE FIX: Used 'id' instead of 'productId' */}
                   <DeleteButton id={product._id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}