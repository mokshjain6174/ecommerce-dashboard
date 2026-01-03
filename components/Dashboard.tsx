"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";
import StockChart from "./StockChart";
import ProductList from "./ProductList";

export default function Dashboard({ products }: { products: any[] }) {
  const safeProducts = products || [];

  const [activeTab, setActiveTab] = useState("overview");

  // Calculate Stats
  const totalValue = safeProducts.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const lowStockCount = safeProducts.filter((p) => p.stock < 5).length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 🟢 SIDEBAR: Modern & Clean White Theme */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col">
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm">
            SC
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">StoreCenter</span>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 mt-4">
          
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "overview" 
                ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {/* Dashboard Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Overview
          </button>

          <button 
            onClick={() => setActiveTab("inventory")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "inventory" 
                ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {/* List Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Inventory List
          </button>

        </nav>

        {/* Bottom User Profile (Optional visual touch) */}
        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-700">Admin User</p>
              <p className="text-slate-400">Store Manager</p>
            </div>
          </div>
        </div>

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
                {/* Left Column: The Form (Takes 4 columns) */}
                <div className="lg:col-span-4">
                  <ProductForm />
                </div>

                {/* Right Column: Stats & Charts (Takes 8 columns) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
                      <h3 className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Total Inventory Value</h3>
                      <p className="text-3xl font-extrabold mt-2">${totalValue.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Action Needed</h3>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-3xl font-extrabold text-red-500">{lowStockCount}</span>
                         <span className="text-slate-600 text-sm font-medium">Low stock items</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <StockChart data={products} />
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: INVENTORY LIST */}
          {activeTab === "inventory" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
               <div className="mb-6 border-b border-slate-200 pb-4">
                 <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
                 <p className="text-slate-500">View and edit your entire product catalog</p>
               </div>
               <ProductList products={products} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}