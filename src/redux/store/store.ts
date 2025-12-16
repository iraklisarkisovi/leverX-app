import { configureStore } from "@reduxjs/toolkit";
import { UserPageSlice } from "../userslice";
import { RTKapi } from "./api";
import { HomePageSlice } from "../mainslice";

export const MainStore = configureStore({
  reducer: {
    UserSlice: UserPageSlice,
    HomeSlice: HomePageSlice,

    [RTKapi.reducerPath]: RTKapi.reducer,
  },
  middleware: (GetMiddleW) => {
    return GetMiddleW().concat(RTKapi.middleware);
  },
});

export type RootState = ReturnType<typeof MainStore.getState>;
export type AppDispatch = typeof MainStore.dispatch;