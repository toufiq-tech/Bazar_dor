
"use client";

import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
} from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());

  if (data.password !== data.confirmPassword) {
    toast.error("পাসওয়ার্ড মিলছে না!");
    return;
  }

  const { data: signUpData, error } = await signUp.email({
    name: data.name as string,
    email: data.email as string,
    password: data.password as string,
  });

  if (error) {
    toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    return;
  }

  if (signUpData?.user?.name) {
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।");
    router.push("/sign-in");
  }
};

  const handleGoogleSignUp = async () => {
    await signIn.social({
      provider: "google",
    });
  };
  const handleGithubSignUp = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  return (
    <main className="min-h-screen bg-[#f1f6f1] flex flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      <div className="text-center mb-5">
        <h1 className="text-xl font-bold text-gray-800">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-[400px] bg-white/80 border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <Form onSubmit={onSubmit} className="space-y-3">
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "কমপক্ষে ৩ অক্ষরের নাম দিন";
              }

              return null;
            }}
          >
            <Label className="block text-sm font-medium mb-1">
              নাম
            </Label>

            <Input
              placeholder="আপনার সম্পূর্ণ নাম"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none"
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "সঠিক ইমেইল দিন";
              }

              return null;
            }}
          >
            <Label className="block text-sm font-medium mb-1">
              ইমেইল
            </Label>

            <Input
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none"
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন";
              }

              return null;
            }}
          >
            <Label className="block text-sm font-medium mb-1">
              পাসওয়ার্ড
            </Label>

            <Input
              placeholder="কমপক্ষে ৮ অক্ষরের"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none"
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
          >
            <Label className="block text-sm font-medium mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>

            <Input
              placeholder="আবার লিখুন"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none"
            />

            <FieldError />
          </TextField>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold text-sm py-2.5 rounded-md shadow-md transition"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </Form>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="min-h-10 border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 px-2 py-2 text-[10px] font-medium text-[#333]"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-4 h-4 shrink-0"
              width={16}
              height={16}
            />
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={handleGithubSignUp}
            className="min-h-10 border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-2 px-2 py-2 text-[10px] font-medium text-[#333]"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 shrink-0 fill-current"
            >
              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.403 7.861 10.926.575.106.786-.25.786-.556 0-.274-.01-1-.016-1.963-3.199.695-3.875-1.543-3.875-1.543-.524-1.333-1.28-1.688-1.28-1.688-1.046-.714.08-.7.08-.7 1.156.082 1.764 1.186 1.764 1.186 1.028 1.76 2.696 1.251 3.353.957.104-.744.403-1.251.733-1.538-2.553-.29-5.238-1.276-5.238-5.682 0-1.255.449-2.28 1.183-3.084-.118-.29-.513-1.459.112-3.041 0 0 .965-.309 3.162 1.178a10.97 10.97 0 012.878-.387 10.97 10.97 0 012.878.387c2.196-1.487 3.159-1.178 3.159-1.178.627 1.582.232 2.751.114 3.041.737.804 1.18 1.829 1.18 3.084 0 4.417-2.689 5.389-5.252 5.674.414.356.782 1.058.782 2.133 0 1.54-.014 2.782-.014 3.161 0 .309.207.668.792.555C20.212 21.399 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5z" />
            </svg>

            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-xs text-gray-600 mt-5">
          অ্যাকাউন্ট আছে?
          <Link
            href="/sign-in"
            className="text-green-700 font-semibold ml-1 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <Link href="/">
          <p className="mt-8 text-[13px] text-[#8C8C8C] text-center">
            ← হোম পেজে ফিরে যান
          </p>
        </Link>
      </div>
    </main>
  );
}
