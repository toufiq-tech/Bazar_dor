
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailsPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f1f6f2] py-10 text-center text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}

async function ProductDetailsContent({ params }: PageProps) {
  const { id } = await params;

  let invalidProduct = false;

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
      { cache: "no-store" }
    );

    if (response.status === 404) {
      invalidProduct = true;
    } else if (response.ok) {
      const result = await response.json();

      const productData =
        result.data ?? result.product ?? result;

      if (!productData?.id) {
        invalidProduct = true;
      }
    }
  } catch (error) {
    console.error("Product validation error:", error);
  }

  if (invalidProduct) {
    notFound();
  }

  return <ProductDetailsClient id={id} />;
}
