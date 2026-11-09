"use client";

import Link from "next/link";
import {
  ShoppingBasket,
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "../lib/auth-client";
import type { Icategory } from "../types/type";

export default function Navbar() {
  const [formatedDate, setFormatedDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [categories, setCategories] = useState<Icategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data } = useSession();

  const user = data?.user;

  // Date
  useEffect(() => {
    setFormatedDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // Fetch Categories API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result: Icategory[] = await response.json();

        setCategories(result);
      } catch (error) {
        console.error("Category fetching error:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border-b bg-white">

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo & Date */}
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

        {/* Authentication */}
        <div className="flex items-center gap-6">

          {user ? (
            <div className="relative" ref={dropdownRef}>

              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <UserRound size={20} />
                  </div>
                )}

                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">

                  {/* User Info */}
                  <div className="border-b pb-3">
                    <h3 className="font-semibold text-gray-800">
                      {user.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition hover:bg-gray-100"
                  >
                    <UserRound
                      size={20}
                      className="text-purple-900"
                      fill="currentColor"
                    />

                    <span>আমার প্রোফাইল</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={async () => {
                      await signOut();
                      setDropdownOpen(false);
                      window.location.href = "/sign-in";
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-500 transition hover:bg-red-50"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-500 text-white">
                      <LogOut size={15} />
                    </span>

                    <span>লগআউট</span>
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}

        </div>
      </div>

      {/* Dynamic Categories */}
      <div className="border-t bg-gray-50">
        <div className="flex items-center gap-8 overflow-x-auto px-6 py-3">

          {categoryLoading ? (
            <p className="text-sm text-gray-500">
              ক্যাটাগরি লোড হচ্ছে...
            </p>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-700 transition hover:text-green-600"
              >
                <span>{category.icon}</span>

                <span>{category.nameBn}</span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-red-500">
              ক্যাটাগরি লোড করা যায়নি।
            </p>
          )}

        </div>
      </div>

    </div>
  );
}
