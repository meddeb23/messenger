import React from "react";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import ChatHistory from "../ChatHistory/ChatHistory";

export default function SideBar() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="sidebar">
      <div className="userInfo">
        <h1>{user.name}</h1>
      </div>
      <SearchBar />
      <ChatHistory />
    </div>
  );
}
