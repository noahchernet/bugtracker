import React, { useState } from "react";
import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditComment from "./EditComment";
import { deleteOneComment } from "../features/commentListSlice/commentListSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Comment({ commentDetails }) {
  const { user } = useUser();
  const [editingComment, setEditingComment] = useState(false);
  const dispatch = useDispatch();

  const deleteComment = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmDelete) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_WEB_SERVER}/comments/` +
            commentDetails._id,
          {
            headers: { Authorization: "Bearer " + token.data.token },
          }
        )
        .then((res) => {
          dispatch(deleteOneComment(commentDetails._id));
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <HStack spacing="2.5rem" align="stretch" my="2rem" mb="6rem">
      <VStack spacing="1rem">
        <Avatar
          name={
            commentDetails.postedByUser.firstName
              ? `${commentDetails.postedByUser.firstName} ${commentDetails.postedByUser.lastName}`
              : commentDetails.postedByUser.email
          }
          src={commentDetails.postedByUser.picture}
        />
        <Text w="">
          {commentDetails.postedByUser.firstName
            ? `${commentDetails.postedByUser.firstName} ${commentDetails.postedByUser.lastName}`
            : commentDetails.postedByUser.email}
        </Text>
      </VStack>
      <Box width="100%">
        {editingComment ? (
          <EditComment
            setEditingComment={setEditingComment}
            commentToEdit={commentDetails}
          />
        ) : (
          <>
            <Text
              bg="gray.100"
              borderColor="gray.200"
              borderWidth="0.1rem"
              py="1rem"
              px="0.5rem"
            >
              {commentDetails.description}
            </Text>
            {user && user.sub === commentDetails.postedByUser.sub ? (
              <HStack pt="1rem" float="right">
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => setEditingComment(true)}
                >
                  Edit
                </Button>
                <Button
                  bg="red.500"
                  color="white"
                  leftIcon={<DeleteIcon />}
                  _hover={{ bg: "red.600" }}
                  onClick={deleteComment}
                >
                  Delete
                </Button>
              </HStack>
            ) : null}
          </>
        )}
      </Box>
    </HStack>
  );
}
