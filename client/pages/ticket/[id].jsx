import { useUser } from "@auth0/nextjs-auth0";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function DetailedTicket() {
  const router = useRouter();

  useEffect(() => {}, [router.isReady]);

  return <div>Ticket is {router.query.id}</div>;
}
