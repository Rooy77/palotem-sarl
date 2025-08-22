"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
