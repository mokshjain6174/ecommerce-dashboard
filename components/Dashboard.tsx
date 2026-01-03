"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";
import StockChart from "./StockChart";
import ProductList from "./ProductList";
import CategoryPieChart from "./CategoryPieChart";
import SalesAnalytics from "./SalesAnalytics";

export default function Dashboard({ products }: { products: any[] }) {
  const safeProducts = products || [];
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate Stats
  const totalValue = safeProducts.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const lowStockCount = safeProducts.filter((p) => p.stock < 5).length;
  const totalProducts = safeProducts.length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 🟢 SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col">
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          {/* 👇 CHANGED: 'SC' to 'AP' */}
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm">
            AP
          </div>
          {/* 👇 CHANGED: 'StoreCenter' to 'ADMIN PANEL' */}
          <span className="text-lg font-bold text-slate-800 tracking-tight">ADMIN PANEL</span>
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
            {/* 👇 CHANGED: 'Overview' to 'Dashboard' */}
            Dashboard
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

          <button 
            onClick={() => setActiveTab("sales")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "sales" ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {/* Chart Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Sales Analytics
          </button>

        </nav>

        {/* Bottom User Profile */}
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
        
          {/* VIEW 1: DASHBOARD (Formerly Overview) */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-end mb-2">
                {/* 👇 CHANGED: 'Overview' to 'Dashboard' */}
                <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
                <p className="text-sm text-slate-400">Real-time store updates</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: The Form */}
                <div className="lg:col-span-4">
                  <ProductForm />
                </div>

                {/* Right Column: Stats & Charts */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-2xl text-white shadow-lg shadow-indigo-200">
                      <h3 className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Total Value</h3>
                      <p className="text-2xl font-extrabold mt-1">${totalValue.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Action Needed</h3>
                      <p className="text-2xl font-extrabold mt-1 text-red-500">{lowStockCount} <span className="text-sm text-slate-400 font-normal">Low Stock</span></p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Products</h3>
                      <p className="text-2xl font-extrabold mt-1 text-slate-800">{totalProducts} <span className="text-sm text-slate-400 font-normal">Items</span></p>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
                    <StockChart data={safeProducts} />
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

          {/* VIEW 3: SALES ANALYTICS */}
          {activeTab === "sales" && (
             <SalesAnalytics products={safeProducts} />
          )}

        </div>
      </main>
    </div>
  );
}