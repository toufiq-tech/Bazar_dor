"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Iproduct } from "../../../types/type";

export default function ProductDetailsClient({ id }: { id: string }) {
  const router = useRouter();

  const [product, setProduct] = useState<Iproduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const result = await response.json();
        const productData: Iproduct = result.data ?? result.product ?? result;

        if (!productData?.id) {
          throw new Error("Product not found");
        }

        setProduct(productData);
      } catch (error) {
        console.error("Product fetching error:", error);
        setError("পণ্যের তথ্য পাওয়া যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f6f2] px-3 py-10 text-center text-sm text-gray-500">
        পণ্যের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f1f6f2] px-3 py-10 text-center">
        <p className="mb-4 text-sm text-red-500">
          {error || "পণ্য পাওয়া যায়নি।"}
        </p>
        <button
          onClick={() => router.back()}
          className="rounded-lg bg-green-600 px-5 py-2 text-sm text-white"
        >
          ফিরে যাও
        </button>
      </div>
    );
  }

  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((market) => market.min)) : 0;

  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((market) => market.max)) : 0;

  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : 0;

  const priceHistory = [
    { label: "আজকের দাম", price: product.today },
    { label: "গতকালের দাম", price: product.yesterday },
    { label: "গত সপ্তাহের দাম", price: product.lastWeek },
    { label: "গত মাসের দাম", price: product.lastMonth },
  ];

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-3 py-3 sm:px-4">
      <div className="mx-auto max-w-6xl space-y-3">
        {/* Product Header */}
        <section className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f2] text-2xl">
                {product.image || product.categoryIcon}
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-sm font-bold text-gray-800 sm:text-base">
                  {product.nameBn}
                </h1>

                <p className="text-[10px] text-gray-500">
                  {product.categoryNameBn} · প্রতি {product.unit}
                </p>

                <p className="mt-1 text-[9px] text-gray-600">
                  গতকালের তুলনায় আজ দাম{" "}
                  {product.change.dir === "up"
                    ? "বেড়েছে"
                    : product.change.dir === "down"
                      ? "কমেছে"
                      : "অপরিবর্তিত"}
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="shrink-0 rounded-xl bg-[#f1f7f2] px-3 py-2 text-center">
              <p className="text-[9px] text-gray-500">আজকের দাম</p>

              <p className="text-lg font-bold leading-6 text-gray-800">
                {product.today.toLocaleString("bn-BD")}
              </p>

              <p className="text-[9px] text-gray-500">টাকা / {product.unit}</p>

              <p
                className={`text-[9px] font-semibold ${
                  product.change.dir === "up"
                    ? "text-red-500"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "●"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3">
          <h2 className="mb-3 text-xs font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-gray-200 p-2.5">
              <p className="text-[9px] text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-sm font-bold text-green-600">
                {minPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="text-[8px] text-gray-500">বাজারের সর্বনিম্ন দাম</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-2.5">
              <p className="text-[9px] text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-sm font-bold text-red-500">
                {maxPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="text-[8px] text-gray-500">বাজারের সর্বোচ্চ দাম</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-2.5">
              <p className="text-[9px] text-gray-600">গড় দাম</p>
              <p className="mt-1 text-sm font-bold text-green-600">
                {avgPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="text-[8px] text-gray-500">বাজারের গড় দাম</p>
            </div>
          </div>
        </section>

        {/* Market Prices */}
        <section className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-800">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <span className="text-[10px] text-gray-500">
              {markets.length.toLocaleString("bn-BD")} টি বাজার
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[450px] text-left text-[10px]">
              <thead className="bg-[#f1f7f2] text-gray-600">
                <tr>
                  <th className="rounded-l-lg px-2.5 py-2.5">বাজারের নাম</th>
                  <th className="px-2.5 py-2.5">বিভাগ</th>
                  <th className="px-2.5 py-2.5">সর্বনিম্ন দাম</th>
                  <th className="rounded-r-lg px-2.5 py-2.5">সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-b border-gray-100 transition hover:bg-[#f1f7f2]"
                  >
                    <td className="px-2.5 py-2 font-medium text-gray-800">
                      {market.market}
                    </td>
                    <td className="px-2.5 py-2 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-2.5 py-2 font-semibold text-green-700">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="px-2.5 py-2 font-semibold text-gray-800">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Back Button */}
        <div className="pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-green-700 transition hover:bg-green-50"
          >
            ← ফিরে যাও
          </button>
        </div>
      </div>
    </main>
  );
}
