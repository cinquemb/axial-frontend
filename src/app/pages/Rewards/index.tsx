/**
 *
 * Rewards Page
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { RewardsBody } from "./body";
import { useRewardsPageSlice } from "./slice";
import { DataDistributor } from "./dataDistributor";
import { ClaimConfirmationModal } from "./components/ClaimRewards/ClaimConfirmationModal";

export const RewardsPage: FC = () => {
  useRewardsPageSlice();

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.RewardsPage.Rewards())}</title>
        <meta
          name="description"
          content={`${t(translations.RewardsPage.Description())}`}
        />
      </Helmet>
      <ClaimConfirmationModal />
      <DataDistributor />
      <RewardsBody />
    </>
  );
};
