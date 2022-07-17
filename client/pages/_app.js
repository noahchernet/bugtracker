import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import DefaultLayout from "../layout/DefaultLayout";
import { persistor, store } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <ChakraProvider>
              <DefaultLayout>
                <Head>
                  <title>Avalon Bugtracker </title>
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                  />
                  <link rel="manifest" href="/site.webmanifest" />
                  <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                  />
                  <meta name="theme-color" content="#ffffff" />
                </Head>

                <Component {...pageProps} />
              </DefaultLayout>
            </ChakraProvider>
          </PersistGate>
        </Provider>
      </UserProvider>
    </>
  );
}

export default MyApp;
