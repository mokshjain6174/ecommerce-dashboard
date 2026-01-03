"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

//Modern colors for the chart slices
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

export default function CategoryPieChart({ products }: { products: any[] }) {
  /**
   * Data Transformation (Grouping)
   * We use .reduce() to count how many products belong to each category.
   * Example Result: { "Electronics": 5, "Clothing": 3 }
   */
  const dataMap = products.reduce((acc, curr) => {
    const cat = curr.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  /**
   * Recharts Formatting
   * Converts the map into an array of objects that Recharts can read.
   */
  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));
// Render a fallback message if the inventory is empty
  if (data.length === 0) return <p className="text-slate-400 text-sm">No data yet</p>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Category Distribution</h3>
      <div className="h-64 w-full">
        {/* ResponsiveContainer ensures the chart resizes based on the parent div width */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60} // Makes it a "Donut" chart (looks modern)
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
            {/* Maps each slice to a specific color from our constant array */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* Interactive elements: Hover tooltips and a bottom legend */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
