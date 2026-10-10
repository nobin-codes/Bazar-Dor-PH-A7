import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import RetryButton from "@/components/RetryButton";
import type { Product } from "@/types/product";

function getTopRisers(products: Product[]) {
  return products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

function getTopFallers(products: Product[]) {
  return products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);
}

function ProductSection({
  title,
  products,
  direction,
}: {
  title: string;
  products: Product[];
  direction: "up" | "down";
}) {
  return (
    <section className="mt-7 sm:mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[#203329] sm:text-lg">
        <span
          className={direction === "up" ? "text-red-600" : "text-green-700"}
          aria-hidden="true"
        >
          {direction === "up" ? "▲" : "▼"}
        </span>
        {title}
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-[#e0e9df] bg-white p-4 text-sm text-[#718078]">
          এই মুহূর্তে কোনো তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load BazarDor products:", error);
  }

  const topRisers = getTopRisers(products);
  const topFallers = getTopFallers(products);

  return (
    <main className="site-container pb-10 pt-4 sm:pb-12 sm:pt-6">
      <section className="hero-panel grid items-center gap-5 overflow-hidden px-4 py-6 sm:grid-cols-[1.4fr_.6fr] sm:gap-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
        <div className="min-w-0">
          <span className="eyebrow">
            {new Date().toLocaleDateString("bn-BD", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Dhaka",
            })}
          </span>

          <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-[#202b23] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-lg text-xs leading-6 text-[#68756b] sm:text-sm sm:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link href="#সব-পণ্য" className="primary-btn mt-5 inline-flex">
            সব দাম দেখুন
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div
          aria-label="বাজার দর ব্যানার"
          role="img"
          className="flex min-h-[180px] items-center justify-center sm:min-h-[240px] lg:min-h-[300px]"
        >
          {" "}
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={500}
            height={500}
            priority
            className="h-44 w-44 object-contain sm:h-56 sm:w-56 lg:h-72 lg:w-72"
          />{" "}
        </div>
      </section>

      {products.length > 0 && (
        <>
          <ProductSection
            title="আজ দাম বেড়েছে"
            products={topRisers}
            direction="up"
          />

          <ProductSection
            title="আজ দাম কমেছে"
            products={topFallers}
            direction="down"
          />

          <section id="সব-পণ্য" className="mt-8 scroll-mt-24 sm:mt-10">
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-[#203329] sm:text-xl">
                সব পণ্য
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#78847a] sm:text-sm">
                প্রতিদিনের প্রয়োজনীয় পণ্যের আজকের বাজারদর
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}

      {products.length === 0 && (
        <section
          id="সব-পণ্য"
          className="mt-7 rounded-xl border border-[#e0e9df] bg-white px-5 py-10 text-center sm:px-8"
        >
          <div className="text-4xl" aria-hidden="true">
            🧺
          </div>

          <h2 className="mt-3 font-bold text-[#203329]">
            পণ্যের তথ্য পাওয়া যাচ্ছে না
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#718078]">
            API সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।
          </p>

          <RetryButton />
        </section>
      )}
    </main>
  );
}
