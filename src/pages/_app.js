import * as React from "react";

import "../app/globals.css";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../utils/store";
import { Web3ContextProvider } from "../utils";
import App from "@/components/layout/App";
import RainbowKitWagmiContextProvider from "@/context/RinbowkitWagmiContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <RainbowKitWagmiContextProvider>
      <Web3ContextProvider>
        <Provider store={store}>
          <App>
            <Component {...pageProps} />
          </App>
        </Provider>
      </Web3ContextProvider>
    </RainbowKitWagmiContextProvider>
  );
};

export default MyApp;
