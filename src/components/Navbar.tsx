"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    const controller = new AbortController();

    async function loadCategories() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Categories request failed");
        }

        const result: unknown = await response.json();
        let data: unknown[] = [];

        if (Array.isArray(result)) {
          data = result;
        } else if (
          result !== null &&
          typeof result === "object" &&
          "data" in result &&
          Array.isArray(result.data)
        ) {
          data = result.data;
        }

        if (!controller.signal.aborted) {
          setCategories(data as Category[]);
        }
      } catch {
        if (!controller.signal.aborted) {
          toast.error("ক্যাটাগরি লোড করা যায়নি");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCategoriesLoading(false);
        }
      }
    }

    void loadCategories();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    try {
      const result = await signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      setProfileOpen(false);
      setMenuOpen(false);

      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  }

  function isCategoryActive(slug: string) {
    return pathname === `/category/${slug}`;
  }

  const categoryLinkClass =
    "inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors";

  return (
    <header className="relative z-40 border-b border-[#e1e9de] bg-white">
      <div className="site-container">
     
        <div className="flex min-h-[92px] items-center justify-between gap-3 py-4">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-3"
            aria-label="বাজার দর হোম পেজ"
          >
            
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#285e33] p-1 sm:h-10 sm:w-10">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={40}
                height={40}
                priority
                unoptimized
                className="h-full w-full object-contain"
              />
            </span>

            <span className="flex min-w-0 flex-col items-start">
              <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-black sm:text-2xl">
                বাজার দর
              </span>

              <span className="mt-1 whitespace-nowrap text-xs font-medium text-[#718078] sm:text-sm">
                {date || "তারিখ লোড হচ্ছে..."}
              </span>
            </span>
          </Link>

     
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-[#f2f6ef]" />
            ) : session ? (
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                  aria-label="প্রোফাইল মেনু"
                  className="flex items-center gap-2 rounded-md px-2 py-2 transition hover:bg-[#f2f6ef]"
                >
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt="প্রোফাইল ছবি"
                      className="h-10 w-10 rounded-full border border-[#e1e9de] object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e9de] bg-[#eaf3e7] text-xl text-[#285e33]">
                      👤
                    </span>
                  )}

                  <span className="text-sm font-semibold text-[#285e33]">
                    প্রোফাইল
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xs text-[#718078]"
                  >
                    {profileOpen ? "▲" : "▼"}
                  </span>
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-24px)] rounded-xl border border-[#e1e9de] bg-white p-3 shadow-lg"
                  >
                    <div className="flex items-center gap-3 p-2">
                      {session.user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={session.user.image}
                          alt="প্রোফাইল ছবি"
                          className="h-12 w-12 shrink-0 rounded-full border border-[#e1e9de] object-cover"
                        />
                      ) : (
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eaf3e7] text-xl">
                          👤
                        </span>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#243329]">
                          {session.user.name || "ব্যবহারকারী"}
                        </p>

                        <p className="break-all text-xs text-[#718078]">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-2 border-t border-[#e1e9de]" />

                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition ${
                        pathname === "/profile"
                          ? "bg-[#eaf3e7] text-[#285e33]"
                          : "text-[#526157] hover:bg-[#f2f6ef]"
                      }`}
                    >
                      <span aria-hidden="true">👤</span>
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => void handleLogout()}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <span aria-hidden="true">↩</span>
                      সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-md px-4 py-2 text-sm font-semibold text-[#397b43] transition hover:bg-[#f2f6ef]"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="signup-btn inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>

         
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            aria-controls="mobile-auth-menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#e1e9de] text-lg text-[#285e33] transition hover:bg-[#f2f6ef] sm:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

    
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="flex min-h-[49px] items-center gap-2 overflow-x-auto border-t border-[#f0f3ed] py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`${categoryLinkClass} ${
              pathname === "/"
                ? "bg-[#397b43] text-white"
                : "text-[#526157] hover:bg-[#f2f6ef] hover:text-[#285e33]"
            }`}
          >
            হোম
          </Link>

          {categoriesLoading
            ? [1, 2, 3, 4].map((item) => (
                <span
                  key={item}
                  className="h-9 w-20 shrink-0 animate-pulse rounded-md bg-[#f2f6ef]"
                />
              ))
            : categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  aria-current={
                    isCategoryActive(category.slug) ? "page" : undefined
                  }
                  className={`${categoryLinkClass} ${
                    isCategoryActive(category.slug)
                      ? "bg-[#397b43] text-white"
                      : "text-[#526157] hover:bg-[#f2f6ef] hover:text-[#285e33]"
                  }`}
                >
                  <span aria-hidden="true">{category.icon}</span>
                  {category.nameBn}
                </Link>
              ))}
        </nav>

     
        {menuOpen && (
          <div
            id="mobile-auth-menu"
            className="border-t border-[#e1e9de] py-3 sm:hidden"
          >
            {isPending ? (
              <p className="px-3 py-2 text-sm text-[#718078]">
                লোড হচ্ছে...
              </p>
            ) : session ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt="প্রোফাইল ছবি"
                      className="h-10 w-10 shrink-0 rounded-full border border-[#e1e9de] object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf3e7] text-xl">
                      👤
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#243329]">
                      {session.user.name || "ব্যবহারকারী"}
                    </p>

                    <p className="break-all text-xs text-[#718078]">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#526157] hover:bg-[#f2f6ef]"
                >
                  👤 আমার প্রোফাইল
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#526157] hover:bg-[#f2f6ef]"
                >
                  ড্যাশবোর্ড
                </Link>

                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  ↩ সাইন আউট
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-md border border-[#e1e9de] px-3 py-2 text-center text-sm font-semibold text-[#397b43]"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="signup-btn flex-1 rounded-md px-3 py-2 text-center text-sm font-semibold"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

