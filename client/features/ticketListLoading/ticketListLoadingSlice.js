import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const ticketListLoadingSlice = createSlice({
  name: "ticketListLoading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.value = true;
    },
    unsetLoading: (state) => {
      state.value = false;
    },
  },
});

export const { setLoading, unsetLoading } = ticketListLoadingSlice.actions;

export default ticketListLoadingSlice.reducer;
