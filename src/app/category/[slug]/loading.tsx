export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f7f9f6]">
      {" "}
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        {" "}
        <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
        <div className="mt-8 flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200 sm:h-16 sm:w-16" />

          <div className="flex-1">
            <div className="h-7 w-48 max-w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-[#e0e9df] bg-white p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

                <div className="flex-1">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-5 h-8 w-2/3 rounded bg-gray-200" />
              <div className="mt-4 h-10 rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
