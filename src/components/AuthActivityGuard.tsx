"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AuthActivityGuard({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const isPublicRoute =
    pathname === "/" ||
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname.startsWith("/category/");

  useEffect(() => {
    if (isPending || session || isPublicRoute) {
      return;
    }

    toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন");
    router.replace("/signin");
  }, [isPending, session, isPublicRoute, router]);

  return <>{children}</>;
}
