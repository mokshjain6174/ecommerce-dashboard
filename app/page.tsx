import ProductForm from "@/components/ProductForm";
import { getAllProducts } from "@/lib/actions/product.actions";
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Decorative Header Bar */}
      <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-5xl mx-auto p-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2 pt-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Store Command Center
          </h1>
          <p className="text-slate-500 text-lg">Manage your inventory with style</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Side: The Form (Takes up 5 columns) */}
          <div className="md:col-span-5">
            <ProductForm />
          </div>

          {/* Right Side: The List (Takes up 7 columns) */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-slate-700 border-l-4 border-indigo-500 pl-4">
              Live Inventory
            </h2>
            
            <div className="grid gap-4">
              {products && products.length > 0 ? (
                products.map((product: any) => (
                  <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
  
                    {/* 👇 NEW: Display the Product Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                      <Image 
                        src={product.imageUrl || "https://placehold.co/600x400/png"} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
                      <p className="text-slate-400 text-sm">{product.stock} units available</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* 1. Price Section */}
                      <div className="text-right">
                        <span className="block text-xl font-bold text-indigo-600">${product.price}</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                      </div>

                      {/* 2. Buttons Section (Edit + Delete) */}
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
                <div className="p-10 text-center bg-white rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400 italic">Inventory is empty. Add your first item!</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}