import { useUser } from "@auth0/nextjs-auth0";
import React, { useState, useRef } from "react";
import axios from "axios";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";

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

    for (const [key, value] of form) {
      console.log(`\t${key} = ${value}`);
    }
    axios
      .put("http://localhost:5000/comments/" + comment._id, form, {
        headers: { Authorization: "Bearer " + token.data.token },
      })
      .then((res) => {
        setComment(res.data.comment);
        console.log(comment);
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
        <>
          {comment.solutionToTicket ? (
            <p
              className={`bg-green text-white inline-block text-center p-1`}
              style={{
                "writing-mode": "vertical-rl",
              }}
            >
              Solution
            </p>
          ) : null}
          <div
            className={` relative flex-col p-4 mb-8 border rounded-lg bg-white shadow-lg ${
              comment.solutionToTicket
                ? "border-l-green border-l-8 inline-block"
                : ""
            }`}
          >
            <div className="relative flex gap-4 mb-4">
              <img
                src={comment.postedByUser.picture}
                className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                alt=""
              />
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                    {comment.postedByUser.firstName ||
                      comment.postedByUser.email}
                  </p>
                  {user && user.sub === ticket.postedByUser.sub && (
                    <>
                      {comment.solutionToTicket ? (
                        <FontAwesomeIcon
                          className="absolute top-1/2 -right-8 my-auto p-2 px-3 border rounded-full cursor-pointer bg-white
                        hover:bg-orange-900 hover:text-white
                        transition ease-in-out
                        "
                          icon={faXmark}
                          title="Unmark the solution"
                          onClick={() => unmarkCommentAsSolution()}
                        >
                          Unmark solution
                        </FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          className="absolute top-1/2 -right-8 my-auto py-[0.5rem] px-[0.6rem] border rounded-full cursor-pointer bg-white
                        hover:bg-green hover:text-white
                        transition ease-in-out
                        "
                          title="Mark this comment as the solution"
                          icon={faCheck}
                          onClick={() => markCommentAsSolution()}
                        >
                          Mark as Solution
                        </FontAwesomeIcon>
                      )}
                    </>
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  {DateTime.fromISO(comment.createdAt)
                    .toJSDate()
                    .toString()
                    .slice(0, 3) +
                    ", " +
                    DateTime.fromISO(comment.createdAt)
                      .toJSDate()
                      .toString()
                      .slice(4, 15) +
                    " at " +
                    DateTime.fromISO(comment.createdAt)
                      .toJSDate()
                      .toString()
                      .slice(16, 21)}
                  {comment.createdAt !== comment.updatedAt ? (
                    <>
                      {", edited " +
                        DateTime.fromISO(comment.updatedAt)
                          .toJSDate()
                          .toString()
                          .slice(0, 3) +
                        ", " +
                        DateTime.fromISO(comment.updatedAt)
                          .toJSDate()
                          .toString()
                          .slice(4, 15) +
                        " at " +
                        DateTime.fromISO(comment.updatedAt)
                          .toJSDate()
                          .toString()
                          .slice(16, 21)}
                    </>
                  ) : null}
                </p>
              </div>
            </div>

            {!editing ? (
              // Comment viewing mode
              <>
                <p className="-mt-4 text-gray-500 mb-4">
                  {comment.description}
                </p>
                {/* Show the attached image if there's one */}
                {comment.attachments ? (
                  <img className="rounded-md mb-4" src={comment.attachments} />
                ) : null}

                {user && user.sub === comment.postedByUser.sub && (
                  <div className="float-right">
                    <FontAwesomeIcon
                      className="rounded-full mr-3 p-2 border-2 border-gray-50 bg-gray-50 shadow-xl text-blue-600
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all cursor-pointer"
                      icon={faPen}
                      title="Edit comment"
                      onClick={() => {
                        setEditing(true);
                      }}
                    />
                    <FontAwesomeIcon
                      className="rounded-full p-2 px-3 border-2 border-gray-50 bg-gray-50 shadow-xl text-red-600
              hover:bg-red-600 hover:text-white hover:border-red-600
              transition-all cursor-pointer"
                      icon={faTrash}
                      title="Delete comment"
                      onClick={() => {
                        deleteComment();
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              // Comment editing mode
              <>
                <form>
                  <textarea
                    className={`
                   border-[0.1rem] border-solid border-gray-300
                   transition ease-in-out
                   rounded p-1 px-2 w-full 
                   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                    cols="80"
                    rows={updatedComment.description.split("\n").length}
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
                    class="mt-4 block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                </form>
                <div className="float-right">
                  <FontAwesomeIcon
                    className="rounded-full mr-3 p-2 border-2 border-gray-50 bg-gray-50 shadow-xl text-blue-600
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all cursor-pointer"
                    icon={faCheck}
                    title="Save changes"
                    onClick={() => {
                      saveComment();
                      setEditing(false);
                    }}
                  />
                  <FontAwesomeIcon
                    className="rounded-full p-2 px-3 border-2 border-gray-50 bg-gray-50 shadow-xl text-red-600
              hover:bg-red-600 hover:text-white hover:border-red-600
              transition-all cursor-pointer"
                    icon={faXmark}
                    title="Discard changes"
                    onClick={() => {
                      setEditing(false);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Comment;
