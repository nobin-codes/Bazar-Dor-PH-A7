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
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-4xl">
          {product.image}
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {product.categoryNameBn}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold">
        {product.nameBn}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {product.unit}
      </p>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-2xl font-bold">
            ৳{toBengaliNumber(product.today)}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            isUp
              ? "bg-green-100 text-green-700"
              : isDown
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          <span className="ml-1">
            {toBengaliNumber(Math.abs(product.change.pct))}%
          </span>
        </span>
      </div>
    </Link>
  );
}