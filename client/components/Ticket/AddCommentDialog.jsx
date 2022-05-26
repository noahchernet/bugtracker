import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

const AddCommentDialog = ({ ticketId }) => {
  const [comment, setComment] = useState({});
  const handleInputChange = ({ name, value }) => {
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    const form = new FormData();
    if (comment.description !== undefined)
      form.append("description", comment.description);
    if (comment.description !== undefined)
      form.append("attachments", comment.attachments);
    axios
      .post("http://localhost:5000/comments/" + ticketId, form, {
        headers: { Authorization: "Bearer " + token.data.token },
      })
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
    <motion.div
      // className="flex"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <form>
        <textarea
          name="description"
          required
          value={comment.desc}
          onChange={(e) =>
            handleInputChange({ name: e.target.name, value: e.target.value })
          }
          className="rounded-sm border-black border-2 w-5/6 inline-block"
        />
        <div className="w-1/6 inline-block">
          <label htmlFor="filePicker">
            <FontAwesomeIcon
              className="border-2 bg-blue-600 mx-2 p-4 text-white rounded-full text-xl cursor-pointer "
              icon={faFileCirclePlus}
            />
          </label>
          <input
            id="filePicker"
            type="file"
            name="attachments"
            className="hidden"
            onChange={(e) =>
              handleInputChange({
                name: e.target.name,
                value: e.target.files[0],
              })
            }
          />
          <button onClick={handleSubmit}>
            <FontAwesomeIcon
              className="border-2 bg-blue-600  p-4 text-white rounded-full text-xl"
              icon={faComment}
            />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddCommentDialog;
