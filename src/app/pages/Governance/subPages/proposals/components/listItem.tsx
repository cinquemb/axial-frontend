import { Box, Divider, styled } from "@mui/material";
import { SnowPaper, SnowPaperInterface } from "app/components/base/SnowPaper";
import { InfoButton } from "app/components/common/buttons/infoButton";
import {
  Proposal,
  ProposalStates,
} from "app/containers/BlockChain/Governance/types";
import { push } from "connected-react-router";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { GovernanceSubPages } from "../../../routes";
import { forAndAgainst } from "../../../utils/votes";
import { TitleAndValue } from "./titleAndValue";
import { VoteProgressBar, VoteProgressBarType } from "./voteProgressBar";

interface ProposalListItemProps {
  proposal: Proposal;
  short?: boolean;
}

export const ProposalListItem: FC<ProposalListItemProps> = ({
  proposal,
  short,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { forVotes, againstVotes } = forAndAgainst({ proposal });

  const handleDetailsClick = () => {
    dispatch(push(`${GovernanceSubPages.proposals}/${proposal.index}`));
  };

  return (
    <Wrapper {...(short && { marginBottom: "0 !important" })}>
      <StyledSnowPaper
        active={proposal.state === ProposalStates.active ? "true" : ""}
        short={short ? "true" : ""}
      >
        <IndexNameAndStatusWrapper
          {...(short && { flex: 1, paddingRight: "16px" })}
          {...(!short && { width: "310px" })}
        >
          <div>
            <DarkText size={18}>
              {t(translations.GovernancePage.ProposalNumber(), {
                number: proposal.index,
              })}
            </DarkText>
            <DarkText size={26}>{proposal.title}</DarkText>
          </div>
          <BottomWrapper>
            <DataWrapper>
              <TitleAndValue
                title={t(translations.GovernancePage.Status())}
                value={
                  proposal.state === ProposalStates.vetoed
                    ? ProposalStates.passed
                    : proposal.state
                }
              />
              <TitleAndValue
                title={t(translations.GovernancePage.Proposedby())}
                value={
                  proposal.proposer.substring(0, 6) +
                  "..." +
                  proposal.proposer.substring(
                    proposal.proposer.length - 4,
                    proposal.proposer.length
                  )
                }
              />
              <TitleAndValue
                title={t(translations.GovernancePage.Date())}
                value={new Date(proposal.startDate).toLocaleString()}
              />
            </DataWrapper>
            <VotesBarWrapper>
              <VoteProgressBar
                title={`${t(translations.GovernancePage.Votes_FOR_AGAINST(), {
                  type: t(translations.GovernancePage.For()),
                })}: ${forVotes.formattedVotes}`}
                percent={forVotes.percent}
                type={VoteProgressBarType.for}
              />
              <VoteProgressBar
                title={`${t(translations.GovernancePage.Votes_FOR_AGAINST(), {
                  type: t(translations.GovernancePage.Against()),
                })}: ${againstVotes.formattedVotes}`}
                percent={againstVotes.percent}
                type={VoteProgressBarType.against}
              />
            </VotesBarWrapper>
          </BottomWrapper>
        </IndexNameAndStatusWrapper>
        <DividerOnMobile />

        {!short && (
          <>
            <DetailButtonWrapper>
              <InfoButton
                title={t(translations.Common.Details())}
                onClick={handleDetailsClick}
              />
            </DetailButtonWrapper>
          </>
        )}
      </StyledSnowPaper>
    </Wrapper>
  );
};

const BottomWrapper = styled("div")({
  display: "flex",
});
const DataWrapper = styled("div")({});

const DarkText = styled("p")<{ size: number }>(({ size }) => ({
  color: CssVariables.commonTextColor,
  margin: 0,
  fontSize: `${size}px`,
  fontFamily: FontFamilies.FugazOne,
}));

const DetailButtonWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  [mobile]: {
    ".MuiButton-root": {
      width: "100%",
      height: "36px",
    },
  },
});

const VotesBarWrapper = styled("div")({
  minWidth: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  flex: 1,
  padding: "0 32px",
  [mobile]: {
    marginBottom: "16px",
    padding: 0,
    gap: "6px",
  },
});

const IndexNameAndStatusWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flex: 1,
});

const DividerOnMobile = styled(Divider)({
  display: "none",
  [mobile]: {
    display: "block",
    margin: "16px 0",
  },
});

const StyledSnowPaper = styled(SnowPaper)<
  SnowPaperInterface & { active: "true" | ""; short: "true" | "" }
>(({ active, short }) => ({
  padding: "16px 23px",
  display: "flex",
  minHeight: "240px",
  border: `4px solid ${CssVariables.cardBorder}`,
  ...(active && { borderLeft: `10px solid ${CssVariables.primary}` }),
  ...(short && { height: "160px" }),
  [mobile]: {
    ...(active && {
      borderLeft: "unset",
      borderTop: `10px solid ${CssVariables.primary}`,
    }),
    flexDirection: "column",
    ...(short && {
      height: "unset",
      gap: "16px",
      ".MuiDivider-root": {
        display: "none",
      },
    }),
  },
}));

const Wrapper = styled(Box)({
  marginBottom: "16px",
});
