
export const instant = false;

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

  return <CategoryClient slug={slug} />;
}
