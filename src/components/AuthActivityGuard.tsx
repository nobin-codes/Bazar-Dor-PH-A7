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

  const authPage = pathname === "/signin" || pathname === "/signup";

  useEffect(() => {
    if (isPending || session || authPage || pathname === "/") {
      return;
    }
    toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন");
    router.replace("/signin");

    router.replace("/signin");
  }, [isPending, session, authPage, pathname, router]);

  useEffect(() => {
    if (isPending || session || authPage) {
      return;
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const clickable = target.closest(
        "a, button, input, select, textarea, [role='button']",
      );

      if (!clickable) return;

      const link = clickable.closest("a");
      const href = link?.getAttribute("href");

      if (href?.startsWith("/signin") || href?.startsWith("/signup")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      toast.error("এগিয়ে যেতে আগে সাইন ইন করুন");
      router.push("/signin");

      router.push("/signin");
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isPending, session, authPage, router]);

  return <>{children}</>;
}
