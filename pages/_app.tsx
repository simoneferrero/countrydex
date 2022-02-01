import type { AppProps } from "next/app";

import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

import "@/styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>CountryDex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}
