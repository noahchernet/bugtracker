import { Badge } from "@chakra-ui/react";
import React from "react";

export default function TicketSeverityBadge({ severity }) {
  if (severity === 1) return <Badge colorScheme={"gray"}>Low Priority</Badge>;
  else if (severity === 2)
    return <Badge colorScheme={"orange"}>Medium Priority</Badge>;
  return <Badge colorScheme={"red"}>High Priority</Badge>;
}
