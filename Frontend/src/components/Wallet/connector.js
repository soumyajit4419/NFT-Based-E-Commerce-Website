import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [97],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 97: "https://data-seed-prebsc-2-s3.binance.org:8545/" },
  qrcode: true,
});
