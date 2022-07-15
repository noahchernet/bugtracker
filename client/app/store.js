import { configureStore } from "@reduxjs/toolkit";
import ticketListLoadingReducer from "../features/ticketListLoading/ticketListLoadingSlice";
import commentListReducer from "../features/commentListSlice/commentListSlice";

export const store = configureStore({
  reducer: {
    ticketListLoading: ticketListLoadingReducer,
    commentList: commentListReducer,
  },
});
