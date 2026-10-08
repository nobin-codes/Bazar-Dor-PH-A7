import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

function getTopRisers(products: Product[]): Product[] {
  return products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

function getTopFallers(products: Product[]): Product[] {
  return products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
}

export default async function HomePage() {
  const products = await getProducts();

  const topRisers = getTopRisers(products);
  const topFallers = getTopFallers(products);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <section>
        <h1 className="text-3xl font-bold">
          বাজার দর
        </h1>

        <p className="mt-2 text-gray-500">
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </section>

      <section className="mt-12">
        <div>
          <h2 className="text-2xl font-bold">
            আজ দাম বেড়েছে ▲
          </h2>

          <p className="mt-1 text-gray-500">
            আজকের বাজারে যেসব পণ্যের দাম বেড়েছে
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topRisers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div>
          <h2 className="text-2xl font-bold">
            আজ দাম কমেছে ▼
          </h2>

          <p className="mt-1 text-gray-500">
            আজকের বাজারে যেসব পণ্যের দাম কমেছে
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topFallers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        id="সব-পণ্য"
        className="mt-16"
      >
        <div>
          <h2 className="text-2xl font-bold">
            সব পণ্য
          </h2>

          <p className="mt-1 text-gray-500">
            সব প্রয়োজনীয় পণ্যের আজকের বাজার দর
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}