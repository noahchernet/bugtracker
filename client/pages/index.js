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
  const [params, setParams] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets", { params: params })
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
        <div className="">
          {/*Filter */}
          <motion.div
            className="rounded border-2 border-black text-center lg:float-left lg:px-10"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h1 className="-ml-5">Filter Tickets</h1>
            <form>
              <label>Severity</label>
              <select
                name="severity"
                required
                value={params.severity}
                onChange={(e) => {
                  setParams({ ...params, severity: e.target.value });
                  console.log("Params", params);
                }}
              >
                <option value="1" default>
                  Low
                </option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </form>
            <button
              className="border-2 border-black m-2 rounded px-2"
              onClick={() => {
                console.log("On search params:", params);
                setLoading(true);
              }}
            >
              Search
            </button>
            <button
              className="border-2 border-black m-2 rounded px-2"
              onClick={() => {
                setParams({});
                setLoading(true);
              }}
            >
              Clear
            </button>
          </motion.div>
          <div className="lg:mx-96">
            <motion.form
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="block"
            >
              <input
                className="border-black border-2 w-5/6 rounded-2xl inline-block"
                value={params.title}
                onChange={(e) => {
                  setParams({ ...params, title: e.target.value });
                }}
              />
              <button
                className="bg-blue-600 border-2 p-1 text-white font-bold rounded-3xl  w-1/6 inline-block"
                onClick={() => setLoading(true)}
              >
                Search
              </button>
            </motion.form>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
            >
              {allTickets.map((ticket, index) => (
                <motion.li
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
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
          </div>
        </div>
      )}
    </div>
  );
}
