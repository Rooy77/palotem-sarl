"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 120 },
  { name: "Feb", sales: 390 },
  { name: "Mar", sales: 200 },
  { name: "Apr", sales: 310 },
  { name: "May", sales: 260 },
];

export default function Charts() {
  return (
    <div className="mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
