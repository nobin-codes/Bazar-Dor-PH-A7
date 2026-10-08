"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

const BASE_URL =
  "https://api.abcz.workers.dev/api/bazardor";

function toBengaliNumber(value: number): string {
  return value.toLocaleString("bn-BD");
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);

        if (!response.ok) {
          throw new Error("পণ্য লোড করা যায়নি");
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch {
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-b bg-black text-white">
      <div className="flex w-max animate-[ticker_35s_linear_infinite]">
        {[...products, ...products].map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex items-center gap-2 px-6 py-3 text-sm whitespace-nowrap"
            >
              <span>{product.image}</span>

              <span>{product.nameBn}</span>

              <span>
                ৳{toBengaliNumber(product.today)}/{product.unit}
              </span>

              <span
                className={
                  isUp
                    ? "text-green-400"
                    : isDown
                      ? "text-red-400"
                      : "text-gray-300"
                }
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBengaliNumber(
                  Math.abs(product.change.pct)
                )}
                %
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}