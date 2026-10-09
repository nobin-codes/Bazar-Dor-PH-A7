import type { Product } from "@/types/product";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>(`${BASE_URL}/products`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>(`${BASE_URL}/categories`);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return fetchApi<Product[]>(
    `${BASE_URL}/products?category=${encodeURIComponent(category)}`,
  );
}

export async function getProduct(
  slug: string,
): Promise<Product> {
  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    throw new Error("পণ্য পাওয়া যায়নি");
  }

  return product;
}

export async function getCategory(
  slug: string,
): Promise<Category> {
  return fetchApi<Category>(
    `${BASE_URL}/categories/${encodeURIComponent(slug)}`,
  );
}

