import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import MouseLight from "@/components/MouseLight";
import AnimatedBackground from "@/components/AnimatedBackground";
import BorderLight from "@/components/BorderLight";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";

import JsonLd from "@/components/JsonLd";

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
    default: "SLRJ Digital — Web Development & Computer Science Learning Platform",
    template: "%s | SLRJ Digital",
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
    "SLRJ Digital",
    "Kouluri Shahid"
  ],
  authors: [{ name: "Kouluri Shahid", url: "https://slrjdigital.in/about" }],
  creator: "SLRJ Digital",
  alternates: {
    canonical: "https://slrjdigital.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://slrjdigital.in",
    siteName: "SLRJ Digital",
    title: "SLRJ — Digital Solutions, AI & Web Development",
    description:
      "SLRJ creates modern websites, AI solutions, applications and digital experiences for businesses, startups and ambitious ideas.",
    images: [
      {
        url: "https://slrjdigital.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SLRJ Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLRJ — Digital Solutions, AI & Web Development",
    description: "SLRJ creates modern websites, AI solutions, applications and digital experiences for businesses, startups and ambitious ideas.",
    images: ["https://slrjdigital.in/og-image.jpg"],
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  metadataBase: new URL("https://slrjdigital.in"),
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
          <BorderLight />
          <AnimatedBackground />
          <MouseLight />
          <SmoothScroll />
          <ScrollProgress />
          <Navbar />
          <AuthGuard>
            <PageTransition>
              <main className="flex-grow">{children}</main>
            </PageTransition>
          </AuthGuard>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}



