import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TicketOverview = React.forwardRef(({ onClick, href, ticket }, ref) => {
  const severityToString = () => {
    if (ticket.severity === 1) return "Low";
    if (ticket.severity === 2) return "Medium";
    return "High";
  };
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <motion.div
        className="flex flex-col p-5 px-10 my-6 lg:mx-80 md:flex-row justify-between
      border-solid border-gray-100 border-2 rounded
      shadow-md shadow-gray-100
      cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.005 }}
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
    </a>
  );
});

export default TicketOverview;
