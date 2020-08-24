import React from "react";
import SideBar from "../SideBar/SideBar";

import Chat from "../chat/chat";

export default function Home() {
  return (
    <div className="home">
      <SideBar />
      <Chat />
    </div>
  );
}
