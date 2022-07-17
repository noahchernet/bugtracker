import React, { useState } from "react";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";
import { Button, HStack, Spacer, Textarea } from "@chakra-ui/react";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { updateOneComment } from "../features/commentListSlice/commentListSlice";

const EditComment = ({ commentToEdit, setEditingComment }) => {
  const [updatedComment, setUpdatedComment] = useState({
    description: commentToEdit.description,
    attachments: commentToEdit.attachments,
  });
  const [savingComment, setSavingComment] = useState(false);
  const dispatch = useDispatch();

  const saveComment = async () => {
    setSavingComment(true);
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );

    const form = new FormData();
    if (updatedComment.description !== undefined)
      form.append("description", updatedComment.description);
    if (updatedComment.description !== undefined)
      form.append("attachments", updatedComment.attachments);

    for (const [key, value] of form) {
      console.log(`\t${key} = ${value}`);
    }

    axios
      .put(
        `${process.env.NEXT_PUBLIC_WEB_SERVER}/comments/` + commentToEdit._id,
        form,
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then((res) => {
        // setComment(res.data.comment);
        dispatch(updateOneComment(res.data.comment));
        setEditingComment(false);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setSavingComment(false);
      });
  };

  return (
    <>
      <Textarea
        value={updatedComment.description}
        onChange={(e) =>
          setUpdatedComment({ ...updatedComment, description: e.target.value })
        }
      />

      <HStack pt="1rem">
        <input
          type="file"
          name="attachments"
          onChange={(e) =>
            setUpdatedComment({
              ...updatedComment,
              attachments: e.target.files[0],
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
          leftIcon={<CheckIcon />}
          colorScheme="green"
          isLoading={savingComment}
          onClick={() => saveComment()}
        >
          Save
        </Button>
        <Button
          leftIcon={<GiCancel />}
          onClick={() => setEditingComment(false)}
        >
          Cancel
        </Button>
      </HStack>
    </>
  );
};

export default EditComment;
