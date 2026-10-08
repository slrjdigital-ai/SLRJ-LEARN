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
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FeedbackModal from "@/components/FeedbackModal";
import PageTransition from "@/components/PageTransition";

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
    default: "SLRJ Digital | Premium Web Development & Digital Agency",
    template: "%s | SLRJ Digital",
  },
  description:
    "We are a premium digital engineering agency that transforms bold ideas into high-performance, futuristic web solutions. Specializing in Next.js 16, React 19, and high-converting UI/UX.",
  keywords: [
    "Web Development Agency",
    "Next.js Development",
    "React Web Applications",
    "UI/UX Design Systems",
    "E-Commerce Solutions",
    "Core Web Vitals Optimization",
    "SLRJ Digital",
    "Shahid Kouluri"
  ],
  authors: [{ name: "Shahid Kouluri", url: "https://slrjdigital.com/about" }],
  creator: "SLRJ Digital",
  alternates: {
    canonical: "https://slrjdigital.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://slrjdigital.com",
    siteName: "SLRJ Digital",
    title: "SLRJ Digital | Premium Web Development & Digital Agency",
    description:
      "Partner with a premium digital agency that transforms bold ideas into high-performance, futuristic web solutions.",
    images: [
      {
        url: "https://slrjdigital.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SLRJ Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLRJ Digital | Premium Web Development Agency",
    description: "We build digital experiences that inspire and scale your business.",
    images: ["https://slrjdigital.com/og-image.jpg"],
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  metadataBase: new URL("https://slrjdigital.com"),
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
        <BorderLight />
        <AnimatedBackground />
        <MouseLight />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <main className="flex-grow">{children}</main>
        </PageTransition>
        <FloatingFeedbackButton />
        <FloatingWhatsApp />
        <FeedbackModal />
        <Footer />
      </body>
    </html>
  );
}



