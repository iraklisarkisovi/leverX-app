import { createSlice } from "@reduxjs/toolkit";

interface IStateType {
  BasicSearch: string
}

const initialState: IStateType = {
  BasicSearch: '',
};

const HomeSlice = createSlice({
  initialState,
  name: "HomeSlice",
  reducers: {
    HandleBasicChange: (state, action) => {
      state.BasicSearch = action.payload;
    },
  },
});

export const HomePageSlice = HomeSlice.reducer;
export const { HandleBasicChange } = HomeSlice.actions;
