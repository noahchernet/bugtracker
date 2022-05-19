import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { motion } from "framer-motion";

/**
 * A login or logout butt, Log In button if the user is logged out
 * a Log Out button if the user is logged in
 * @returns
 */
const LogInLogOutButton = () => {
  const { user } = useUser();

  if (user) {
    return (
      <motion.a
        className="pb-0 my-2 mt-4 p-3 rounded-lg  border-2 border-blue-400 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition delay-10"
        href="/api/auth/logout"
        whileTap={{ scale: 0.95 }}
      >
        Log Out
      </motion.a>
    );
  } else {
    return (
      <motion.a
        className="my-2 mt-4 p-3 bg-blue-600 rounded-lg text-white font-semibold"
        href="/api/auth/login"
        whileTap={{ scale: 0.95 }}
      >
        Log In
      </motion.a>
    );
  }
};

export default LogInLogOutButton;
