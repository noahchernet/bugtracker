import { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Loading from "../components/Loading";
import axios from "axios";
import TicketBrief from "../components/TicketBrief";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  unsetLoading,
} from "../features/ticketListLoading/ticketListLoadingSlice";

export default function Home() {
  const [allTickets, setAllTickets] = useState([]);
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state) => state.ticketListLoading.value);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets`, { params: "" })
      .then((response) => {
        setAllTickets(response.data.reverse());
        // console.log(allTickets);
      })
      .catch((err) => console.log("Error fetching data\n", err))
      .finally(dispatch(unsetLoading()));
  }, [loading]);

  return (
    <Box as="section" pt="2rem">
      {loading ? (
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
