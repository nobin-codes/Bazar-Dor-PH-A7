"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "low" | "high";

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          মোট পণ্য: {products.length}
        </p>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as SortOption)
          }
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="default">সাজান: ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </section>
    </>
  );
}