"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

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

  const tickerProducts = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-gray-800 bg-gray-950 text-white">
      <div className="price-ticker-track flex w-max">
        {tickerProducts.map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-2 px-5 py-3 text-sm"
            >
              <span>{product.image}</span>

              <span className="font-medium">
                {product.nameBn}
              </span>

              <span className="text-gray-300">
                ৳{toBengaliNumber(product.today)}/{product.unit}
              </span>

              <span
                className={
                  isUp
                    ? "font-semibold text-green-400"
                    : isDown
                      ? "font-semibold text-red-400"
                      : "text-gray-400"
                }
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}
                <span className="ml-1">
                  {toBengaliNumber(Math.abs(product.change.pct))}%
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}