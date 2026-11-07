import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#F3F5F4] flex flex-col items-center pt-8">
      <h1 className="text-[40px] font-bold text-[#222] leading-none">
        সাইন ইন
      </h1>

      <p className="mt-3 text-[15px] text-[#6B7280] text-center">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="mt-8 w-[335px] bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
        <div>
          <label className="block text-sm text-[#222] mb-2">
            ইমেইল
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full h-11 px-3 border border-[#DCDCDC] rounded-lg outline-none bg-white text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-[#222] mb-2">
            পাসওয়ার্ড
          </label>

          <input
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full h-11 px-3 border border-[#DCDCDC] rounded-lg outline-none bg-white text-sm"
          />
        </div>

        <button className="mt-5 w-full h-[42px] rounded-lg bg-[#0B8F3A] hover:bg-[#097A31] text-white text-sm font-medium shadow">
          সাইন ইন
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-[#E5E7EB]" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="h-10 border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 text-[10px] font-medium text-[#333]">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt=""
              className="w-4 h-4"
              height={16}
              width={16}
            />
            Google দিয়ে চালিয়ে যান
          </button>

          <button className="h-10 border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 text-[10px] font-medium text-[#333]">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
            >
              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.403 7.861 10.926.575.106.786-.25.786-.556 0-.274-.01-1-.016-1.963-3.199.695-3.875-1.543-3.875-1.543-.524-1.333-1.28-1.688-1.28-1.688-1.046-.714.08-.7.08-.7 1.156.082 1.764 1.186 1.764 1.186 1.028 1.76 2.696 1.251 3.353.957.104-.744.403-1.251.733-1.538-2.553-.29-5.238-1.276-5.238-5.682 0-1.255.449-2.28 1.183-3.084-.118-.29-.513-1.459.112-3.041 0 0 .965-.309 3.162 1.178a10.97 10.97 0 012.878-.387 10.97 10.97 0 012.878.387c2.196-1.487 3.159-1.178 3.159-1.178.627 1.582.232 2.751.114 3.041.737.804 1.18 1.829 1.18 3.084 0 4.417-2.689 5.389-5.252 5.674.414.356.782 1.058.782 2.133 0 1.54-.014 2.782-.014 3.161 0 .309.207.668.792.555C20.212 21.399 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center mt-5 text-sm text-[#555]">
          অ্যাকাউন্ট নেই?
          <a
            href="/sign-up"
            className="ml-1 text-[#0B8F3A] font-medium"
          >
            সাইন আপ করুন
          </a>
        </p>
      </div>

      <Link href="/">
        <p className="mt-8 text-[13px] text-[#8C8C8C]">
        ← হোম পেজে ফিরে যান
      </p>
      </Link>
    </div>
  );
}