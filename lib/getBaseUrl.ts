import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `${protocol}://${host}`;
}
