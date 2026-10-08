import { getProduct } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        {product.nameBn}
      </h1>

      <p className="mt-4">
        আজকের দাম: ৳{product.today}
      </p>

      <p className="mt-2">
        প্রতি {product.unit}
      </p>
    </main>
  );
}