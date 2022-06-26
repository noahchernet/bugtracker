import { useUser } from "@auth0/nextjs-auth0";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { Loading } from "../../components/Loading";
import Comment from "../../components/Ticket/Comment";
import AddCommentDialog from "../../components/Ticket/AddCommentDialog";
import DatePicker from "react-datepicker";
import Router from "next/router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "react-datepicker/dist/react-datepicker.css";

const DetailedTicket = () => {
  const { user } = useUser();
  const router = useRouter();
  const [id, setId] = useState("");
  const [ticket, setTicket] = useState({});
  const [updatedTicket, setUpdatedTicket] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [idIsReady, setIdIsReady] = useState(false);

  const handleInputChange = ({ name, value }) => {
    if (name === "severity")
      setUpdatedTicket({ ...updatedTicket, [name]: Number(value) });
    else setUpdatedTicket({ ...updatedTicket, [name]: value });
  };

  const saveTicket = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");

    const form = new FormData();
    console.log("Final ticket: ", updatedTicket);
    if (updatedTicket.title !== undefined)
      form.append("title", updatedTicket.title);
    if (updatedTicket.description !== undefined)
      form.append("description", updatedTicket.description);
    if (updatedTicket.severity !== undefined)
      form.append("severity", updatedTicket.severity);
    if (updatedTicket.attachments !== undefined)
      form.append("attachments", updatedTicket.attachments);
    if (updatedTicket.due !== undefined) form.append("due", updatedTicket.due);

    axios
      .put("http://localhost:5000/tickets/" + ticket._id, form, {
        headers: { Authorization: "Bearer " + token.data.token },
      })
      .then((res) => {
        setTicket(res.data);
        console.log(`Ticket ${ticket._id} updated`);
      })
      .catch((err) => alert(err));
  };
  const deleteTicket = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    const confirmDelete = confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/tickets/" + ticket._id, {
          headers: { Authorization: "Bearer " + token.data.token },
        })
        .then((res) => {
          console.log(res.data);
          Router.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  useEffect(() => {
    id = router.query.id;
    setId(router.query.id);
    setIdIsReady(true);
    axios
      .get("http://localhost:5000/tickets/" + id)
      .then(async (res) => {
        const ticketComments = await axios.get(
          "http://localhost:5000/comments/" + id
        );
        setComments(ticketComments.data);
        setTicket(res.data);
        setUpdatedTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data\n", err);
      });
  }, [router.isReady]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Ticket's Details, if editing is true, it will edit the ticket */}
          <motion.div
            className="m-24 mx-8 lg:mx-56 xl:mx-96 p-6 relative 
            flex-col mb-16 border rounded-md 
            border-gray-700 bg-white shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {editing ? (
              <div></div>
            ) : (
              <>
                <h2 className="text-2xl font-cartogothic_bold mb-5">
                  {ticket.title}
                </h2>
                <p className="font-cartogothic">{ticket.description}</p>
                {ticket.attachments ? (
                  <img src={ticket.attachments} alt="ticket_image" />
                ) : null}
              </>
            )}

            {user && user.sub === ticket.postedByUser.sub && (
              <>
                {editing ? (
                  <>
                    <form className="mb-12 flex flex-col mx-12">
                      <label className="mr-8">Title</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={updatedTicket.title}
                        onChange={(e) =>
                          handleInputChange({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                        className={`
                          border-[0.1rem] border-solid border-gray-300
                          transition ease-in-out
                          rounded p-1 px-2 w-full 
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      />

                      <label className="mr-8">Description</label>
                      <textarea
                        name="description"
                        required
                        value={updatedTicket.description}
                        cols="80"
                        rows={updatedTicket.description.split("\n").length}
                        onChange={(e) =>
                          handleInputChange({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                        className={`
                          border-[0.1rem] border-solid border-gray-300
                          transition ease-in-out
                          rounded p-1 px-2 w-full 
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      />

                      <label className="mt-4 mr-8">Severity</label>
                      <select
                        name="severity"
                        className="float-right border-[0.1rem] border-gray-300
                           rounded-lg
                          "
                        required
                        value={updatedTicket.severity}
                        onChange={(e) =>
                          handleInputChange({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                      >
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                      </select>

                      <label className="mt-4 mr-8">Add screenshot: </label>
                      <input
                        className="mt-4 w-full text-sm text-slate-500
                                     file:mr-4 file:py-2 file:px-4
                                     file:rounded-full file:border-0
                                     file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100
                                     file:transition-all"
                        type="file"
                        name="attachments"
                        onChange={(e) => {
                          console.log("File:", e.target.files);
                          handleInputChange({
                            name: e.target.name,
                            value: e.target.files[0],
                          });
                        }}
                      />

                      <label className="mt-4 mr-8">Due: </label>
                      <DatePicker
                        className="border-[0.1rem] border-gray-300
                           rounded-lg
                          "
                        selected={new Date()}
                        onChange={(date) =>
                          handleInputChange({ name: "due", value: date })
                        }
                      />
                      <div className="mt-2 ml-80">
                        <FontAwesomeIcon
                          className="rounded-full mr-3 p-2 border-2 border-gray-50 bg-gray-50 shadow-xl text-blue-600
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all cursor-pointer"
                          icon={faCheck}
                          title="Save changes"
                          onClick={() => {
                            saveTicket();
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
                        {/* <button
                          className="ml-auto my-auto rounded p-2 border-2"
                          onClick={() => {
                            saveTicket();
                            setEditing(false);
                          }}
                        >
                          Save
                        </button> */}
                        {/* <button
                          className="ml-auto rounded my-auto p-2 border-2"
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </button> */}
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="float-right mt-16">
                    <FontAwesomeIcon
                      className="rounded-full mr-3 p-2 border-2 border-gray-50 bg-gray-50 shadow-xl text-blue-600
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              transition-all cursor-pointer"
                      icon={faPen}
                      title="Edit ticket"
                      onClick={() => {
                        setEditing(true);
                      }}
                    />
                    <FontAwesomeIcon />
                    <FontAwesomeIcon
                      className="rounded-full p-2 px-3 border-2 border-gray-50 bg-gray-50 shadow-xl text-red-600
              hover:bg-red-600 hover:text-white hover:border-red-600
              transition-all cursor-pointer"
                      icon={faTrash}
                      title="Delete ticket"
                      onClick={() => {
                        deleteTicket();
                      }}
                    />
                  </div>
                )}
              </>
            )}
            <p className="border-b-[0.1rem] border-gray-200 border-solid my-2"></p>
            <div className="flex ">
              <Image
                src={ticket.postedByUser.picture}
                width={"50px"}
                height={"50px"}
                className="rounded-full"
              />
              <div className="ml-3 flex-col">
                {ticket.postedByUser.firstName ? (
                  <p>
                    {ticket.postedByUser.firstName +
                      " " +
                      ticket.postedByUser.lastName}{" "}
                    <br className="" />
                    {ticket.postedByUser.email}
                  </p>
                ) : (
                  <p>{ticket.postedByUser.email}</p>
                )}
              </div>
            </div>
          </motion.div>
          {/* Comments */}
          <motion.ul className="mx-4 md:mx-12 lg:mx-96">
            {comments.map((comment) => (
              <div key={comment._id}>
                <motion.li
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <Comment comment_={comment} ticket={ticket} />
                </motion.li>
              </div>
            ))}
            {idIsReady ? (
              <div className="mt-20">
                <AddCommentDialog ticketId={id} />
              </div>
            ) : null}
          </motion.ul>
        </>
      )}
    </div>
  );
};

export default DetailedTicket;
