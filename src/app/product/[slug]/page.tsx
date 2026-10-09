import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function toBengaliNumber(value: number): string {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function getBengaliUnit(unit: string): string {
  const normalizedUnit = unit.trim().toLowerCase();

  const units: Record<string, string> = {
    kg: "কেজি",
    kgs: "কেজি",
    kilogram: "কেজি",
    kilograms: "কেজি",
    g: "গ্রাম",
    gm: "গ্রাম",
    gram: "গ্রাম",
    grams: "গ্রাম",
    litre: "লিটার",
    litres: "লিটার",
    liter: "লিটার",
    liters: "লিটার",
    l: "লিটার",
    ml: "মিলিলিটার",
    milliliter: "মিলিলিটার",
    milliliters: "মিলিলিটার",
    millilitre: "মিলিলিটার",
    millilitres: "মিলিলিটার",
    piece: "টি",
    pieces: "টি",
    pc: "টি",
    pcs: "টি",
    dozen: "ডজন",
    packet: "প্যাকেট",
    packets: "প্যাকেট",
    bottle: "বোতল",
    bottles: "বোতল",
  };

  return units[normalizedUnit] ?? unit;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];
  const change = product.change;
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  const changeText = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত রয়েছে";

  const bengaliUnit = getBengaliUnit(product.unit);

  const priceDifference = Math.abs(product.today - product.yesterday);

  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : product.today;

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-black sm:py-7">
      <div className="mx-auto w-full max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex w-full flex-wrap items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-black"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span className="text-gray-400">/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span className="text-gray-400">/</span>

          <span className="font-semibold text-black">{product.nameBn}</span>
        </nav>

        {/* BOX 1: Compact Product Overview */}
        <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Product Information */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-lg font-bold leading-snug tracking-tight text-black sm:text-xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm font-medium text-black">
                  প্রতি {bengaliUnit}
                  <span className="mx-1 text-gray-400">·</span>
                  {product.categoryNameBn}
                </p>

                <p className="mt-1.5 text-sm leading-5 text-black">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-semibold">{changeText}</span>
                  {" · "}
                  <span className="font-semibold">
                    {toBengaliNumber(priceDifference)} টাকা
                  </span>
                </p>
              </div>
            </div>

            {/* Compact Centered Gray Box */}
            <div className="w-full rounded-xl bg-gray-50 px-3 py-3 text-center sm:px-4 sm:py-3 lg:w-[260px] lg:shrink-0">
              {/* Today's Price */}
              <div>
                <p className="text-sm font-medium text-black">আজকের দাম</p>

                <div className="mt-1 flex flex-wrap items-baseline justify-center gap-x-1.5">
                  <span className="text-3xl font-bold leading-tight text-black">
                    {toBengaliNumber(product.today)}
                  </span>

                  <span className="text-sm font-medium text-black">
                    টাকা / {bengaliUnit}
                  </span>
                </div>
              </div>

              {/* Price Change */}
              <div className="mt-3">
                <p className="text-sm font-medium text-black">দামের পরিবর্তন</p>

                <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                  <span
                    className="text-sm font-bold text-black"
                    aria-hidden="true"
                  >
                    {changeIcon}
                  </span>

                  <span
                    className={`text-2xl font-bold leading-tight ${
                      isUp
                        ? "text-red-600"
                        : isDown
                          ? "text-green-700"
                          : "text-black"
                    }`}
                  >
                    {toBengaliNumber(Math.abs(change?.pct ?? 0))}%
                  </span>
                </div>

                <p className="mt-0.5 text-sm font-semibold text-black">
                  {changeText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOX 2: Compact Summary and Market Prices */}
        <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          {/* Price Summary */}
          <div>
            <h2 className="text-lg font-bold text-black sm:text-xl">
              দামের সারসংক্ষেপ
            </h2>

            <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              {/* Minimum Price */}
              <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                <p className="text-sm font-medium text-black">সর্বনিম্ন দাম</p>

                <p className="mt-1.5 text-2xl font-bold text-green-700">
                  {toBengaliNumber(minimumPrice)}
                  <span className="ml-1 text-xs font-medium text-black">
                    টাকা
                  </span>
                </p>

                <p className="mt-1 text-xs leading-5 text-black">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              {/* Maximum Price */}
              <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                <p className="text-sm font-medium text-black">সর্বাধিক দাম</p>

                <p className="mt-1.5 text-2xl font-bold text-red-600">
                  {toBengaliNumber(maximumPrice)}
                  <span className="ml-1 text-xs font-medium text-black">
                    টাকা
                  </span>
                </p>

                <p className="mt-1 text-xs leading-5 text-black">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              {/* Average Price */}
              <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                <p className="text-sm font-medium text-black">গড় দাম</p>

                <p className="mt-1.5 text-2xl font-bold text-green-700">
                  {toBengaliNumber(averagePrice)}
                  <span className="ml-1 text-xs font-medium text-black">
                    টাকা
                  </span>
                </p>

                <p className="mt-1 text-xs leading-5 text-black">
                  প্রতি {bengaliUnit}-এর হিসাবে
                </p>
              </div>
            </div>
          </div>

          {/* Market-wise Prices */}
          <div className="mt-6">
            <div className="mb-3">
              <h2 className="text-lg font-bold text-black sm:text-xl">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-1 text-sm text-black">
                বিভিন্ন বাজারের দামের তুলনা
              </p>
            </div>

            {markets.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-7 text-center">
                <p className="text-2xl">🏪</p>

                <p className="mt-2 text-sm text-black">
                  বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-black">
                        <th className="whitespace-nowrap px-4 py-3 font-bold sm:px-5">
                          বাজার
                        </th>

                        <th className="whitespace-nowrap px-4 py-3 font-bold sm:px-5">
                          বিভাগ
                        </th>

                        <th className="whitespace-nowrap px-4 py-3 text-right font-bold sm:px-5">
                          সর্বনিম্ন
                        </th>

                        <th className="whitespace-nowrap px-4 py-3 text-right font-bold sm:px-5">
                          সর্বাধিক
                        </th>

                        <th className="whitespace-nowrap px-4 py-3 text-right font-bold sm:px-5">
                          গড়
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {markets.map((market, index) => {
                        const marketAverage = (market.min + market.max) / 2;

                        return (
                          <tr
                            key={`${market.market}-${market.division}-${index}`}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap px-4 py-3 font-semibold text-black sm:px-5">
                              {market.market}
                            </td>

                            <td className="whitespace-nowrap px-4 py-3 text-black sm:px-5">
                              {market.division}
                            </td>

                            <td className="whitespace-nowrap px-4 py-3 text-right text-black sm:px-5">
                              {toBengaliNumber(market.min)} টাকা
                            </td>

                            <td className="whitespace-nowrap px-4 py-3 text-right text-black sm:px-5">
                              {toBengaliNumber(market.max)} টাকা
                            </td>

                            <td className="whitespace-nowrap px-4 py-3 text-right font-bold text-black sm:px-5">
                              {toBengaliNumber(marketAverage)} টাকা
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
