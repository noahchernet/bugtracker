import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  FormControl,
  Textarea,
  Button,
  Stack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Alert from "./Alert";
import { addOneComment } from "../features/commentListSlice/commentListSlice";
import { useDispatch } from "react-redux";

export default function NewCommentDialog({ ticketId }) {
  const [comment, setComment] = useState({});
  const [alertInfo, setAlertInfo] = useState({});
  const [addingComment, setAddingComment] = useState(false); // Changes 'Comment' button to a loading circle when true
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the Alert, if an error appears it'll open
  const dispatch = useDispatch();

  const handleInputChange = ({ name, value }) => {
    setComment({ ...comment, [name]: value });
  };

  // Add the comment to the comment list
  // If there's an error, show an Alert describing the issue
  const handleSubmit = async () => {
    setAddingComment(true);
    if (!user) {
      setAlertInfo({
        title: "Signed Out",
        message: "You must be logged in to comment on this.",
      });
      onOpen();
      setAddingComment(false);
      return;
    }
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );
    const form = new FormData();
    if (comment.description !== undefined)
      form.append("description", comment.description);
    if (comment.description !== undefined)
      form.append("attachments", comment.attachments);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_WEB_SERVER}/comments/` + ticketId,
        form,
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then((res) => {
        setComment({ description: "", attachments: "" });
        dispatch(addOneComment(res.data.comment));
        // console.log("Comment added");
      })
      .catch((err) => {
        console.log("id:", ticketId);
        setAlertInfo({
          title: "Something went wrong",
          message: err.message,
        });
        onOpen();
      })
      .finally(() => setAddingComment(false));
  };
  return (
    <Box w={{ base: "90%", md: "75%", lg: "75%" }}>
      <FormControl>
        <Textarea
          placeholder="Enter your comment to the ticket here..."
          name="description"
          value={comment.description}
          onChange={(e) =>
            handleInputChange({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
      </FormControl>
      <Stack direction={{ base: "column", md: "row" }} mt="1rem">
        <input
          type="file"
          name="attachments"
          onChange={(e) =>
            handleInputChange({
              name: e.target.name,
              value: e.target.files[0],
            })
          }
          className="mt-4 w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
                file:transition-all"
        />
        <Spacer />
        <Button
          type="submit"
          color="white"
          bg="green.400"
          _hover={{ bg: "green.300" }}
          onClick={handleSubmit}
          isLoading={addingComment}
        >
          Comment
        </Button>
      </Stack>
      <Alert isOpen={isOpen} onClose={onClose} info={alertInfo} />
    </Box>
  );
}
