import Image from "next/image";
import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="flex mb-8 border-b-2 border-solid border-gray-200 py-4">
      <div className="flex-col mr-5">
        <Image
          src={comment.postedByUser.picture}
          width={"50px"}
          height={"50px"}
          className="rounded-full"
        />
        <p className="text-center">{comment.postedByUser.firstName}</p>
      </div>
      <p>{comment.description}</p>
    </div>
  );
};

export default Comment;
