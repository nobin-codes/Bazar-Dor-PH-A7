"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return <p>লোড হচ্ছে...</p>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const result = await updateUser({
      name,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
  };

  return (
    <main>
      <h1>আমার প্রোফাইল</h1>

      <p>ইমেইল: {session.user.email}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">নাম</label>

          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={session.user.name}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </main>
  );
}
