"use client";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastContainer } from "react-toastify";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider as ThemeContextProvider } from "@/contexts/ThemeContext";
import ThemeProvider from "@/theme/Provider";
import NextAuthProvider from "@/contexts/Provider/NextAuthProvider";
import "react-toastify/ReactToastify.min.css";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import { ErrorModalProvider } from "@/contexts/Provider/ErrorModalProvider";

const queryCache = new QueryCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      staleTime: Infinity,
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
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeProvider>
            <Analytics />
            <SpeedInsights />
            <QueryClientProvider client={queryClient}>
              <NextAuthProvider>
                <ErrorModalProvider>
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
                </ErrorModalProvider>
              </NextAuthProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
