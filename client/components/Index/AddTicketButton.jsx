import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useUser } from "@auth0/nextjs-auth0";

const AddTicketButton = ({ setIsOpen }) => {
  const { user } = useUser();
  return (
    <motion.button
      className="fixed bottom-16 right-10 "
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.25 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setIsOpen(true);
        console.log("User: ", user);
        if (user) setIsOpen(true);
        else alert("Please login to create a ticket");
      }}
    >
      <FontAwesomeIcon
        className="text-blue-600 rounded-full bg-white p-5 shadow-2xl "
        icon={faPenToSquare}
        size="2x"
      />
      {/* <h1>A</h1> */}
    </motion.button>
  );
};

export default AddTicketButton;
