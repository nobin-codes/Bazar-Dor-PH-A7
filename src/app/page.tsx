import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <h1>বাজার দর</h1>

      <p>মোট পণ্য: {products.length}</p>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  );
}