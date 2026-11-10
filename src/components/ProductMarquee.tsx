"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import type { Iproduct } from "../types/type";

export default function ProductMarquee() {
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

        // Supports direct array or common API response wrappers
        const productData: Iproduct[] = Array.isArray(result)
          ? result
          : result.data ?? result.products ?? [];

        setProducts(productData);
      } catch (error) {
        console.error("Product fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="border-b bg-white px-3 py-2 text-[11px] text-gray-500 sm:px-4 sm:text-xs">
        পণ্যের দাম লোড হচ্ছে...
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-b border-gray-200 bg-white py-2">

      <Marquee
        speed={45}
        pauseOnHover={true}
        gradient={false}
        autoFill={true}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-2.5 text-[11px] sm:gap-2 sm:px-4 sm:text-xs"
          >
            {/* Product Icon */}
            <span className="shrink-0 text-sm">
              {product.image || product.categoryIcon}
            </span>

            {/* Product Name */}
            <span className="font-medium text-gray-700">
              {product.nameBn}
            </span>

            {/* Price */}
            <span className="text-gray-600">
              {product.today.toLocaleString("bn-BD")} টাকা/
              {product.unit}
            </span>

            {/* Price Change */}
            {product.change.dir === "up" ? (
              <span className="shrink-0 font-semibold text-red-500">
                ▲ {product.change.pct}%
              </span>
            ) : (
              <span className="shrink-0 font-semibold text-green-600">
                ▼ {product.change.pct}%
              </span>
            )}
          </div>
        ))}
      </Marquee>

    </div>
  );
}