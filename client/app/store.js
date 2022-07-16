import { configureStore } from "@reduxjs/toolkit";
import commentListReducer from "../features/commentListSlice/commentListSlice";
import ticketListReducer from "../features/ticketListSlice/ticketListSlice";

export const store = configureStore({
  reducer: {
    ticketList: ticketListReducer,
    commentList: commentListReducer,
  },
});
