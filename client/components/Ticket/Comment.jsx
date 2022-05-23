import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

const Comment = ({ comment_ }) => {
  const [comment, setComment] = useState(comment_);
  const [editing, setEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment_);
  const [commentExists, setCommentExists] = useState(true);
  const { user } = useUser();

  const handleInputChange = ({ name, value }) => {
    setUpdatedComment({ ...updatedComment, [name]: value });
  };

  const saveComment = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    axios
      .put(
        "http://localhost:5000/comments/" + comment._id,
        { ...updatedComment },
        { headers: { Authorization: "Bearer " + token.data.token } }
      )
      .then(() => {
        setComment(updatedComment);
        console.log(`Comment ${comment._id} updated`);
      })
      .catch((err) => alert(err.response.data.message));
    comment.description;
  };

  const deleteComment = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );
    console.log("Confirmatin:", confirmDelete);

    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/comments/" + comment._id, {
          headers: { Authorization: "Bearer " + token.data.token },
        })
        .then((res) => {
          console.log(res.data);
          setCommentExists(false);
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <>
      {commentExists ? (
        <div className="flex mb-8 border-b-2 border-solid border-gray-200 py-4">
          <div className="flex-col mr-5">
            <Image
              src={comment.postedByUser.picture}
              width={"50px"}
              height={"50px"}
              className="rounded-full"
            />
            <p className="text-center">{comment.postedByUser.firstName}</p>
          </div>
          {editing ? (
            <form>
              <textarea
                className="border-gray-300 border-2"
                cols="80"
                name="description"
                value={updatedComment.description}
                onChange={(e) =>
                  handleInputChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
              />
            </form>
          ) : (
            <p>{comment.description}</p>
          )}
          {user.sub === comment.postedByUser.sub && (
            <>
              {editing ? (
                <>
                  <button
                    className="ml-auto my-auto rounded p-2 border-2"
                    onClick={() => {
                      saveComment();
                      setEditing(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="ml-auto rounded my-auto p-2 border-2"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="ml-auto rounded my-auto p-2 border-2"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-auto rounded my-auto p-2 border-2"
                    onClick={() => deleteComment()}
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Comment;
