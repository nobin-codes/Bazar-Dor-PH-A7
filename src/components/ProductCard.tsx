"use client";

import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function toBengaliNumber(value: number): string {
  return value.toLocaleString("bn-BD");
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changeColor = isUp
    ? "bg-red-50 text-red-600 border-red-100"
    : isDown
      ? "bg-green-50 text-green-700 border-green-100"
      : "bg-gray-50 text-gray-500 border-gray-100";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-xl border border-[#e5ebe3] bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9d9b7] hover:shadow-[0_5px_18px_rgba(35,70,43,0.07)] sm:p-4"
    >
      {/* Product image and category */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f2f6ef] text-3xl transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14 sm:text-4xl">
          {product.image || "🛒"}
        </div>

        <span className="max-w-[60%] truncate rounded-full border border-[#e6eee2] bg-[#f7faf5] px-2.5 py-1 text-[10px] font-medium text-[#557052] sm:text-xs">
          {product.categoryNameBn}
        </span>
      </div>

      {/* Product information */}
      <div className="mt-3">
        <h2 className="truncate text-sm font-bold leading-5 text-[#243329] transition-colors group-hover:text-[#397b43] sm:text-base">
          {product.nameBn}
        </h2>

        <p className="mt-1 text-[11px] text-[#7b867c] sm:text-xs">
          প্রতি {product.unit}
        </p>
      </div>

      {/* Price and daily change */}
      <div className="mt-3 flex items-end justify-between gap-2 border-t border-[#edf1eb] pt-3">
        <div className="min-w-0">
          <p className="text-[10px] text-[#818a80] sm:text-xs">
            আজকের দাম
          </p>

          <p className="mt-1 whitespace-nowrap text-base font-extrabold leading-tight tracking-tight text-[#26382a] sm:text-lg">
            {toBengaliNumber(product.today)}
            <span className="ml-1 text-[10px] font-semibold text-[#68776a] sm:text-xs">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold sm:text-xs ${changeColor}`}
        >
          <span aria-hidden="true">
            {isUp ? "▲" : isDown ? "▼" : "—"}
          </span>

          <span>
            {toBengaliNumber(
              Math.abs(product.change?.pct ?? 0),
            )}
            %
          </span>
        </span>
      </div>
    </Link>
  );
}

