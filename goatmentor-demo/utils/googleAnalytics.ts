import { setCookie } from "cookies-next";
import TagManager, { TagManagerArgs } from "react-gtm-module";

const GTM_ID = "GTM-M3VDR2TS";
const GTM_MEASUREMENT_ID = "G-72BWE1F3L0";

const tagManagerArgs: TagManagerArgs = {
  gtmId: GTM_ID,
};

function initializeGtm() {
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // @ts-ignore
    dataLayer.push(arguments);
  }

  const consent = localStorage.getItem("cookiesConsent");
  gtag(
    // @ts-ignore
    "consent",
    "default",
    consent
      ? JSON.parse(consent)
      : {
          ad_user_data: "granted",
          ad_personalization: "granted",
          ad_storage: "granted",
          analytics_storage: "granted",
        }
  );

  // @ts-ignore
  gtag("js", new Date());
  // @ts-ignore
  gtag("config", GTM_MEASUREMENT_ID);
  // @ts-ignore
  gtag("get", GTM_MEASUREMENT_ID, "client_id", (clientId) => {
    setCookie("ga_client_id", clientId);
  });

  return TagManager.initialize(tagManagerArgs);
}

function pushToDataLayer(data: { [key in any]: any } | any) {
  if ("dataLayer" in window) {
    (window.dataLayer as any[]).push(data);
  }
}

function logGaEvent(
  type: "pageview" | "event",
  eventProps?: {
    category: string;
    action: string;
    label: string;
    value?: string;
  }
) {
  if (type === "pageview") {
    return pushToDataLayer({
      event: "pageview",
      page: {
        url:
          document.location.origin +
          document.location.pathname +
          document.location.search,
        title: document.title,
      },
    });
  }

  return pushToDataLayer({
    event: type,
    eventProps: eventProps
      ? eventProps
      : {
          category: "",
          action: "",
          label: "",
          value: "",
        },
  });
}
export { initializeGtm, logGaEvent };
