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
    ? "border-red-100 bg-red-50 text-red-600"
    : isDown
      ? "border-green-100 bg-green-50 text-green-700"
      : "border-gray-200 bg-gray-50 text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-xl border border-[#e5ebe3] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9d9b7] hover:shadow-[0_5px_18px_rgba(35,70,43,0.07)] sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f6ef] text-3xl transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14 sm:text-4xl">
          {product.image || "🛒"}
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h2 className="break-words text-sm font-bold leading-6 text-[#243329] transition-colors group-hover:text-[#397b43] sm:text-base">
            {product.nameBn}
          </h2>

          <p className="mt-1 text-xs text-[#7b867c]">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-[#edf1eb] pt-4">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[#818a80]">
              আজকের দাম
            </p>

            <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#26382a] sm:text-2xl">
                {toBengaliNumber(product.today)}
              </span>

              <span className="text-xs font-semibold text-[#68776a]">
                টাকা
              </span>
            </p>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-xs font-bold ${changeColor}`}
          >
            <span aria-hidden="true">{changeIcon}</span>

            <span>
              {toBengaliNumber(
                Math.abs(product.change?.pct ?? 0),
              )}
              %
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

