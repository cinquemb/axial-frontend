import { PayloadAction } from "@reduxjs/toolkit";
import {
  ContainerState,
  DepositAndWithdrawTab,
  DepositUnlockPeriod,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingPageSaga } from "./saga";
import { addDaysToTodayAndGetOnlyDate } from "./utils/addDays";

// The initial state of the StakingPage container
export const initialState: ContainerState = {
  enteredMainTokenToStake: "",
  selectedEpoch: addDaysToTodayAndGetOnlyDate(1),
  selectedDepositSliderValue: 0,
  selectedDepositAndWithdrawTab: DepositAndWithdrawTab.Deposit,
  selectedDepositUnlockPeriod: DepositUnlockPeriod.end,
};

const stakingPageSlice = createSlice({
  name: "stakingPage",
  initialState,
  reducers: {
    setEnteredMainTokenToStake(state, action: PayloadAction<string>) {
      state.enteredMainTokenToStake = action.payload;
    },
    setSelectedDepositAndWithdrawTab(
      state,
      action: PayloadAction<DepositAndWithdrawTab>
    ) {
      state.selectedDepositAndWithdrawTab = action.payload;
    },
    stakeAllTheBalances(state) {},
    stake() {},
    setSelectedDepositUnlockPeriod(
      state,
      action: PayloadAction<DepositUnlockPeriod>
    ) {
      state.selectedDepositUnlockPeriod = action.payload;
    },
    setSelectedEpoch(state, action: PayloadAction<number>) {
      let selectedEpoch;
      switch (action.payload / 25) {
        case 1:
          selectedEpoch = addDaysToTodayAndGetOnlyDate(7);
          break;
        case 2:
          selectedEpoch = addDaysToTodayAndGetOnlyDate(30);
          break;
        case 3:
          selectedEpoch = addDaysToTodayAndGetOnlyDate(364);
          break;
        case 4:
          selectedEpoch = addDaysToTodayAndGetOnlyDate(365 * 2);
          break;
        default:
          selectedEpoch = addDaysToTodayAndGetOnlyDate(1);
          break;
      }
      state.selectedDepositSliderValue = action.payload;
      state.selectedEpoch = selectedEpoch;
    },
  },
});

export const {
  actions: StakingPageActions,
  reducer: StakingPageReducer,
  name: sliceKey,
} = stakingPageSlice;

export const useStakingPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: StakingPageReducer });
  useInjectSaga({ key: sliceKey, saga: stakingPageSaga });
  return { StakingPageActions };
};