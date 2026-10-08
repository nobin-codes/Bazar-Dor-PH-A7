"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const result = await signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error.message || "সাইন ইন করা যায়নি");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");

    router.push("/");
  };

  return (
    <main>
      <h1>সাইন ইন করুন</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">ইমেইল</label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="আপনার ইমেইল লিখুন"
            required
          />
        </div>

        <div>
          <label htmlFor="password">পাসওয়ার্ড</label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="আপনার পাসওয়ার্ড লিখুন"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      <p>
        অ্যাকাউন্ট নেই?
        <Link href="/signup">অ্যাকাউন্ট তৈরি করুন</Link>
      </p>
    </main>
  );
}