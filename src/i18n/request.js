// app/[…]/layout.tsx (or wherever you use getRequestConfig)
export const dynamic = "force-dynamic";    // ← ensure this runs per request
"use server";

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");

  // Safely read the cookie value, fall back to "en"
  const lang = langCookie?.value ?? "en";
  console.log("Resolved locale:", lang);

  return {
    locale: lang,
    messages: (await import(`../../messages/${lang}.json`)).default,
  };
});
