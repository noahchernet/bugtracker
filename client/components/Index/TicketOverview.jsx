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
      className="flex flex-col p-5 px-10 my-6 lg:mx-80 md:flex-row justify-between
      border-solid border-gray-100 border-2 rounded
      shadow-md shadow-gray-100
      cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h2 className="">{ticket.title}</h2>
      <div className="mt-5 md:float-none md:mt-0 lg:ml-2 flex flex-col lg:flex-row">
        <h4 className="">Severity: {severityToString()} </h4>
        <h4 className="lg:ml-2">
          {" "}
          Posted On: {Date(ticket.createdAt).slice(0, 15)}
        </h4>
      </div>
    </motion.div>
  );
};

export default TicketOverview;
