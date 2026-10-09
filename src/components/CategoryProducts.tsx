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
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-3 border-b border-[#e5ebe2] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#788278]">
          মোট{" "}
          <span className="font-bold text-[#243329]">
            {sortedProducts.length.toLocaleString("bn-BD")}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-medium text-[#687568]"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-w-0 flex-1 rounded-lg border border-[#dfe7da] bg-white px-3 py-2.5 text-sm font-medium text-[#344638] outline-none transition focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম কম থেকে বেশি</option>
            <option value="high">দাম বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-[#d9e3d5] bg-white px-4 py-14 text-center">
          <p className="text-3xl">🛒</p>

          <h2 className="mt-3 text-lg font-bold text-[#243329]">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-[#788278]">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
          </p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

