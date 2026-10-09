import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between gap-4 px-4 py-6">
        <p className="min-w-0 text-xs leading-5 text-gray-600 sm:text-sm">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="min-w-0 text-right text-xs leading-5 text-gray-500 sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}