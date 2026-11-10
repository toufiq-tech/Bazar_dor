
import { Suspense } from "react";
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

  return <ProductDetailsClient id={id} />;
}
