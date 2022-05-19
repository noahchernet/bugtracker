import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-svg-core/styles.css";

const AddTicketButton = () => {
  return (
    <motion.button
      className=" fixed bottom-10 right-10 "
      whileTap={{ scale: 0.9 }}
    >
      <FontAwesomeIcon
        className="bg-blue-600 rounded-full text-white p-5 "
        icon={faPen}
      />
      {/* <h1>A</h1> */}
    </motion.button>
  );
};

export default AddTicketButton;
