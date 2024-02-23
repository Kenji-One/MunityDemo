"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from "next/router";

import {
  RainbowKitProvider,
  getDefaultWallets,
  Locale,
  getDefaultConfig,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
  zora,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IS_TEST_MODE } from "@/utils";
import { useSelector } from "react-redux";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "Munity Dapp",
  projectId: "0399aa604100492978c02cac03193502",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [...(IS_TEST_MODE ? [sepolia, polygonMumbai] : [mainnet, polygon])],
  ssr: true,
});

const queryClient = new QueryClient();

function RainbowKitWagmiContextProvider({ children }) {
  const { theme } = useSelector((state) => state.app);

//   console.log("RainbowKitWagmiContextProvider theme", { theme });
  const { locale } = useRouter();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={
            theme == "light"
              ? lightTheme({
                  accentColor:"#1877A9",
                  accentColorForeground: "white",
                  borderRadius: "none",
                  fontStack: "system",
                })
              : darkTheme({
                accentColor:"#1877A9",
                accentColorForeground: "white",
                borderRadius: "none",
                fontStack: "system",
              })
          }
          locale={locale}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default RainbowKitWagmiContextProvider;
