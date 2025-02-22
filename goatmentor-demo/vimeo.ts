import { Vimeo } from "vimeo";

export const vimeo = new Vimeo(
  process.env.VIMEO_CLIENT_ID ?? "",
  process.env.VIMEO_CLIENT_SECRET ?? "",
  process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN
);
