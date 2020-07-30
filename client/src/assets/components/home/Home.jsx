import React from "react";
import SideBar from "../SideBar/SideBar";

import io from "socket.io-client";

let socket;

export default function Home() {
  const ENDPOINT = "http://localhost:5005";

  socket = io(ENDPOINT);

  return (
    <div>
      <SideBar />
    </div>
  );
}
