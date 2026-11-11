
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-7xl font-extrabold text-green-600 sm:text-8xl">
        404
      </h1>

      <h2 className="mt-4 text-xl font-bold text-gray-800 sm:text-2xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500 sm:text-base">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি
        অথবা পেজটি সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
