"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("ক্যাটাগরি লোড করা যায়নি");
        }

        const data: Category[] = await response.json();

        setCategories(data);
      } catch {
        toast.error("ক্যাটাগরি লোড করা যায়নি");
      }
    };

    loadCategories();

    const today = new Date();

    setDate(
      today.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="shrink-0">
            <div className="text-xl font-bold">
              🛒 বাজার দর
            </div>

            <div className="mt-1 text-xs text-gray-500">
              {date}
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <span className="text-sm text-gray-500">
                লোড হচ্ছে...
              </span>
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  প্রোফাইল
                </Link>

                <span className="hidden text-sm sm:inline">
                  স্বাগতম, {session.user.name}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-4">
          {categories.map((category) => {
            const isActive =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}