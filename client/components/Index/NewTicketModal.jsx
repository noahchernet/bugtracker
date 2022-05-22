import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@auth0/nextjs-auth0";
import DatePicker from "react-datepicker";
import ReactDom from "react-dom";

import "react-datepicker/dist/react-datepicker.css";
import { axios } from "axios";

const NewTicketModal = ({ open, close }) => {
  if (!open) return null;
  const { user } = useUser();

  const [ticket, setTicket] = useState({ severity: 1 });

  const handleInputChange = ({ name, value }) => {
    console.log("Name: ", name, " Value: ", value);
    console.log("Ticket:", ticket);
    // const { name, value } = event.target;
    if (name === "severity") setTicket({ ...ticket, [name]: Number(value) });
    else setTicket({ ...ticket, [name]: value });
    // console.log(ticket);
  };

  const addTicketToDB = () => {
    axios.post();
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed  top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2 
        bg-white p-8 z-30
        rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="mb-5 text-center font-bold">Add a new Ticket</h1>

        <form className="mb-12 flex flex-col mx-12" onSubmit={addTicketToDB}>
          <label className="mr-8">Title</label>
          <input
            type="text"
            name="title"
            required
            value={ticket.desc}
            onChange={(e) =>
              handleInputChange({ name: e.target.name, value: e.target.value })
            }
            className="rounded border-gray-500 border-2"
          />

          <label className="mr-8">Description</label>
          <textarea
            name="description"
            required
            value={ticket.desc}
            onChange={(e) =>
              handleInputChange({ name: e.target.name, value: e.target.value })
            }
            className="rounded border-gray-500 border-2"
          />

          <label className="mr-8">Severity</label>
          <select
            name="severity"
            required
            value={ticket.severity}
            onChange={(e) =>
              handleInputChange({ name: e.target.name, value: e.target.value })
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
            value={ticket.desc}
            onChange={(e) =>
              handleInputChange({ name: e.target.name, value: e.target.value })
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
          onClick={addTicketToDB}
          className="py-2 px-3 font-bold text-white bg-blue-600  rounded-md float-left rounded-r-none cursor-pointer"
        >
          Add Ticket
        </button>
        <button
          onClick={() => {
            close();
          }}
          className="p-2 px-4 font-bold text-white bg-black float-right rounded-md rounded-l-none"
        >
          Close
        </button>
      </motion.div>
    </>
  );
};

export default NewTicketModal;

// <div
//   className="bg-transparent bg-gray-50 w-screen h-screen z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
//   onClick={setIsOpen(false)}
// />
// <h1>New Ticket</h1>
// <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//   <div className="w-64 h-44 bg-white z-10 border-r-8 shadow-md">
//     <h1>Hello World</h1>
//     <button
//       className="m-2 border-2 border-black"
//       onClick={setIsOpen(false)}
//     >
//       Close
//     </button>
//   </div>
// </div>
