"use client";

import { useState } from "react";
import { useSession, signOut, updateUser } from "../../../lib/auth-client";
import { LogOut } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data } = useSession();
  const router = useRouter();

  const user = data?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await updateUser({
        name: name,
      });

      if (result.error) {
        toast.error("আপডেট করা সম্ভব হয়নি!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f7f2] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-800">আমার প্রোফাইল</h1>

          <p className="mt-1 text-xs text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            {user?.image ? (
              <NextImage
                width={48}
                height={48}
                src={user.image}
                alt="Profile"
                className="h-12 w-12 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {user?.name || "User"}
              </h2>

              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Sign Out */}
          <button
            onClick={async () => {
              await signOut();
              router.push("/sign-in");
            }}
            className="flex items-center gap-1 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={14} />
            সাইন আউট
          </button>
        </div>

        {/* Profile Form Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-6 text-sm font-semibold text-gray-800">তথ্য</h3>

          <form onSubmit={handleUpdate}>
            {/* Name Input */}
            <div className="mb-3">
              <label className="mb-2 block text-xs text-gray-700">নাম</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-700 py-2 text-xs font-medium text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
