"use client";

export default function SalesAnalytics({ products }: { products: any[] }) {
  // 1. Calculate Total Revenue
  const totalRevenue = products.reduce((acc, curr) => acc + (curr.soldCount * curr.price), 0);

  // 2. Find Top Selling Products (Sort by soldCount high-to-low)
  const topSellers = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .filter(p => p.soldCount > 0)
    .slice(0, 5); // Top 5 only

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Sales Analytics</h2>
        <p className="text-slate-500">Revenue and performance insights</p>
      </div>

      {/* Revenue Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
          <h3 className="text-emerald-100 text-sm font-bold uppercase tracking-wider">Total Estimated Revenue</h3>
          <p className="text-4xl font-extrabold mt-2">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-emerald-100 mt-1 opacity-80">Based on sold units</p>
        </div>
      </div>

      {/* Top Sellers Leaderboard */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">🏆 Top Performing Products</h3>
        
        {topSellers.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-lg">
            No sales yet. Start selling items to see data here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Product</th>
                  <th className="p-3 text-right">Units Sold</th>
                  <th className="p-3 text-right">Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topSellers.map((product, index) => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-400">#{index + 1}</td>
                    <td className="p-3 font-medium text-slate-800 flex items-center gap-3">
                      {/* Product Image (Small) */}
                      {product.imageUrl && (
                         <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden">
                            <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                         </div>
                      )}
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
  );
}