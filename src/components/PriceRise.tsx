"use client";

import { useEffect, useState } from "react";
import type { Iproduct } from "../types/type";
import Link from "next/link";

export default function PriceRise() {
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

        // Only products whose prices have increased
        const risingProducts = productData.filter(
          (product) => product.change.dir === "up"
        );

        setProducts(risingProducts.slice(0, 6));

      } catch (error) {
        console.error("Price rise fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">

      {/* Heading */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-800">
        <span className="text-red-500">▲</span>
        আজ দাম বেড়েছে
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="py-6 text-center text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      ) : products.length > 0 ? (

        /* Product Grid */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:shadow-md"
            >

              {/* Product Info */}
              <div className="mb-2 flex items-center gap-3">

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
              <div className="flex items-end justify-between gap-2">

                <div>
                  <p className="mb-1 text-[10px] text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                {/* Price Increase Badge */}
                <span className="whitespace-nowrap rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500">
                  ▲ {product.change.pct.toLocaleString("bn-BD")}%
                </span>

              </div>

            </Link>
          ))}

        </div>

      ) : (
        <p className="py-6 text-center text-sm text-gray-500">
          আজ দাম বাড়েনি।
        </p>
      )}

    </section>
  );
}
