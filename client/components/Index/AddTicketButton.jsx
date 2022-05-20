import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-svg-core/styles.css";

const AddTicketButton = ({ setIsOpen }) => {
  return (
    <motion.button
      className="fixed bottom-10 right-10 "
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(true)}
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
