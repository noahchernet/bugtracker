import { configureStore } from "@reduxjs/toolkit";
import ticketListLoadingReducer from "../features/ticketListLoading/ticketListLoadingSlice";
import newCommentAddedReducer from "../features/newCommentAdded/newCommentAddedSlice";

export const store = configureStore({
  reducer: {
    ticketListLoading: ticketListLoadingReducer,
    newCommentAdded: newCommentAddedReducer,
  },
});
