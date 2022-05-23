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

const Title = () => {
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
      setUpdatedTicket({ ...ticket, [name]: Number(value) });
    else setUpdatedTicket({ ...ticket, [name]: value });
  };

  const saveTicket = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    axios
      .put(
        "http://localhost:5000/tickets/" + ticket._id,
        { ...updatedTicket },
        { headers: { Authorization: "Bearer " + token.data.token } }
      )
      .then(() => {
        setTicket(updatedTicket);
        console.log(`Ticket ${ticket._id} updated`);
      })
      .catch((err) => alert(err));
  };
  const deleteTicket = async () => {
    const token = await axios.get("http://localhost:3000/api/getToken");
    const confirmDelete = confirm(
      "Are you sure you want to delete this ticket?"
    );
    console.log("Confirmatin:", confirmDelete);

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
    console.log("ID::", id);
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
          <div className=" m-24 mx-96 p-6 border-black border-2 rounded block">
            {editing ? (
              <div></div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-10">{ticket.title}</h2>
                <p>{ticket.description}</p>
                {ticket.attachments ? (
                  // <div className="w-1/2 h-1/2 m-4 bg-purple-500">
                  //   <Image src={ticket.attachments} alt="ImG" layout="fill" />
                  // </div>
                  <h1>Some tiext</h1>
                ) : null}
              </>
            )}

            {user.sub === ticket.postedByUser.sub && (
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
                        className="rounded border-gray-500 border-2"
                      />

                      <label className="mr-8">Description</label>
                      <textarea
                        name="description"
                        required
                        value={updatedTicket.description}
                        onChange={(e) =>
                          handleInputChange({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                        className="rounded border-gray-500 border-2"
                      />

                      <label className="mr-8">Severity</label>
                      <select
                        name="severity"
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

                      <label className="mr-8">Add screenshot: </label>
                      <input
                        type="file"
                        name="attachments"
                        value={updatedTicket.attachments}
                        onChange={(e) =>
                          handleInputChange({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                      />

                      <label className="mr-8">Due: </label>
                      <DatePicker
                        selected={new Date()}
                        onChange={(date) =>
                          handleInputChange({ name: "due", value: date })
                        }
                      />
                    </form>
                    <button
                      className="ml-auto my-auto rounded p-2 border-2"
                      onClick={() => {
                        saveTicket();
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
                      onClick={() => deleteTicket()}
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
            <p className="border-b-2 border-gray-200 border-solid my-2"></p>
            <div className="flex ">
              <Image
                src={ticket.postedByUser.picture}
                width={"50px"}
                height={"50px"}
                className="rounded-full"
              />
              <div className="ml-3 flex-col">
                <p>
                  {ticket.postedByUser.firstName +
                    " " +
                    ticket.postedByUser.lastName}
                </p>
                <p>{ticket.postedByUser.email}</p>
              </div>
            </div>
          </div>
          {/* Comments */}
          <div className="mx-96">
            {Object.keys(comments).map((key, index) => (
              <Comment comment_={comments[key]} key={index} />
            ))}
            {idIsReady ? <AddCommentDialog ticketId={id} /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Title;
