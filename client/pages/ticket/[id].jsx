import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TicketDetails from "../../components/TicketDetails";
import { Divider, VStack } from "@chakra-ui/react";
import CommentsList from "../../components/CommentsList";
import NewCommentDialog from "../../components/NewCommentDialog";

export default function DetailedTicket() {
  const router = useRouter();

  useEffect(() => {}, [router.isReady]);

  return (
    <VStack pt="3rem">
      <TicketDetails id={router.query.id} />
      <Divider bg="gray.900" w="45%" />
      <CommentsList ticketId={router.query.id} />
      <NewCommentDialog ticketId={router.query.id} />
    </VStack>
  );
}
