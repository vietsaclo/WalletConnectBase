import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app-store/store";
import { I_GlobalApp } from "../utils/Interfaces";

const initialState: I_GlobalApp = {
  headerMenu: '/',
}

const GlobalAppReducer = createSlice({
  name: 'GlobalAppReducer',
  initialState: initialState,
  reducers: {
    headerMenuClicked: (state, action: PayloadAction<string>) => {
      state.headerMenu = action.payload;
    },
  }
});

export const { headerMenuClicked } = GlobalAppReducer.actions;

export const selectGlobalApp = (state: RootState) => state.globalApp;

export default GlobalAppReducer.reducer;
