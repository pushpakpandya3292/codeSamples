"use client";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider as ThemeContextProvider } from "@/contexts/ThemeContext";
import ThemeProvider from "@/theme/Provider";
import NextAuthProvider from "@/contexts/Provider/NextAuthProvider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head"; // Okay to use, but consider moving to layout.js/metadata.js if needed

const queryCache = new QueryCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnMount: false,
    },
  },
  queryCache,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { session: any };
}) {
  return (
    <html lang="en">
      <Head>
        {/* Make sure your manifest file is correctly configured */}
        <link rel="manifest" href="/manifest.json" />
        {/* Use the actual theme color used in your app */}
        <meta name="theme-color" content="#000000" />
        {/* You can add more meta tags for SEO and other configurations */}
        <meta
          name="description"
          content="Living trust application with PWA support"
        />
        <link rel="apple-touch-icon" href="/icons/favicon.png" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Analytics />
              <SpeedInsights />
              <NextAuthProvider>
                {children}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </NextAuthProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
