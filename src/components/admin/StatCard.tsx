"use client";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string; // optionnel
  positive?: boolean;
}

export default function StatCard({ title, value, icon: Icon, change, positive }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-blue-100/20 p-5 md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
            <p className="text-3xl font-bold">{value}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-sm bg-green-50 text-green-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" fill="none">
                <path
                    fill="currentColor" 
                    fillRule="evenodd" 
                    d="M6.065 1.624a.75.75 0 0 1 .558-.25h.001c.192 0 .384.073.531.22l3 2.998a.75.75 0 1 1-1.06 1.06l-1.722-1.72v6.193a.75.75 0 0 1-1.5 0v-6.19L4.155 5.654a.75.75 0 0 1-1.06-1.061z"
                    clipRule="evenodd">
                </path>
            </svg>
            {change && (
                <p className={`mt-1 text-sm ${positive ? "text-green-600" : "text-red-600"}`}>
                {change}
                </p>
            )}
        </span>
      </div>
    </div>
  );
}
