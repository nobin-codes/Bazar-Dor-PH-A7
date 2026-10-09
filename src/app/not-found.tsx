import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold text-emerald-700">
        404
      </p>

      <h1 className="mt-5 text-2xl font-bold text-gray-950 sm:text-3xl">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-3 max-w-md leading-7 text-gray-600">
        দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি।
        ঠিকানাটি পরীক্ষা করুন অথবা হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-7 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}