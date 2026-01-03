"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({ data }: { data: any[] }) {
  // 1. Prepare Data
  const chartData = data.map((item) => ({
    name: item.name,
    stock: item.stock,
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-full text-slate-400">
        No stock data available
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6">📦 Stock Levels</h3>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            // 👇 ADDED SPACE: Increased margins so text isn't cut off
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {/* Soft Grid Lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} // Lighter & Smaller font
              dy={15} // Pushes text down slightly for breathing room
              tickFormatter={(value) => value.length > 8 ? `${value.slice(0, 8)}..` : value}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
            
            <Bar 
              dataKey="stock" 
              fill="#6366f1" 
              radius={[6, 6, 0, 0]} // Softer rounded corners
              barSize={32}          // Thinner, more elegant bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}