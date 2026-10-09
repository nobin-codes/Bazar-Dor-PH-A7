"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading || socialLoading) return;

    if (name.trim().length < 2) {
      toast.error("আপনার নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("আপনার অ্যাকাউন্ট তৈরি হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(
        provider === "google"
          ? "Google দিয়ে চালিয়ে যাওয়া যায়নি"
          : "GitHub দিয়ে চালিয়ে যাওয়া যায়নি",
      );

      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center bg-[#f7f9f6] px-4 py-8">
      {/* Heading and subtitle outside the box */}
      <div className="mb-5 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-black">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#687568]">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Signup form box */}
      <div className="w-full max-w-lg rounded-xl border border-[#e2e8df] bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
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
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(event) => setName(event.target.value)}
              minLength={2}
              required
              disabled={loading || Boolean(socialLoading)}
              className="h-11 w-full rounded-md border border-[#d9e1d6] px-3 text-sm text-[#243329] outline-none transition placeholder:text-[#9aa399] focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10 disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#344638]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading || Boolean(socialLoading)}
              className="h-11 w-full rounded-md border border-[#d9e1d6] px-3 text-sm text-[#243329] outline-none transition placeholder:text-[#9aa399] focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10 disabled:opacity-60"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#344638]"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
              disabled={loading || Boolean(socialLoading)}
              className="h-11 w-full rounded-md border border-[#d9e1d6] px-3 text-sm text-[#243329] outline-none transition placeholder:text-[#9aa399] focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10 disabled:opacity-60"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-[#344638]"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
              disabled={loading || Boolean(socialLoading)}
              className="h-11 w-full rounded-md border border-[#d9e1d6] px-3 text-sm text-[#243329] outline-none transition placeholder:text-[#9aa399] focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10 disabled:opacity-60"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading || Boolean(socialLoading)}
            className="flex h-11 w-full items-center justify-center rounded-md bg-[#008000] px-4 text-sm font-bold text-white transition hover:bg-[#006400] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e5eae2]" />
          <span className="text-sm text-[#899389]">অথবা</span>
          <div className="h-px flex-1 bg-[#e5eae2]" />
        </div>

        {/* Social login buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void handleSocialSignIn("google")}
            disabled={loading || Boolean(socialLoading)}
            className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-[#d9e1d6] bg-white px-3 text-sm font-semibold text-[#344638] transition hover:bg-[#f7f9f6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google" ? (
              "অপেক্ষা করুন..."
            ) : (
              <>
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.28 5.65c4.25-3.92 6.48-9.7 6.48-17.3Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.28-5.65c-2.02 1.35-4.6 2.15-8.62 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>

                <span>Google দিয়ে চালিয়ে যান</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => void handleSocialSignIn("github")}
            disabled={loading || Boolean(socialLoading)}
            className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-[#d9e1d6] bg-white px-3 text-sm font-semibold text-[#344638] transition hover:bg-[#f7f9f6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github" ? (
              "অপেক্ষা করুন..."
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.31-3.76-1.31-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.72 2.1 3.1 1.6.1-.74.4-1.25.7-1.54-2.48-.28-5.1-1.24-5.1-5.52 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.14 3.04-1.14.61 1.54.23 2.67.11 2.96.73.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.12 5.51.41.36.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>

                <span>GitHub দিয়ে চালিয়ে যান</span>
              </>
            )}
          </button>
        </div>

        {/* Sign in link */}
        <div className="mt-5 flex w-full items-center justify-center gap-2 text-center text-sm">
          <span className="text-gray-600">অ্যাকাউন্ট আছে?</span>

          <Link
            href="/signin"
            style={{ color: "#008000" }}
            className="font-bold transition-colors hover:!text-[#006400]"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      {/* Home link outside the box */}
      <div className="mt-5 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#687568] transition hover:text-[#006400]"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

