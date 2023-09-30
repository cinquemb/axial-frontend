export type NetworkName = "Fuji" | "Avalanche";
export const networkName = (import.meta.env.VITE_NETWORK_NAME ||
  "Avalanche") as NetworkName;
