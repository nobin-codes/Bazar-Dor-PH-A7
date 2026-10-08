import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const categories = await getCategories();

  const category = categories.find(
    (item: Category) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex rounded-lg border px-4 py-2 text-sm"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <section className="mt-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">
            {category.icon}
          </span>

          <div>
            <h1 className="text-3xl font-bold">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-gray-500">
              এই ক্যাটাগরির সকল পণ্যের আজকের দাম
            </p>
          </div>
        </div>
      </section>

      <CategoryProducts products={products} />
    </main>
  );
}