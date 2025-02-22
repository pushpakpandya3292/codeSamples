import RootLayout from "@/components/Root";
import { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoatMentor",
  description:
    "Your one-stop destination for exceptional online learning experiences.",
  manifest: "/manifest.json",
  metadataBase: new URL(
    `https://${process.env.VERCEL_URL ?? ""}`
  ),
};

export const viewport: Viewport = {
  themeColor: "#f4713b",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
