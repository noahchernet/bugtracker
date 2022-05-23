import { Loading } from "./../components/Loading";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import TicketOverview from "../components/Index/TicketOverview";
import axios from "axios";
import AddTicketButton from "../components/Index/AddTicketButton";
import { motion } from "framer-motion";
import NewTicketModal from "../components/Index/NewTicketModal";
import Link from "next/link";

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
  }, [loading]);

  return (
    <div className=" m-5">
      {/* <Header /> */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
          >
            {allTickets.map((ticket, index) => (
              <motion.li
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.15 }}
                key={index}
              >
                <Link href={`/ticket/${ticket._id}`} key={index} passHref>
                  <TicketOverview ticket={ticket} key={index} />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <NewTicketModal
            open={isOpen}
            close={() => setIsOpen(false)}
            setIsTicketListLoading={setLoading}
          />
          <AddTicketButton setIsOpen={setIsOpen} />
        </>
      )}
    </div>
  );
}
