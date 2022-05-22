import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";
import axios from "axios";
import Image from "next/image";
import Comment from "../../components/Ticket/Comment";

const Title = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets/" + id)
      .then(async (res) => {
        const ticketComments = await axios.get(
          "http://localhost:5000/comments/" + id
        );
        setComments(ticketComments.data);
        console.log(ticketComments);
        setTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data\n", err);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Ticket's Details */}
          <div className=" m-24 mx-96 p-6 border-black border-2 rounded block">
            <h2 className="text-xl font-bold mb-10">{ticket.title}</h2>
            <p>{ticket.description}</p>
            {ticket.attachments ?? (
              <Image src={ticket.attachments} alt="ImG" layout="responsive" />
            )}
            <p className="border-b-2 border-gray-200 border-solid my-2"></p>
            <div className="flex ">
              <Image
                src={ticket.postedByUser.picture}
                width={"50px"}
                height={"50px"}
                className="rounded-full"
              />
              <div className="ml-3 flex-col">
                <p>
                  {ticket.postedByUser.firstName +
                    " " +
                    ticket.postedByUser.lastName}
                </p>
                <p>{ticket.postedByUser.email}</p>
              </div>
            </div>
          </div>
          {/* Comments */}
          <div className="mx-96">
            {Object.keys(comments).map((key, index) => (
              <Comment comment={comments[key]} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Title;
