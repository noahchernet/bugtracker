import React from "react";
import { motion } from "framer-motion";

const TicketOverview = ({ ticket }) => {
  const severityToString = () => {
    if (ticket.severity === 1) return "Low";
    if (ticket.severity === 2) return "Medium";
    return "High";
  };
  return (
    <motion.div
      className="flex justify-between border-solid border-gray-100 border-2 rounded p-5 px-10 my-6 mx-44 cursor-pointer shadow-md shadow-gray-100"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.005 }}
    >
      <h2 className="">{ticket.title}</h2>
      <h4 className="">
        Severity: {severityToString()} Posted On:{" "}
        {Date(ticket.createdAt).slice(0, 15)} By: {ticket.posted}
      </h4>
    </motion.div>
  );
};

export default TicketOverview;
