import React from "react";

const NewTicketModal = ({ setIsOpen }) => {
  return (
    <>
      <div
        className="bg-transparent bg-gray-50 w-screen h-screen z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
        onClick={setIsOpen(false)}
      />
      <h1>New Ticket</h1>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-44 bg-white z-10 border-r-8 shadow-md">
          <h1>Hello World</h1>
          <button
            className="m-2 border-2 border-black"
            onClick={setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default NewTicketModal;
