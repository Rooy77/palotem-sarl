// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, FileText, PlusCircle, ShoppingCart } from "lucide-react";


const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    label : "Produits",
    href: "/admin/products",
    icon: ShoppingCart,
  },
  {
    label: "Créer un article",
    href: "/admin/create",
    icon: PlusCircle,
  },
  
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border border-gray-200 bg-white px-6 py-8 ">
      <div className="py-8 justify-center items-center">
        <a href="">
          <Image
            src="/logos/logopalotem.jpg"
            alt="PALOTEM Sarl Logo"
            width={100}
            height={100}
            className="rounded-full items-center text-center justify-center"
          />
        </a>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
      </div>
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
