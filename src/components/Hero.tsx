import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-10 rounded-3xl border bg-gray-50 p-6 sm:p-10 lg:grid-cols-2 lg:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            প্রতিদিনের বাজার দর
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            আজকের বাজারের
            <br />
            দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            প্রয়োজনীয় পণ্যের বর্তমান বাজারদর দেখুন এবং
            প্রতিদিনের দামের পরিবর্তন সহজেই বুঝুন।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-white">
          <div className="text-center">
            <div className="text-8xl">🛒</div>
            <p className="mt-4 text-sm text-gray-500">
              বাজার দর
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}