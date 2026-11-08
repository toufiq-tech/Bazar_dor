"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";

const categories = [
  { name: "চাল", href: "/category/chal", icon: "🍚" },
  { name: "ডাল", href: "/category/dal", icon: "🥣" },
  { name: "তেল", href: "/category/tel", icon: "🛢️" },
  { name: "সবজি", href: "/category/sobji", icon: "🥬" },
  { name: "মাছ", href: "/category/mach", icon: "🐟" },
  { name: "মাংস", href: "/category/mangsho", icon: "🍖" },
  { name: "ডিম-দুধ", href: "/category/dim-dudh", icon: "🥛" },
  { name: "মসলা", href: "/category/moshla", icon: "🌶️" },
];

export default function Navbar() {
  const [formatedDate, setFormatedDate] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());

    setFormatedDate(date);
  }, []);

  return (
    <div className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
            <ShoppingBasket size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">
              {formatedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-700 hover:text-green-600"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="border-t bg-gray-50">
        <div className="flex items-center gap-8 overflow-x-auto px-6 py-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-700 transition hover:text-green-600"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}