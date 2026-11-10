"use client";

import { useEffect, useMemo, useState } from "react";
import type { Icategory, Iproduct } from "../../../types/type";

interface CategoryClientProps {
  slug: string;
}

type SortOrder = "default" | "low-to-high" | "high-to-low";

export default function CategoryClient({
  slug,
}: CategoryClientProps) {
  const [category, setCategory] = useState<Icategory | null>(null);
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  // Fetch Category and Products
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError("");

        setCategory(null);
        setProducts([]);
        setSortOrder("default");

        const [categoryResponse, productResponse] = await Promise.all([
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`
          ),
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
          ),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch category data");
        }

        const categoryResult = await categoryResponse.json();
        const productResult = await productResponse.json();

        // Category Data
        const categoryData: Icategory =
          categoryResult.data ?? categoryResult.category ?? categoryResult;

        // Product Data
        const productData: Iproduct[] = Array.isArray(productResult)
          ? productResult
          : Array.isArray(productResult.data)
          ? productResult.data
          : productResult.data?.products ?? productResult.products ?? [];

        setCategory(categoryData);
        setProducts(productData);

      } catch (error) {
        console.error("Category fetching error:", error);
        setError("ক্যাটাগরির তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  // Sorting Products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortOrder === "low-to-high") {
      sorted.sort((a, b) => a.today - b.today);
    }

    if (sortOrder === "high-to-low") {
      sorted.sort((a, b) => b.today - a.today);
    }

    return sorted;
  }, [products, sortOrder]);

  return (
    <main className="min-h-screen bg-[#f1f7f2] px-4 py-8">

      <div className="mx-auto max-w-6xl">

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-500">
              ক্যাটাগরির তথ্য লোড হচ্ছে...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-xl bg-white py-12 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : category ? (
          <>

            {/* Category Header */}
            <section className="mb-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-[#fbfdfb] px-4 py-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f2] text-2xl">
                {category.icon}
              </div>

              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  {category.nameBn}
                </h1>

                <p className="text-xs text-gray-500">
                  {category.nameBn} পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>

            </section>

            {/* Sorting */}
            <section className="mb-3 flex items-center justify-end rounded-xl border border-gray-200 bg-[#fbfdfb] px-4 py-3">

              <div className="flex items-center gap-2">

                <label
                  htmlFor="sort"
                  className="text-xs text-gray-500"
                >
                  সাজান
                </label>

                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as SortOrder)
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-600"
                >
                  <option value="default">ডিফল্ট</option>

                  <option value="low-to-high">
                    দাম: কম থেকে বেশি
                  </option>

                  <option value="high-to-low">
                    দাম: বেশি থেকে কম
                  </option>
                </select>

              </div>

            </section>

            {/* Product Count */}
            <p className="mb-3 text-xs text-gray-500">
              মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

                {sortedProducts.map((product) => (

                  <div
                    key={product.id}
                    className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:shadow-md"
                  >

                    {/* Product Information */}
                    <div className="mb-3 flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f7f2] text-xl">
                        {product.image || product.categoryIcon}
                      </div>

                      <div className="min-w-0 flex-1">

                        <h2 className="truncate text-sm font-semibold text-gray-800">
                          {product.nameBn}
                        </h2>

                        <p className="mt-0.5 text-[10px] text-gray-500">
                          প্রতি {product.unit}
                        </p>

                      </div>

                    </div>

                    {/* Price Information */}
                    <div className="flex items-end justify-between gap-2">

                      <div>
                        <p className="mb-1 text-[10px] text-gray-500">
                          আজকের দাম
                        </p>

                        <p className="text-sm font-bold text-gray-800">
                          {product.today.toLocaleString("bn-BD")} টাকা
                        </p>
                      </div>

                      {/* Price Change Badge */}
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold ${
                          product.change.dir === "up"
                            ? "bg-red-50 text-red-500"
                            : product.change.dir === "down"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.change.dir === "up"
                          ? "▲"
                          : product.change.dir === "down"
                          ? "▼"
                          : "—"}{" "}

                        {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            ) : (
              <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] py-12 text-center">
                <p className="text-sm text-gray-500">
                  এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                </p>
              </div>
            )}

          </>
        ) : null}

      </div>

    </main>
  );
}
