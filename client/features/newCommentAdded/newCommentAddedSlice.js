import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const newCommentAddedSlice = createSlice({
  name: "newCommentAdded",
  initialState,
  reducers: {
    reloadComments: (state) => {
      state.value = true;
    },
    finishReloadingComments: (state) => {
      state.value = false;
    },
  },
});

export const { reloadComments, finishReloadingComments } =
  newCommentAddedSlice.actions;

export default newCommentAddedSlice.reducer;
