import React from "react";
import Image from "next/image";
import LogInLogOutButton from "./LogInLogOutButton";
import logo from "../../public/bug_tracker_logo.svg";

export function Header() {
  return (
    <div className="flex justify-between ">
      <Image className="w-2 h-2" src={logo} width={60} height={60} />
      <h1
        className="my-2 mr-auto p-3  font-serif font-semi-bold
        text-lg font-bold lg:text-4xl"
      >
        Avalon Bugtracker
      </h1>
      <LogInLogOutButton />
    </div>
  );
}
