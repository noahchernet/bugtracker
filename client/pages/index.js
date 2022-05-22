import { Header } from "../components/Layout/Header";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import TicketOverview from "../components/Index/TicketOverview";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import AddTicketButton from "../components/Index/AddTicketButton";
import { motion } from "framer-motion";
import NewTicketModal from "../components/Index/NewTicketModal";

export default function Home() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [allTickets, setAllTickets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets")
      .then((response) => setAllTickets(response.data))
      .catch((err) => console.log("Error fetching data\n", err))
      .finally(setLoading(false));
  }, []);

  return (
    <div className=" m-5">
      <Header />
      {loading ? (
        <div className="flex justify-center mt-24">
          <MoonLoader color="#007ACB" size="2rem" />
        </div>
      ) : (
        <>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
          >
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {allTickets.map((ticket, index) => (
                <TicketOverview ticket={ticket} key={index} />
              ))}
            </motion.li>
          </motion.ul>
          <NewTicketModal open={isOpen} close={() => setIsOpen(false)} />
          <AddTicketButton setIsOpen={setIsOpen} />
        </>
      )}
    </div>
  );
}
