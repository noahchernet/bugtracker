import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

const AddCommentDialog = ({ ticketId }) => {
  const [comment, setComment] = useState({});
  const { user } = useUser();
  const handleInputChange = ({ name, value }) => {
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to comment on this.");
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
        console.log("Comment added");
        Router.reload(window.location.pathname);
      })
      .catch((err) => {
        console.log("id:", ticketId);
        alert(err.response.data.message);
      });
  };
  return (
    <div className="">
      <form>
        <textarea
          className={`
          border-[0.1rem] border-solid border-gray-300
          transition ease-in-out
          rounded p-1 px-2 w-full 
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
          name="description"
          required
          value={comment.desc}
          onChange={(e) =>
            handleInputChange({ name: e.target.name, value: e.target.value })
          }
          // className="rounded-sm border-black border-2 w-full"
        />

        <div className="flex">
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
          <button
            className="bg-blue-600 text-white box-border font-semibold
             rounded-full px-4 border-0 mt-4 text-sm
             cursor-pointer hover:bg-blue-700
             transition-all"
            onClick={handleSubmit}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentDialog;
