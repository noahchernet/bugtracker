import { useState, useEffect } from "react";
import LogInLogOutButton from "../components/LogInLogOutButton";
import { useUser } from "@auth0/nextjs-auth0";
import TicketOverview from "../components/TicketOverview";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import AddTicketButton from "../components/AddTicketButton";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets")
      .then((response) => setAllTickets(response.data))
      .catch((err) => console.log("Error fetching data\n", err))
      .finally(setLoading(false));
  }, []);

  return (
    <div className=" m-5">
      <div className="flex justify-between bg-">
        <h1 className="my-2 p-3 text-4xl font-serif font-semi-bold">
          Avalon Bugtracker
        </h1>
        <LogInLogOutButton />
      </div>
      {loading ? (
        <div className="flex justify-center mt-24">
          <MoonLoader color="#007ACB" size="2rem" />
        </div>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
        >
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {allTickets.map((ticket, index) => (
              <TicketOverview ticket={ticket} key={index} />
            ))}
          </motion.li>
        </motion.ul>
      )}
      <AddTicketButton />
    </div>
  );
}
