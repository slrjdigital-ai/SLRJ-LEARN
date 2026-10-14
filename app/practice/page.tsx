import { Metadata } from "next";
import PracticeClient from "@/components/playground/PracticeClient";

export const metadata: Metadata = {
  title: "Online Code Playground & Practice | SLRJ Learn",
  description:
    "Interactive browser-based coding sandbox. Write, run, and preview HTML, CSS, JavaScript, and Python in real time with live output and daily challenges.",
};

export default function PracticePage() {
  return <PracticeClient />;
}
