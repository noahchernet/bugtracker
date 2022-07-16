import { createSlice } from "@reduxjs/toolkit";

export const commentListSlice = createSlice({
  name: "commentList",

  initialState: {
    commentList: [],
  },

  reducers: {
    addOneComment: (state, action) => {
      return { commentList: [...state.commentList, action.payload] };
    },

    updateAllComments: (state, action) => {
      return { commentList: [...action.payload] };
    },

    // Update one comment in the commentList
    // action.payload => modified comment to replace the old one
    updateOneComment: (state, action) => {
      return {
        commentList: state.commentList.map((comment) => {
          if (comment._id !== action.payload._id) return comment;

          return { ...comment, ...action.payload };
        }),
      };
    },

    markCommentAsSolution: (state, action) => {
      return {
        commentList: state.commentList.map((comment) => {
          // Unmark any comment that isn't the payload as the solution
          if (comment._id !== action.payload._id) {
            return { ...comment, solutionToTicket: false };
          }

          // When the comment id matches the payload id, mark it as the solution
          return { ...comment, solutionToTicket: true };
        }),
      };
    },

    // Delete one comment in the commentList
    // action.payload => id of comment to delete
    deleteOneComment: (state, action) => {
      return {
        commentList: state.commentList.filter((comment) => {
          if (comment._id !== action.payload) return comment;
        }),
      };
    },
  },
});

export const {
  addOneComment,
  updateAllComments,
  updateOneComment,
  markCommentAsSolution,
  deleteOneComment,
} = commentListSlice.actions;

export default commentListSlice.reducer;
