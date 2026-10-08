export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="animate-pulse">
        <div className="h-10 w-40 rounded-lg bg-gray-200" />

        <div className="mt-8 rounded-3xl border p-8">
          <div className="h-24 w-24 rounded-2xl bg-gray-200" />

          <div className="mt-6 h-8 w-64 rounded bg-gray-200" />

          <div className="mt-4 h-5 w-32 rounded bg-gray-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-28 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}