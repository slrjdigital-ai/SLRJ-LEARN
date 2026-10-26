import { Metadata } from "next";
import { Suspense } from "react";
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata: Metadata = {
  title: "Student Profile & Learning Dashboard | SLRJ Learn",
  description:
    "View your course progress, official verifiable certificates, weekly learning goals, tech skills, and account settings on SLRJ Learn.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pt-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center text-slate-400">
              <div className="w-8 h-8 rounded-full border-2 border-[#173B70] border-t-transparent animate-spin" />
            </div>
          }
        >
          <ProfileClient />
        </Suspense>
      </div>
    </div>
  );
}
