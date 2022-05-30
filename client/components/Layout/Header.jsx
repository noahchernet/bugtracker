import React from "react";
import Image from "next/image";
import LogInLogOutButton from "./LogInLogOutButton";
import logo from "../../public/bug_tracker_logo.svg";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.div
      className="flex justify-between mx-2 "
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Image className="w-2 h-2" src={logo} width={60} height={60} />
      <motion.h1
        className="my-2 mr-auto p-3 font-galano_gortesque font-semi-bold
        text-lg font-bold lg:text-4xl"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Avalon Bugtracker
      </motion.h1>
      <LogInLogOutButton />
    </motion.div>
  );
}
