"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const result = await signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error.message || "নিবন্ধন করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");

    router.push("/signin");
  };

  return (
    <main>
      <h1>অ্যাকাউন্ট তৈরি করুন</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">নাম</label>

          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="আপনার নাম লিখুন"
            required
          />
        </div>

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
          {loading ? "নিবন্ধন হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <p>
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin">সাইন ইন করুন</Link>
      </p>
    </main>
  );
}
