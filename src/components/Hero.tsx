"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const todayDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-10 rounded-3xl border bg-gray-50 p-6 sm:p-10 lg:grid-cols-2 lg:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {todayDate}
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            আজকের বাজারের
            <br />
            দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/#সব-পণ্য"
            className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            সব দাম দেখুন
          </Link>
        </div>

        <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-white">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={240}
            height={240}
            priority
            className="h-48 w-48 object-contain sm:h-60 sm:w-60"
          />
        </div>
      </div>
    </section>
  );
}

