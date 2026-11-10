
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#fbfdfb]">

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:text-left">

        {/* Left Text */}
        <p className="text-xs text-gray-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-xs text-gray-700">
          সকল দাম সংগ্রহ; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>
      

    </footer>
  );
}
