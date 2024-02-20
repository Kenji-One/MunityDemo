import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getLocalItem } from "../../base";

const appState = getLocalItem("app-state", undefined, true);
const initialState = {
  theme: "light",
  mode: "user",
  userAddress: "",
  showLiveChat: false,
  ...appState?.app,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    toggleLiveChat: (state, action) => {
      state.showLiveChat = action.payload;
    },
  },
});

const baseInfo = (state) => state.app;

export const appReducer = appSlice.reducer;

export const { setTheme, setMode, setUserAddress, toggleLiveChat } =
  appSlice.actions;

export const getAppState = createSelector(baseInfo, (app) => app);
// export const getUserAddress = createSelector(
//   baseInfo,
//   (app) => app.userAddress
// );
