import { configureStore } from "@reduxjs/toolkit";
import ticketListLoadingReducer from "../features/ticketListLoading/ticketListLoadingSlice";
import commentListReducer from "../features/commentListSlice/commentListSlice";
import ticketListReducer from "../features/ticketListSlice/ticketListSlice";

export const store = configureStore({
  reducer: {
    ticketListLoading: ticketListLoadingReducer,
    ticketList: ticketListReducer,
    commentList: commentListReducer,
  },
});
