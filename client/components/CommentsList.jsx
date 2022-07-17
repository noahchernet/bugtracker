import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import Comment from "./Comment";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateAllComments } from "../features/commentListSlice/commentListSlice";

export default function CommentsList({ ticket }) {
  const router = useRouter();
  const commentList = useSelector((state) => state.commentList.commentList);
  const dispatch = useDispatch();

  useEffect(() => {
    // checking if ticket is defined so an axios error is not thrown
    // when fetching comments
    if (router.isReady && ticket._id !== undefined) {
      axios
        .get(`${process.env.NEXT_PUBLIC_WEB_SERVER}/comments/` + ticket._id)
        .then((res) => {
          dispatch(updateAllComments(res.data));
        })
        .catch((err) => {
          console.log("Error\n", err);
        });
    }
  }, [router.isReady, ticket]);

  return (
    <Box w="50%">
      {commentList.map((comment, index) => (
        <Comment commentDetails={comment} commentTicket={ticket} key={index} />
      ))}
    </Box>
  );
}
