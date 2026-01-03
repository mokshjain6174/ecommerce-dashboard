"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";
import StockChart from "./StockChart";
import ProductList from "./ProductList";
import CategoryPieChart from "./CategoryPieChart"; // 👈 New Import
import SalesAnalytics from "./SalesAnalytics";     // 👈 New Import

export default function Dashboard({ products }: { products: any[] }) {
  const safeProducts = products || [];
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate Stats
  const totalValue = safeProducts.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const lowStockCount = safeProducts.filter((p) => p.stock < 5).length;
  const totalProducts = safeProducts.length; // 👈 New Stat

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 🟢 SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm">
            SC
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">StoreCenter</span>
        </div>

        <nav className="p-4 space-y-1 mt-4">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "overview" ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            📊 Overview
          </button>

          <button 
            onClick={() => setActiveTab("inventory")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "inventory" ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            📦 Inventory List
          </button>

          {/* 👇 NEW: Sales Tab Button */}
          <button 
            onClick={() => setActiveTab("sales")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "sales" ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            💰 Sales Analytics
          </button>
        </nav>
      </aside>

      {/* ⚪ MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
        
          {/* VIEW 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                <p className="text-sm text-slate-400">Real-time store updates</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: The Form (4 Cols) */}
                <div className="lg:col-span-4">
                  <ProductForm />
                </div>

                {/* Right Column: Stats & Charts (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Stats Cards Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Value */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-2xl text-white shadow-lg shadow-indigo-200">
                      <h3 className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Total Value</h3>
                      <p className="text-2xl font-extrabold mt-1">${totalValue.toLocaleString()}</p>
                    </div>
                    {/* Card 2: Low Stock */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Action Needed</h3>
                      <p className="text-2xl font-extrabold mt-1 text-red-500">{lowStockCount} <span className="text-sm text-slate-400 font-normal">Low Stock</span></p>
                    </div>
                    {/* 👇 Card 3: NEW Total Products Count */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Products</h3>
                      <p className="text-2xl font-extrabold mt-1 text-slate-800">{totalProducts} <span className="text-sm text-slate-400 font-normal">Items</span></p>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
                    {/* Stock Bar Chart */}
                    <StockChart data={safeProducts} />
                    {/* 👇 NEW: Pie Chart */}
                    <CategoryPieChart products={safeProducts} />
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: INVENTORY LIST */}
          {activeTab === "inventory" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
               <div className="mb-6 border-b border-slate-200 pb-4">
                 <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
               </div>
               <ProductList products={safeProducts} />
            </div>
          )}

          {/* VIEW 3: 👇 NEW SALES TAB */}
          {activeTab === "sales" && (
             <SalesAnalytics products={safeProducts} />
          )}

        </div>
      </main>
    </div>
  );
}