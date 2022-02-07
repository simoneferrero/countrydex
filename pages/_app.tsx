import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0";

import { Provider } from "react-redux";
import { store } from "app/store";

import Head from "next/head";

import Theme from "features/theme/Theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CountryDex</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <UserProvider>
        <Provider store={store}>
          <Theme>
            <Component {...pageProps} />
          </Theme>
        </Provider>
      </UserProvider>
    </>
  );
}
