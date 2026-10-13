import { Metadata } from "next";
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Create Student & Developer Account | SLRJ Digital Education",
  description:
    "Register for free access to structured web development notes, 12-stage learning roadmaps, and student progress tracking.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <Suspense fallback={<div className="text-center py-20 text-gray-500 font-mono">Loading registration form...</div>}>
          <RegisterClient />
        </Suspense>
      </div>
    </div>
  );
}
