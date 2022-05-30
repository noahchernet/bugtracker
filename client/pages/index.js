import { Loading } from "./../components/Loading";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import TicketOverview from "../components/Index/TicketOverview";
import axios from "axios";
import AddTicketButton from "../components/Index/AddTicketButton";
import { motion, AnimatePresence } from "framer-motion";
import NewTicketModal from "../components/Index/NewTicketModal";
import Link from "next/link";

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(false);
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
    <AnimatePresence>
      <div className=" m-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="">
            <div className="lg:mx-96">
              <motion.form
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="block"
              >
                <input
                  type="text"
                  className="my-3 w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md  focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search ticket"
                  value={params.title}
                  onChange={(e) => {
                    setParams({ ...params, title: e.target.value });
                  }}
                  onKeyDown={(keyPress) => {
                    if (keyPress.key === "Enter") {
                      setLoading(true);
                    }
                  }}
                />
              </motion.form>
              <motion.div>
                {/* Filter tickets accordion */}
                <article className="border-gray-400 border-b hover:bg-gray-300 transition-all duration-200">
                  <div
                    onClick={() => {
                      filterOpen ? setFilterOpen(false) : setFilterOpen(true);
                    }}
                    className={`${
                      filterOpen ? "bg-gray-200" : ""
                    } flex justify-between items-center p-2 pl-8 pr-8 cursor-pointer select-none`}
                  >
                    <h3 className=" text-xl text-gray-800">Filter tickets</h3>
                    {/*Arrow SVG*/}
                    <div className="rounded-full border w-7 h-7 flex items-center justify-center hover:bg-gray-200">
                      {filterOpen ? (
                        <div className="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {filterOpen ? (
                    <AnimatePresence>
                      <motion.div
                        className="pl-8 pr-8 py-5 bg-gray-100 text-gray-700"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                      >
                        <form>
                          <div className="flex justify-between mb-2">
                            <label>Severity</label>
                            <div>
                              <input
                                type="radio"
                                id="low"
                                value="1"
                                checked={params.severity === 1}
                                onChange={() =>
                                  setParams({ ...params, severity: 1 })
                                }
                                className="mr-1"
                              />
                              <label htmlFor="low" className="mr-3">
                                Low
                              </label>
                              <input
                                type="radio"
                                id="med"
                                value="2"
                                checked={params.severity === 2}
                                onChange={() =>
                                  setParams({ ...params, severity: 2 })
                                }
                                className="mr-1"
                              />
                              <label htmlFor="med" className="mr-3">
                                Medium
                              </label>
                              <input
                                type="radio"
                                id="high"
                                value="3"
                                checked={params.severity === 3}
                                onChange={() =>
                                  setParams({ ...params, severity: 3 })
                                }
                                className="mr-1"
                              />
                              <label htmlFor="high" className="mr-3">
                                High
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <label>Status</label>
                            <div>
                              <input
                                type="radio"
                                id="solved"
                                checked={params.solved === true}
                                onChange={() =>
                                  setParams({ ...params, solved: true })
                                }
                                className="mr-1"
                              />
                              <label htmlFor="solved" className="mr-3">
                                Solved
                              </label>
                              <input
                                type="radio"
                                id="unsolved"
                                checked={params.solved === false}
                                onChange={() =>
                                  setParams({ ...params, solved: false })
                                }
                                className="mr-1"
                              />
                              <label htmlFor="unsolved" className="mr-3">
                                Unsolved
                              </label>
                            </div>
                          </div>
                        </form>
                        {Object.keys(params).length !== 0 ? (
                          <motion.div
                            className="flex flex-row-reverse "
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                          >
                            <button
                              className="border-2 bg-blue-600 text-white m-2 mb-0 rounded-lg px-2 py-1 "
                              onClick={() => {
                                console.log("On search params:", params);
                                setLoading(true);
                              }}
                            >
                              Search
                            </button>
                            <button
                              className="border-2 bg-red-600 text-white m-2 mb-0 rounded-lg px-2 py-1 "
                              onClick={() => {
                                setParams({});
                                setLoading(true);
                              }}
                            >
                              Clear
                            </button>
                          </motion.div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  ) : null}
                </article>
              </motion.div>
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
    </AnimatePresence>
  );
}
