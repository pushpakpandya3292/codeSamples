"use client";
import MuiProvider from "@/components/Mui/Provider";

import { persistor, store } from "@/store";
import { Provider } from "react-redux";

import LoadingIndicator from "@/components/Common/LoadingIndicator";
import { raleway } from "@/components/Mui/font";
import AuthSync from "@/utils/auth";
import ConsentBanner from "@/utils/consentBanner";
import initializePixel from "@/utils/facebookPixel";
import { initializeGtm } from "@/utils/googleAnalytics";
import { ToastProvider } from "@/utils/toast";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    initializeGtm();
    initializePixel();
    if (process.env.NODE_ENV !== "development") {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("Service worker registration successful", registration);
      });
    }
    if (window.location.hash) {
      router.push(window.location.href);
    }
    // @ts-ignore
    ReactDOM.preconnect("https://connect.facebook.net");
    // @ts-ignore
    ReactDOM.preconnect("https://www.facebook.com");
    // @ts-ignore
    ReactDOM.preconnect("https://www.googletagmanager.com");
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>GoatMentor</title>
        <meta
          name="description"
          content="Your one-stop destination for exceptional online learning experiences."
        />
      </Head>
      <body className={raleway.className}>
        <Provider store={store}>
          <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
            <AuthSync>
              <MuiProvider>
                <ToastProvider>
                  <ConsentBanner>{children}</ConsentBanner>
                </ToastProvider>
              </MuiProvider>
            </AuthSync>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
