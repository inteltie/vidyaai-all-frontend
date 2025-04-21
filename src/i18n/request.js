import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';

 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  console.log("lng",cookieStore)
  const lang = langCookie.value || "en";
 
  return {
    locale: lang,
    messages: (await import(`../../messages/${lang}.json`)).default
  };
});