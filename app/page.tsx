import ProductForm from "@/components/ProductForm";
import { getAllProducts } from "@/lib/actions/product.actions";
import StockChart from "@/components/StockChart";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const products = await getAllProducts();
  
  // 1. Calculate Total Inventory Value
  const totalValue = products.reduce((acc: number, curr: any) => {
    return acc + (curr.price * curr.stock);
  }, 0);
  
  // 2. Calculate Low Stock Items
  const lowStockCount = products.filter((p: any) => p.stock < 5).length;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Decorative Header Bar */}
      <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* 👇 CHANGED: 'max-w-5xl' -> 'max-w-[95%]'. This creates the Widescreen effect */}
      <div className="max-w-[95%] mx-auto p-6 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 pb-6 border-b border-slate-200 mb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-800">
              Store Command Center
            </h1>
            <p className="text-slate-500">Manage your inventory with style</p>
          </div>
          {/* Optional: You could add a user profile or date here later */}
          <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hidden md:block">
            Dashboard V1.0
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 👇 CHANGED: Made the Sidebar narrower (3 columns instead of 5) */}
          <div className="lg:col-span-3">
             <div className="sticky top-10"> {/* Makes form stick while scrolling! */}
               <ProductForm />
             </div>
          </div>

          {/* 👇 CHANGED: Made the Content Area wider (9 columns instead of 7) */}
          <div className="lg:col-span-9 space-y-6">

            {/* FINANCIAL CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200 col-span-1 md:col-span-2">
                <h3 className="text-indigo-200 text-sm font-medium uppercase">Total Inventory Value</h3>
                <p className="text-4xl font-bold mt-2">${totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm col-span-1 md:col-span-2 flex items-center justify-between">
                 <div>
                    <h3 className="text-slate-500 text-sm font-medium uppercase">Low Stock Alerts</h3>
                    <p className="text-4xl font-bold mt-2 text-red-500">{lowStockCount}</p>
                 </div>
                 <span className="text-3xl">⚠️</span>
              </div>
            </div>

            {/* CHART BLOCK */}
            <div className="mb-6">
              <StockChart data={products} />
            </div>

            {/* THE SMART SEARCHABLE LIST */}
            <ProductList products={products} />

          </div>
        </div>

      </div>
    </main>
  );
}