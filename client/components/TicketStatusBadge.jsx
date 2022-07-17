import { Badge } from "@chakra-ui/react";
import React from "react";

export default function TicketStatusBadge({ solved }) {
  if (solved === true) return <Badge colorScheme={"green"}>Solved</Badge>;
  return <Badge colorScheme={"red"}>Unsolved</Badge>;
}
