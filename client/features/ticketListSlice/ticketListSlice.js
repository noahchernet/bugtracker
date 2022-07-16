import { createSlice } from "@reduxjs/toolkit";

export const ticketListSlice = createSlice({
  name: "ticketList",

  initialState: {
    ticketList: [],
  },

  reducers: {
    addOneTicket: (state, action) => {
      return { ticketList: [...state.ticketList, action.payload] };
    },

    updateAllTickets: (state, action) => {
      return { ticketList: [...action.payload] };
    },

    // Update one ticket in the ticketList
    // action.payload => modified ticket to replace the old one
    updateOneTicket: (state, action) => {
      return {
        ticketList: state.ticketList.map((ticket) => {
          if (ticket._id !== action.payload._id) return ticket;

          return { ...ticket, ...action.payload };
        }),
      };
    },

    // Delete one ticket in the ticketList
    // action.payload => id of ticket to delete
    deleteOneTicket: (state, action) => {
      return {
        ticketList: state.ticketList.filter((ticket) => {
          if (ticket._id !== action.payload) return ticket;
        }),
      };
    },
  },
});

export const {
  addOneTicket,
  updateAllTickets,
  updateOneTicket,
  deleteOneTicket,
} = ticketListSlice.actions;

export default ticketListSlice.reducer;
