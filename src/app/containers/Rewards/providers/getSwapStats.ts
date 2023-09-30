import { SwapStatsReponse } from "../types";

const swapStatsURI = import.meta.env.VITE_ANALYTICS_API ?? "";

export const fetchSwapStatsNow = (): Promise<SwapStatsReponse[]> =>
  fetch(`${swapStatsURI}/pools`, { cache: "no-cache" })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error("Unable to fetch swap stats from API");
    })
    .then((body: SwapStatsReponse[]) => {
      return body;
    });
