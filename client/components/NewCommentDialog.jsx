import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  FormControl,
  Textarea,
  Button,
  HStack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Alert from "./Alert";

export default function NewCommentDialog({ ticketId }) {
  const [comment, setComment] = useState({});
  const [alertInfo, setAlertInfo] = useState({});
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the Alert, if an error appears it'll open

  const handleInputChange = ({ name, value }) => {
    setComment({ ...comment, [name]: value });
  };

  // Add the comment to the comment list
  // If there's an error, show an Alert describing the issue
  const handleSubmit = async () => {
    if (!user) {
      setAlertInfo({
        title: "Signed Out",
        message: "You must be logged in to comment on this.",
      });
      onOpen();
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
      .then(() => {
        setComment({ description: "", attachments: "" });
        // console.log("Comment added");
        // Router.reload(window.location.pathname);
      })
      .catch((err) => {
        console.log("id:", ticketId);
        setAlertInfo({
          title: "Something went wrong",
          message: err.response.data.message,
        });
        onOpen();
      });
  };
  return (
    <Box w="50%">
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
      <HStack mt="1rem">
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
        >
          Comment
        </Button>
      </HStack>
      <Alert isOpen={isOpen} onClose={onClose} info={alertInfo} />
    </Box>
  );
}
