"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StockChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4">📦 Stock Levels</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          // 👇 THIS IS THE FIX: Added extra margin at the bottom
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60, // 👈 Increased from default to fit long names
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            // 👇 Optional: Tweak this if names are still too long (it rotates them)
            // angle={-45}
            // textAnchor="end"
            interval={0} // Force show all labels
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`} 
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar 
            dataKey="stock" 
            fill="#6366f1" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
            // Add animation for style points
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}