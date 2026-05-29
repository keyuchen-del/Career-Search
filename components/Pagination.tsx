"use client";

export default function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const from = Math.max(1, page - 2);
  const to = Math.min(totalPages, from + 4);
  for (let i = from; i <= to; i++) pages.push(i);

  const btn =
    "min-w-[36px] h-9 px-2 rounded-lg border text-sm transition disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      <button
        className={`${btn} border-gray-200 bg-white hover:border-brand-500`}
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
      >
        上一页
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`${btn} ${
            p === page
              ? "border-brand-600 bg-brand-600 text-white font-semibold"
              : "border-gray-200 bg-white hover:border-brand-500"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        className={`${btn} border-gray-200 bg-white hover:border-brand-500`}
        onClick={() => onPage(page + 1)}
        disabled={page >= totalPages}
      >
        下一页
      </button>
    </nav>
  );
}
