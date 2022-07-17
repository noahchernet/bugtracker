import { useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Loading from "../components/Loading";
import axios from "axios";
import TicketBrief from "../components/TicketBrief";
import { useSelector, useDispatch } from "react-redux";
import { updateAllTickets } from "../features/ticketListSlice/ticketListSlice";

export default function Home() {
  const allTickets = useSelector((state) => state.ticketList.ticketList);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets`, { params: "" })
      .then((response) => {
        dispatch(updateAllTickets(response.data.reverse()));
        // console.log(allTickets);
      })
      .catch((err) => console.log("Error fetching data\n", err));
  }, []);

  return (
    <Box as="section" pt="2rem">
      {allTickets === [] ? (
        <Loading />
      ) : (
        <VStack spacing={"1em"}>
          {allTickets.map((ticket, index) => (
            <TicketBrief ticket={ticket} key={index} />
          ))}
        </VStack>
      )}
    </Box>
  );
}
