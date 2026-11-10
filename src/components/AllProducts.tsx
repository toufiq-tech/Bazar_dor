"use client";

import { useEffect, useState } from "react";
import type { Iproduct } from "../types/type";
import  Link  from "next/link";

export default function AllProducts() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        const productData: Iproduct[] = Array.isArray(result)
          ? result
          : result.data ?? result.products ?? [];

        setProducts(productData);

      } catch (error) {
        console.error("Products fetching error:", error);
        setError("পণ্যের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">

      {/* Heading */}
      <div id="all-products" className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          সব পণ্য
        </h2>

      </div>

      {/* Loading */}
      {loading ? (
        <p className="py-10 text-center text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-red-500">
          {error}
        </p>
      ) : products.length > 0 ? (

        <>
          {/* Product Count */}
          <p className="mb-3 text-xs text-gray-500">
            মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:-translate-y-0.5 hover:shadow-md"
              >

                {/* Product Information */}
                <div className="mb-3 flex items-center gap-3">

                  {/* Product Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f7f2] text-xl">
                    {product.image || product.categoryIcon}
                  </div>

                  {/* Product Name */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-800">
                      {product.nameBn}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-gray-500">
                      {product.categoryNameBn} • প্রতি {product.unit}
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

                  {/* Price Change */}
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
                      : "●"}{" "}
                    {product.change.pct.toLocaleString("bn-BD")}%
                  </span>

                </div>

              </Link>
            ))}

          </div>
        </>

      ) : (
        <p className="py-10 text-center text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}

    </section>
  );
}
