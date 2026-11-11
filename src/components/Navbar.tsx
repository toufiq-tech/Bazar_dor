"use client";

import Link from "next/link";
import { ShoppingBasket, ChevronDown, UserRound, LogOut } from "lucide-react";
import NextImage from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "../lib/auth-client";
import type { Icategory } from "../types/type";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar() {
  const [formatedDate, setFormatedDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [categories, setCategories] = useState<Icategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const user = data?.user;

  // Date
  useEffect(() => {
    setFormatedDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  // Fetch Categories API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
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
    <div className="container mx-auto w-full border-b bg-white">
      {/* Main Navbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 md:px-6">
        {/* Logo & Date */}
        <Link href="/" className="min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white sm:h-10 sm:w-10">
              <ShoppingBasket size={20} />
            </div>

            <div className="min-w-0">
              <h1 className="text-base font-bold text-gray-800 sm:text-lg">
                বাজার দর
              </h1>

              <p className="text-[10px] text-gray-500 sm:text-xs">
                {formatedDate}
              </p>
            </div>
          </div>
        </Link>

        {/* Authentication */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex max-w-[190px] items-center gap-1.5 rounded-lg px-1.5 py-1.5 transition hover:bg-gray-100 sm:max-w-none sm:gap-2 sm:px-2"
              >
                {user.image ? (
                  <NextImage
                    src="/static/logo-icon.png"
                    width={36}
                    height={36}
                    alt="লোগো"
                    className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
                  />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 sm:h-9 sm:w-9">
                    <UserRound size={20} />
                  </div>
                )}

                <span className="truncate text-xs font-medium text-gray-700 sm:text-sm">
                  {user.name || user.email}
                </span>

                <ChevronDown
                  size={16}
                  className={`shrink-0 text-gray-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[min(16rem,calc(100vw-1.5rem))] rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                  {/* User Info */}
                  <div className="border-b pb-3">
                    <h3 className="break-words font-semibold text-gray-800">
                      {user.name}
                    </h3>

                    <p className="mt-1 break-all text-sm text-gray-500">
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
                      className="shrink-0 text-purple-900"
                      fill="currentColor"
                    />

                    <span>আমার প্রোফাইল</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={async () => {
                      await signOut();
                      setDropdownOpen(false);
                      router.push("/sign-in");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-500 transition hover:bg-red-50"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-500 text-white">
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
                className="text-xs font-medium text-gray-700 hover:text-green-600 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white shadow hover:bg-green-700 sm:px-5 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Dynamic Categories */}
      <div className="border-t bg-gray-50">
        <div className="flex items-center gap-2 overflow-x-auto px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 md:gap-8 md:px-6">
          {categoryLoading ? (
            <p className="shrink-0 text-sm text-gray-500">
              ক্যাটাগরি লোড হচ্ছে...
            </p>
          ) : categories.length > 0 ? (
            categories.map((category) => {
              const href = `/category/${category.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={category.id}
                  href={href}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })
          ) : (
            <p className="shrink-0 text-sm text-red-500">
              ক্যাটাগরি লোড করা যায়নি।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}