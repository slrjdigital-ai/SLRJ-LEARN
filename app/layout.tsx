import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/context/AuthContext";
import { GamificationProvider } from "@/context/GamificationContext";
import AuthGuard from "@/components/AuthGuard";
import AppShell from "@/components/layout/AppShell";

import JsonLd from "@/components/JsonLd";
import LumioChatbot from "@/components/ai/LumioChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SLRJ Learn — Web Development & Computer Science Learning Platform",
    template: "%s | SLRJ Learn",
  },
  description:
    "Master web development with structured notes, step-by-step programming tutorials, 12-stage learning roadmap, and comprehensive study materials.",
  keywords: [
    "Web Development Notes",
    "Programming Tutorials",
    "Engineering Study Materials",
    "Web Development Roadmap",
    "HTML5 Semantic Guide",
    "CSS Flexbox and Grid",
    "Modern JavaScript ES6",
    "React 19 Tutorials",
    "Next.js App Router",
    "REST APIs and Backend",
    "SLRJ Learn",
    "Kouluri Shahid"
  ],
  authors: [{ name: "Kouluri Shahid", url: "https://slrjlearn.in/about" }],
  creator: "SLRJ Learn",
  alternates: {
    canonical: "https://slrjlearn.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://slrjlearn.in",
    siteName: "SLRJ Learn",
    title: "SLRJ Learn — Engineering Education & Web Development",
    description:
      "Master computer science, full-stack web development, DSA, and modern software engineering with structured roadmaps and handwritten notes.",
    images: [
      {
        url: "https://slrjlearn.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SLRJ Learn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLRJ Learn — Engineering Education & Web Development",
    description: "Master computer science, full-stack web development, DSA, and modern software engineering with structured roadmaps and handwritten notes.",
    images: ["https://slrjlearn.in/og-image.jpg"],
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  metadataBase: new URL("https://slrjlearn.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <AuthProvider>
          <GamificationProvider>
            <SmoothScroll />
            <ScrollProgress />
            <AuthGuard>
              <AppShell>
                <PageTransition>
                  {children}
                </PageTransition>
              </AppShell>
            </AuthGuard>
            <LumioChatbot />
          </GamificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}



