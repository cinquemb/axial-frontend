import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { SafeAppConnector } from "@gnosis.pm/safe-apps-web3-react";

const NODE_ADDRESS = import.meta.env.VITE_NODE_ADDRESS;
const CHAIN_NAME = import.meta.env.VITE_CHAIN_NAME;
export const rpcUrl = `${NODE_ADDRESS}/ext/bc/C/rpc`;
const AVALANCHE_MAINNET_PARAMS = {
  chainId: import.meta.env.VITE_CHAIN_ID_HEX,
  chainName: CHAIN_NAME,
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: [`${NODE_ADDRESS}/ext/bc/C/rpc`],
  blockExplorerUrls: [`${import.meta.env.VITE_EXPLORER_URL}/`],
};

const walletLink = new WalletLinkConnector({
  url: AVALANCHE_MAINNET_PARAMS.rpcUrls[0],
  appName: import.meta.env.VITE_APPNAME || "",
  appLogoUrl:
    "https://raw.githubusercontent.com/Snowball-Finance/app-v2/master/public/assets/images/logo.png",
});

const networkConnectorUrls = {
  [Number(import.meta.env.VITE_CHAIN_ID || "0")]: rpcUrl,
};
export const network = new NetworkConnector({
  urls: networkConnectorUrls,
});

const injected = new InjectedConnector({
  supportedChainIds: [Number(AVALANCHE_MAINNET_PARAMS.chainId)],
});
const trustWallet = new InjectedConnector({
  supportedChainIds: [Number(AVALANCHE_MAINNET_PARAMS.chainId)],
});
const gnosisSafe = new SafeAppConnector();

export {
  injected,
  gnosisSafe,
  trustWallet,
  walletLink,
  AVALANCHE_MAINNET_PARAMS,
};
