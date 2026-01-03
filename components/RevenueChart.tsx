"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

/**
 * RevenueChart Component
 * Visualizes the total revenue generated per product category.
 * Revenue is calculated as: (Price * Sold Units).
 */
export default function RevenueChart({ products }: { products: any[] }) {
  /**
   * Data Aggregation Logic
   * We reduce the products array into a map where keys are categories
   * and values are the sum of revenue (price * soldCount) for that category.
   */
  const categoryMap = products.reduce((acc: any, curr: any) => {
    const cat = curr.category || "General";
    const revenue = curr.soldCount * curr.price;
    acc[cat] = (acc[cat] || 0) + revenue;
    return acc;
  }, {});

  /**
   * Recharts Formatting
   * Converts the category map into an array of objects required by the BarChart.
   */
  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    revenue: categoryMap[key],
  }));

  // Render a fallback message if no sales data is present
  if (data.length === 0) {
    return <div className="text-center text-slate-400 py-10">No sales data yet</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-6">💸 Revenue by Category</h3>
      {/* ResponsiveContainer ensures the chart fills its parent container dynamically */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            {/* Horizontal grid lines only for a clean, modern dashboard look */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            {/* X-Axis: Displays category names */}
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              dy={10}
            />
            
            {/* Y-Axis: Displays revenue values with dollar sign formatting */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value}`} 
            />
            
            {/* Custom Interactive Tooltip */}
            <Tooltip 
              cursor={{ fill: '#f0fdf4' }} 
              
              formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            
            {/* Bar Styling: Rounded top corners and alternating shades of emerald */}
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#10b981" : "#34d399"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}