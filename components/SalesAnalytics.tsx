"use client";

import RevenueChart from "./RevenueChart"; // 👈 Import the new chart

/**
 * SalesAnalytics Component
 * Provides a high-level overview of store performance, including 
 * total revenue metrics, visual charts, and a product leaderboard.
 */
export default function SalesAnalytics({ products }: { products: any[] }) {
  /**
   * Financial Aggregation
   * Calculates the cumulative lifetime revenue by iterating through all products
   * and multiplying their individual price by the number of units sold.
   */
  const totalRevenue = products.reduce((acc, curr) => acc + (curr.soldCount * curr.price), 0);

  /**
   * Leaderboard Logic
   * 1. Creates a shallow copy of the products array.
   * 2. Sorts products by 'soldCount' in descending order.
   * 3. Filters out items with zero sales to keep the list relevant.
   * 4. Limits the results to the top 5 performers.
   */
  const topSellers = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .filter(p => p.soldCount > 0)
    .slice(0, 5); 

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* --- Page Header --- */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Sales Analytics</h2>
        <p className="text-slate-500">Revenue and performance insights</p>
      </div>

      {/* --- Key Metrics Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Hero Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
          <div className="relative z-10">
             <h3 className="text-emerald-100 text-sm font-bold uppercase tracking-wider">Total Estimated Revenue</h3>
             <p className="text-5xl font-extrabold mt-3 tracking-tight">${totalRevenue.toLocaleString()}</p>
             <p className="text-sm text-emerald-100 mt-2 opacity-80">Lifetime earnings across all categories</p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* --- Visualizations & Rankings Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Distribution Chart */}
        <RevenueChart products={products} />

        {/* Product Leaderboard Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">🏆 Top Performers</h3>
                <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">By Units Sold</span>
            </div>
            
            {topSellers.length === 0 ? (
            <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No sales recorded yet.
            </div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                    <th className="p-3 rounded-l-lg">Product</th>
                    <th className="p-3 text-right">Sold</th>
                    <th className="p-3 text-right rounded-r-lg">Earnings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {topSellers.map((product, index) => (
                    <tr key={product._id} className="group hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium text-slate-800 flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                                {index + 1}
                            </span>
                            {product.name}
                        </td>
                        <td className="p-3 text-right font-bold text-indigo-600">{product.soldCount}</td>
                        <td className="p-3 text-right text-emerald-600 font-bold">
                        ${(product.soldCount * product.price).toLocaleString()}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
      </div>

    </div>
  );
}