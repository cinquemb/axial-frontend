import { FC } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  CircleOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { globalSelectors } from "app/appSelectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { RewardsPageSelectors } from "../../selectors";
import { PoolData } from "app/containers/Rewards/types";
import { SnowCircularProgressInModal } from "app/components/common/snowCircularProgressInModals";

export const DepositModal: FC = () => {
  const { t } = useTranslation();
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const poolData: PoolData = useSelector(
    RewardsSelectors.poolData(selectedPool?.key)
  );
  const tokensInQueueToApproving = useSelector(
    globalSelectors.tokensInQueueToApproving
  );

  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const stepsCount = isDepositing ? 2 : 1;

  const renderIcon = (tokenSymbol) => {
    if (tokensInQueueToApproving[tokenSymbol]) {
      return <SnowCircularProgressInModal />;
    } else {
      return <CheckCircleOutlineOutlined color="primary" />;
    }
  };

  const renderDepositIcon = () => {
    if (isDepositing) {
      return <SnowCircularProgressInModal />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>{renderIcon(poolData?.lpToken)}</Grid>

              <Grid item>
                <Typography variant="body2">
                  {t(translations.Common.Approval())} {poolData?.lpToken}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>{renderDepositIcon()}</Grid>

              <Grid item>
                <Typography variant="body2">
                  {t(translations.Common.DepositingTokens())}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Steps {stepsCount}/2
            </Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
