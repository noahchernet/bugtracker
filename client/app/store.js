import { configureStore } from "@reduxjs/toolkit";
import ticketListLoadingReducer from "../features/ticketListLoading/ticketListLoadingSlice";

export const store = configureStore({
  reducer: {
    ticketListLoading: ticketListLoadingReducer,
  },
});
