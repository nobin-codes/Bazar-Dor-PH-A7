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
    (item: Category) => item.slug === slug,
  );

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <main className="min-h-screen bg-[#f7f9f6]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#687568] transition hover:text-[#008000]"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>

        <section className="mt-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#e4ecdf] bg-white text-3xl shadow-sm sm:h-16 sm:w-16 sm:text-4xl">
              {category.icon}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#243329] sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm leading-6 text-[#788278]">
                {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}

