import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";

const AddCommentDialog = ({ ticketId }) => {
  const [comment, setComment] = useState({});
  const handleInputChange = ({ name, value }) => {
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    axios
      .post(
        "http://localhost:5000/comments/" + ticketId,
        { ...comment },
        { headers: { Authorization: "Bearer " + token.data.token } }
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
    <div className="flex">
      <form>
        <textarea
          name="description"
          required
          value={comment.desc}
          onChange={(e) =>
            handleInputChange({ name: e.target.name, value: e.target.value })
          }
          className="rounded-sm border-black border-2"
        />

        <input
          type="file"
          name="attachments"
          value={comment.attachments}
          onChange={(e) =>
            handleInputChange({ name: e.target.name, value: e.target.value })
          }
        />
      </form>
      <button
        className="border-2 bg-blue-600 m-2 p-2 text-white rounded-xl "
        onClick={handleSubmit}
      >
        Comment
      </button>
    </div>
  );
};

export default AddCommentDialog;
