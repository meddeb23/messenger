import React from "react";
import SideBar from "../SideBar/SideBar";

import Chat from "../chat/chat";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <SideBar />
      <Chat />
    </div>
  );
}
