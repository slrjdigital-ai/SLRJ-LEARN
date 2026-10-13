import { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Student & Developer Login | SLRJ Digital Education",
  description:
    "Sign in to your learning dashboard to view bookmarked notes, track your 12-stage web development roadmap progress, and access free PDF study guides.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <Suspense fallback={<div className="text-center py-20 text-gray-500 font-mono">Loading authentication portal...</div>}>
          <LoginClient />
        </Suspense>
      </div>
    </div>
  );
}
