"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
      <p>{session.user.email}</p>
    </main>
  );
}