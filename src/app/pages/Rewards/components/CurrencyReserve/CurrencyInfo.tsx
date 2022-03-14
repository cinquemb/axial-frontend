import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { getKeyFromPoolIndex } from "app/pages/Rewards/constants";
import { PoolTypes, TokenShareType } from "app/containers/Rewards/types";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { pools } from "app/pools";

type TParams = { poolIndex: string };

export const CurrencyInfo: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const rewardsPoolData = useSelector(
    RewardsPageSelectors.rewardsPoolData(poolKey)
  );

  const formattedDecimals = pools[poolKey].poolType === PoolTypes.USD ? 2 : 4

  return (
    <StyledInfo>
      <Grid container direction="column" spacing={2}>
        {rewardsPoolData?.tokens.map((infoItem: TokenShareType) => (
          <Grid item key={infoItem.symbol}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Grid container spacing={1}>
                  {/* <Grid item>
                    <IconImage src={axialIcon} alt="icon"></IconImage>
                  </Grid> */}

                  <Grid item>
                    <TokenText variant="h6">{infoItem.symbol}</TokenText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <BalanceText variant="body2">{infoItem.percent}</BalanceText>
              </Grid>

              <Grid item xs={4}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <BalanceLabelText variant="body1">TVL</BalanceLabelText>
                  </Grid>

                  <Grid item>
                    <BalanceText variant="body2">${formatBNToString(infoItem.value, 18, formattedDecimals)}</BalanceText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </StyledInfo>
  );
};

const StyledInfo = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

// const IconImage = styled("img")({
//   width: "33px",
// });

const TokenText = styled(Typography)({
  color: CssVariables.white,
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
  fontWeight: "bold",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
