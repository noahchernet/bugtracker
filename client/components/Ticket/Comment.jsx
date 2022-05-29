import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";

const Comment = ({ comment_, ticket }) => {
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

    const form = new FormData();
    if (updatedComment.description !== undefined)
      form.append("description", updatedComment.description);
    if (updatedComment.description !== undefined)
      form.append("attachments", updatedComment.attachments);

    console.log("Form data:");
    for (const [key, value] of form) {
      console.log(`\t${key} = ${value}`);
    }
    axios
      .put("http://localhost:5000/comments/" + comment._id, form, {
        headers: { Authorization: "Bearer " + token.data.token },
      })
      .then((res) => {
        console.log("Updated comm:", res.data);
        setComment(res.data.comment);
        console.log(`Comment ${comment._id} updated`);
      })
      .catch((err) => alert(err.response.data.message));
  };

  const deleteComment = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );

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

  const markCommentAsSolution = async () => {
    console.log("marking...");
    const token = await axios.get("http://localhost:3000/api/getToken");
    axios
      .put(
        "http://localhost:5000/tickets/" + ticket._id,
        { solution: comment._id },
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then((res) => {
        console.log(res);
        Router.reload(window.location.pathname);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unmarkCommentAsSolution = async () => {
    console.log("unmarking...");
    const token = await axios.get("http://localhost:3000/api/getToken");
    axios
      .put(
        "http://localhost:5000/tickets/" + ticket._id,
        { solution: "" },
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then((res) => {
        console.log(res);
        Router.reload(window.location.pathname);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {commentExists ? (
        <div
          className={`flex mb-8 border-b-2 border-solid border-gray-200 py-4 ${
            comment.solutionToTicket && "bg-lime-500"
          }`}
        >
          <div className="flex-col mr-5 text-center">
            <Image
              src={comment.postedByUser.picture}
              width={"50px"}
              height={"50px"}
              className="rounded-full"
            />
            <div className="w-20">
              <p className="text-center text-sm max-w-2 break-words ">
                {comment.postedByUser.firstName || comment.postedByUser.email}
              </p>
            </div>
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

              <input
                type="file"
                name="attachments"
                onChange={(e) =>
                  handleInputChange({
                    name: e.target.name,
                    value: e.target.files[0],
                  })
                }
              />
            </form>
          ) : (
            <div className="flex-col">
              <p className="font-cartogothic">{comment.description}</p>
              {comment.attachments ? (
                <div className="relative w-56 h-56 m-4 bg-purple-500">
                  <Image
                    src={comment.attachments}
                    alt="comment_image"
                    layout="fill"
                  />
                </div>
              ) : null}
            </div>
          )}
          {user && user.sub === comment.postedByUser.sub && (
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
          {user && user.sub === ticket.postedByUser.sub && (
            <>
              {comment.solutionToTicket ? (
                <button
                  className="my-auto p-2 border-2 rounded"
                  onClick={() => unmarkCommentAsSolution()}
                >
                  Unmark solution
                </button>
              ) : (
                <button
                  className="my-auto p-2 border-2 rounded"
                  onClick={() => markCommentAsSolution()}
                >
                  Mark as Solution
                </button>
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Comment;
