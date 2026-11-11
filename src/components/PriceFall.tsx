"use client";

import { useEffect, useState } from "react";
import type { Iproduct } from "../types/type";
import Link from "next/link";

export default function PriceFall() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);

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

        // Top 6 products with the highest price decrease
        const fallingProducts = productData
          .filter((product) => product.change.dir === "down")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setProducts(fallingProducts);

      } catch (error) {
        console.error("Price fall fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto max-w-6xl px-3 pb-6 sm:px-4 sm:pb-8">

      {/* Heading */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-800">
        <span className="text-green-600">▼</span>
        আজ দাম কমেছে
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="py-6 text-center text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      ) : products.length > 0 ? (

        /* Product Grid */
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3">

          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="min-w-0 rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:shadow-md"
            >

              {/* Product Info */}
              <div className="mb-2 flex min-w-0 items-center gap-3">

                {/* Product Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f1f7f2] text-xl">
                  {product.image || product.categoryIcon}
                </div>

                {/* Name & Unit */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-800">
                    {product.nameBn}
                  </h3>

                  <p className="text-[10px] text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>

              </div>

              {/* Price & Percentage */}
              <div className="flex min-w-0 items-end justify-between gap-2">

                <div className="min-w-0">
                  <p className="mb-1 text-[10px] text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                {/* Price Decrease Badge */}
                <span className="shrink-0 whitespace-nowrap rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-600">
                  ▼ {product.change.pct.toLocaleString("bn-BD")}%
                </span>

              </div>

            </Link>
          ))}

        </div>

      ) : (
        <p className="py-6 text-center text-sm text-gray-500">
          আজ কোনো পণ্যের দাম কমেনি।
        </p>
      )}

    </section>
  );
}