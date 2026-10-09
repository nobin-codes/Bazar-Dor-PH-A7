"use client";

import { useState, type FormEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateUser, useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const result = await updateUser({ name: trimmedName });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে");
      router.refresh();
    } catch {
      toast.error("প্রোফাইল আপডেট করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করা যায়নি");
      setSigningOut(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f9f6]">
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  const userName = session.user.name || "ব্যবহারকারী";

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[#f7f9f6] px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#18251a]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-[#687568]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

       
        <section className="flex items-center justify-between gap-4 rounded-xl border border-[#e2e8df] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8f3e7] text-xl font-bold text-[#008000] ring-1 ring-[#d9e8d7] sm:h-16 sm:w-16">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={userName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="min-w-0">
              <h2 className="break-words text-base font-bold text-[#18251a] sm:text-lg">
                {userName}
              </h2>

              <p className="mt-1 break-all text-sm text-[#687568]">
                {session.user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            <span className="hidden sm:inline">
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </span>
            <span className="sm:hidden">
              {signingOut ? "অপেক্ষা..." : "সাইন আউট"}
            </span>
          </button>
        </section>

    
        <section className="mt-5 rounded-xl border border-[#e2e8df] bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-base font-bold text-[#18251a]">
            তথ্য
          </h3>

          <form onSubmit={handleSubmit} className="mt-5">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#344638]"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              minLength={2}
              required
              disabled={loading}
              className="h-11 w-full rounded-md border border-[#d9e1d6] px-3 text-sm text-[#243329] outline-none transition placeholder:text-[#9aa399] focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex h-11 w-full items-center justify-center rounded-md bg-[#008000] px-4 text-sm font-bold text-white transition hover:bg-[#006400] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

