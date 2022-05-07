#!/usr/bin/node
import mongoose from "mongoose";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import { Comment } from "../models/Comment.js";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.CONNECTION_TESTDB_URL);

main().catch((err) => console.log(err));
test().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.CONNECTION_TESTDB_URL);
    const john = new User({
      username: "john1212",
      password: "bvavsk13asdfkljndfs24341238",
      firstName: "John",
      lastName: "Doe",
      devType: "Junior",
    });
  console.log(john.username);
  // await john.save();
  console.log("Saved");
  console.log(await User.find());

  const ticket_1 = new Ticket({
    title: "Ticket 1",
    postedByUser: ,
    description: "It ain't working. pls hlp",
    severity: 1,
    taggedUsers: ["Bekele", "Ambasel"],
    solved: false,
    attachments: [],
    solution: null,
    due: Date.now(),
  });

  // await ticket_1.save();
  console.log(await Ticket.find());

  return;
}

async function test() {
  await mongoose.connect(process.env.CONNECTION_TESTDB_URL);

  const ticket_2 = new Ticket({
    title: "Ticket 2",
    postedByUser: mongoose.Types.ObjectId("62762fea0af806c29fbc0644"),
    description: "It ain't working. pls hlp",
    severity: 1,
    taggedUsers: [],
    solved: false,
    attachments: [],
    solution: null,
    due: Date.now(),
  });

  // await ticket_2.save();
  console.log(await Ticket.find());

  const fetchedTicket = await Ticket.find({
    _id: mongoose.Types.ObjectId("627655cab6383414286ed51f"),
  });
  console.log("/// User ID///");
  console.log(fetchedTicket[0]);
  console.log("\n/// User ///\n");
  const user = await User.findById(fetchedTicket[0].postedByUser);
  console.log(user);

  const comment_1 = new Comment({
    ticketId: fetchedTicket[0]._id,
    postedByUser: user._id,
    description: "Try cleaning the cache files",
  });
  // await comment_1.save();

  console.log("/// Comment ///");
  console.log(await Comment.find());
  const userFromComment = await User.findById( comment_1.postedByUser );
  console.log("/// Comment Posted By:");
  console.log(userFromComment);
  const ticketFromComment = await Ticket.findById( comment_1.ticketId );
  console.log("/// Ticket from Comment:");
  console.log(ticketFromComment);
}
