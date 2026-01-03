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

/**
 * StockChart Component
 * Visualizes current inventory levels using a Bar Chart.
 * This helps administrators quickly identify which products are well-stocked 
 * and which are nearing depletion.
 */
export default function StockChart({ data }: { data: any[] }) {
  /**
   * Data Preparation
   * Extracts the necessary fields (name and stock) from the product objects
   * to create a clean dataset specifically for Recharts consumption.
   */
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
        {/* ResponsiveContainer allows the chart to scale with the dashboard grid */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {/* Background Grid: Horizontal lines only for a modern, clean look */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            {/* X-Axis Configuration */}
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              dy={15}
              tickFormatter={(value) => value.length > 8 ? `${value.slice(0, 8)}..` : value}
            />
            {/* Y-Axis Configuration */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            
            {/* Custom Interactive Tooltip */}
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                backgroundColor: '#ffffff',
              }}
              /* Styles for data points inside the tooltip */
              itemStyle={{ color: '#1e293b', fontWeight: 'bold' }} 
              labelStyle={{ color: '#64748b', marginBottom: '0.25rem' }}
            />
            
            {/* Bar Styling: Rounded top corners and Indigo brand color */}
            <Bar 
              dataKey="stock" 
              fill="#6366f1" 
              radius={[6, 6, 0, 0]} 
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}