import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TicketDetails from "../../components/TicketDetails";
import { Divider, VStack } from "@chakra-ui/react";
import CommentsList from "../../components/CommentsList";
import NewCommentDialog from "../../components/NewCommentDialog";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import DefaultLayout from "../../layout/DefaultLayout";

export default function DetailedTicket() {
  const allTickets = useSelector((state) => state.ticketList.ticketList);
  // console.log("All tickets...", allTickets);
  const [ticket, setTicket] = useState({}); // The ticket that this comment was added to
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setTicket(
        allTickets.filter((ticket) => ticket._id === router.query.id)[0]
      );
      setLoading(false);
    }
  }, [router.isReady]);

  return (
    <DefaultLayout>
      {loading || ticket === {} || router.query === {} ? (
        <Loading />
      ) : (
        <VStack pt="3rem">
          {/* Sending Redux's state rather than useState's so TicketDetails updates whenever Redux's ticketList updates */}
          <TicketDetails
            ticket={
              allTickets.filter((ticket) => ticket._id === router.query.id)[0]
            }
          />
          <Divider bg="gray.900" w="45%" />
          <CommentsList ticket={ticket} />
          <NewCommentDialog ticketId={router.query.id} />
        </VStack>
      )}
    </DefaultLayout>
  );
}
