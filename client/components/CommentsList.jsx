import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import Comment from "./Comment";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateAllComments } from "../features/commentListSlice/commentListSlice";

export default function CommentsList({ ticketId }) {
  const router = useRouter();
  const commentList = useSelector((state) => state.commentList.commentList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_WEB_SERVER}/comments/` + ticketId)
      .then((res) => {
        dispatch(updateAllComments(res.data));
      })
      .catch((err) => {
        console.log("Error\n", err);
      });
  }, [router.isReady]);

  return (
    <Box w="50%">
      {commentList.map((comment, index) => (
        <Comment commentDetails={comment} key={index} />
      ))}
    </Box>
  );
}
