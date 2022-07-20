import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  useDisclosure,
  Text,
  VStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditComment from "./EditComment";
import {
  updateOneComment,
  deleteOneComment,
  markCommentAsSolution,
} from "../features/commentListSlice/commentListSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ImageInModal from "./ImageInModal";
import readableDate from "../services/readableDate";
import nameFromEmail from "../services/nameFromEmail";

export default function Comment({ commentDetails, commentTicket }) {
  const { user } = useUser();
  const [editingComment, setEditingComment] = useState(false);
  const dispatch = useDispatch();
  const {
    isOpen: isImageOpen,
    onClose: onImageClosed,
    onOpen: onImageOpen,
  } = useDisclosure();

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
        .then(() => {
          dispatch(deleteOneComment(commentDetails._id));
        })
        .catch((err) => alert(err.message));
    }
  };

  const markCommentAsSolutionToTicket = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );
    axios
      .put(
        `${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets/` +
          commentDetails.ticketId,
        { solution: commentDetails._id },
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then((res) => {
        dispatch(markCommentAsSolution(commentDetails));
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unmarkCommentAsSolution = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );
    axios
      .put(
        `${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets/` +
          commentDetails.ticketId,
        { solution: "" },
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then(() => {
        dispatch(
          updateOneComment({ ...commentDetails, solutionToTicket: false })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <HStack spacing="2.5rem" align="stretch" my="2rem" mb="6rem">
      <VStack spacing="1rem" minW="20%">
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
            : nameFromEmail(commentDetails.postedByUser.email)}
        </Text>
      </VStack>
      <Box width="100%" borderRadius="25%">
        {editingComment ? (
          <EditComment
            setEditingComment={setEditingComment}
            commentToEdit={commentDetails}
          />
        ) : (
          <>
            {commentDetails.solutionToTicket ? (
              <Text bg="#3cab73" p={0.5} color="white">
                Solution
              </Text>
            ) : null}
            <Text
              bg="gray.100"
              borderWidth="0.1rem"
              py="1rem"
              px="0.5rem"
              borderColor={
                commentDetails.solutionToTicket ? "#3cab73" : "gray.200"
              }
              mb="1rem"
            >
              {commentDetails.description}
              {/* Display the ticket's image if there's one */}
              {commentDetails.attachments !== "" ? (
                <>
                  <Image
                    boxSize="5rem"
                    src={commentDetails.attachments}
                    cursor="pointer"
                    onClick={() => onImageOpen()}
                    borderRadius="1rem"
                  />
                  <ImageInModal
                    isOpen={isImageOpen}
                    onClose={onImageClosed}
                    imageSrc={commentDetails.attachments}
                  />
                </>
              ) : null}
              <br /> {/**Empty element to render newline */}
              {/** Displays comment added and edited date */}
              <Text as="i" fontSize="sm">
                {`On ${readableDate(commentDetails.createdAt)}${
                  commentDetails.updatedAt !== commentDetails.createdAt
                    ? ", edited " + readableDate(commentDetails.updatedAt)
                    : ""
                }`}
              </Text>
            </Text>

            {user && (
              <>
                {/* List buttons horizontally for big screens (768px+) */}
                <Box display={{ base: "none", md: "contents" }}>
                  {/* Checking if postedByUser is undefined so it doesn't throw an error */}
                  {commentTicket.postedByUser !== undefined &&
                  // If the user that's logged in is the user that posted the ticket
                  commentTicket.postedByUser.sub === user.sub ? (
                    <>
                      {
                        // Condition will be updated to 'if the user logged in is the
                        // poster of the ticket, and the '
                        !commentDetails.solutionToTicket ? (
                          <Button
                            colorScheme="green"
                            onClick={markCommentAsSolutionToTicket}
                            display="inline-block"
                          >
                            Mark as Solution
                          </Button>
                        ) : (
                          <Button
                            display="inline-block"
                            onClick={unmarkCommentAsSolution}
                          >
                            Unmark Solution
                          </Button>
                        )
                      }
                    </>
                  ) : null}

                  {user.sub === commentDetails.postedByUser.sub ? (
                    <HStack display="inline-block" float="right">
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
                </Box>
                {/* Show menu for smaller screens (<768px), and display it only if the
                    user logged in is this comment's author or the ticket's author */}
                <Box display={{ base: "contents", md: "none" }}>
                  {((commentTicket.postedByUser !== undefined &&
                    commentTicket.postedByUser.sub === user.sub) ||
                    user.sub === commentDetails.postedByUser.sub) && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="outline"
                      />
                      <MenuList>
                        {commentTicket.postedByUser !== undefined &&
                        commentTicket.postedByUser.sub === user.sub ? (
                          // Condition will be updated to 'if the user logged in is the
                          // poster of the ticket, and the '
                          !commentDetails.solutionToTicket ? (
                            <MenuItem
                              icon={<CheckIcon />}
                              onClick={markCommentAsSolutionToTicket}
                              display="inline-block"
                              _hover={{ bg: "red.600" }}
                            >
                              Mark as Solution
                            </MenuItem>
                          ) : (
                            <MenuItem
                              display="inline-block"
                              icon={<CloseIcon />}
                              onClick={unmarkCommentAsSolution}
                            >
                              Unmark Solution
                            </MenuItem>
                          )
                        ) : null}

                        {user.sub === commentDetails.postedByUser.sub ? (
                          <>
                            <MenuItem
                              icon={<EditIcon />}
                              _hover={{ bg: "blue.400", color: "white" }}
                              onClick={() => setEditingComment(true)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={<DeleteIcon />}
                              _hover={{ bg: "red.600", color: "white" }}
                              onClick={deleteComment}
                            >
                              Delete
                            </MenuItem>
                          </>
                        ) : null}
                      </MenuList>
                    </Menu>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </HStack>
  );
}
