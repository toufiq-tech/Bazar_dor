"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import PriceRise from "@/components/PriceRise";
import PriceFall from "@/components/PriceFall";
import AllProducts from "@/components/AllProducts";

export default function HomePage() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#f1f7f2] px-3 py-5 sm:px-4 sm:py-8">

      <section className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-[#fbfdfb] px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:gap-6 md:px-10 md:py-8">

        {/* Left Content */}
        <div className="w-full min-w-0 flex-1">

          {/* Date */}
          <div className="mb-3 inline-block max-w-full rounded-full bg-[#e1f3e8] px-3 py-1 text-xs font-medium text-green-700">
            {date}
          </div>

          {/* Heading */}
          <h1 className="mb-3 text-xl font-bold leading-tight text-gray-800 sm:text-2xl md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mb-5 max-w-xl text-sm leading-6 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বোচ্চ
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <Link
            href="#all-products"
            className="inline-block rounded-md bg-green-700 px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            সব দাম দেখুন
          </Link>

        </div>

        {/* Right Image */}
        <div className="flex w-full items-center justify-center sm:hidden md:flex md:w-auto md:shrink-0">

          <NextImage
            src="/static/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={190}
            height={160}
            priority
            className="h-32 w-40 object-contain sm:h-40 sm:w-48"
          />

        </div>

      </section>

      <PriceRise />
      <PriceFall />
      <AllProducts />

    </main>
  );
}