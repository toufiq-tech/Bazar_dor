
export const instant = false;

import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  let invalidCategory = false;

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
      { cache: "no-store" }
    );

    if (response.status === 404) {
      invalidCategory = true;
    } else if (response.ok) {
      const result = await response.json();

      const categoryData =
        result.data ?? result.category ?? result;

      if (!categoryData?.nameBn) {
        invalidCategory = true;
      }
    }
  } catch (error) {
    console.error("Category validation error:", error);
  }

  if (invalidCategory) {
    notFound();
  }

  return <CategoryClient slug={slug} />;
}
