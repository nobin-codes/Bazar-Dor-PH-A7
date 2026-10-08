"use client";

import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
  };

  return (
    <nav>
      <Link href="/">🛒 বাজার দর</Link>

      <div>
        {isPending ? (
          <span>লোড হচ্ছে...</span>
        ) : session ? (
          <>
            <Link href="/profile">প্রোফাইল</Link>

            <span>স্বাগতম, {session.user.name}</span>

            <button onClick={handleLogout}>সাইন আউট</button>
          </>
        ) : (
          <>
            <Link href="/signin">সাইন ইন</Link>
            <Link href="/signup">সাইন আপ</Link>
          </>
        )}
      </div>
    </nav>
  );
}