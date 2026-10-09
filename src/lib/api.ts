import type { Product } from "@/types/product";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("পণ্য লোড করা যায়নি");
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("ক্যাটাগরি লোড করা যায়নি");
  }

  return response.json();
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?category=${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরির পণ্য লোড করা যায়নি");
  }

  return response.json();
}

export async function getProduct(slug: string): Promise<Product> {
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    throw new Error("পণ্য পাওয়া যায়নি");
  }

  return product;
}

export async function getCategory(slug: string) {
  const response = await fetch(
    `${BASE_URL}/categories/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরি পাওয়া যায়নি");
  }

  return response.json();
}

