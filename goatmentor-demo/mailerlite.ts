import MailerLite from "@mailerlite/mailerlite-nodejs";

export const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY ?? "",
});
