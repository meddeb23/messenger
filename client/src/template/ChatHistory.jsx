import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { ChatCard } from "../components";
import { ChatContext, UserContext } from "../context";

export function ChatHistory() {
  const { setChat, setChatList, chatList } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");

  //   {
  //     user: {
  //       firstName: "Allen",
  //       lastName: "walker",
  //       status: "online",
  //     },
  //     messageBody: "He, can you call me now ?",
  //     time: "18:56",
  //   },
  // ]);

  const [resualt, setResulat] = useState([]);

  // const limit = 10;
  // const [offset, setOffset] = useState(0);

  const onLoadChatHistory = async () => {
    try {
      const res = await axios.get("/api/v1/chat");
      if (res.status === 200) {
        setChatList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/search", { search });
      if (res.status === 200) {
        setResulat(res.data.users);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const onLoadChatByUser = async (_id) => {
    try {
      const res = await axios.get(`/api/v1/chat/receiver/${_id}`);
      if (res.status === 200) {
        setChat(res.data);
        setResulat([]);
      }
      setResulat([]);
    } catch (error) {
      console.log(error.response);
    }
  };
  const onLoadChatById = async (_id) => {
    try {
      const res = await axios.get(`/api/v1/chat/${_id}`);
      if (res.status === 200) {
        setChat(res.data);
        setResulat([]);
      }
      setResulat([]);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    onLoadChatHistory();
  }, []);

  return (
    <div className="w-72 h-full flex-none">
      <div className="relative mx-2">
        <form
          onSubmit={(e) => onSearch(e)}
          className="flex flex-row items-center bg-white border-2 border-gray-200 py-2 px-3  rounded-md"
        >
          <svg
            className="w-5 flex-none text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {resualt.length !== 0 && (
          <ul
            className=" bg-white border-2 border-gray-200  rounded-md shadow-lg absolute w-full mt-1 overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            {resualt.map((item) => (
              <li
                key={`search_user_${item._id}`}
                className="cursor-pointer hover:bg-gray-100 py-2 px-3 "
                onClick={() => onLoadChatByUser(item._id)}
              >
                <div className="text-gray-600">{item.name}</div>
                <div className="text-sm text-gray-400">{item.email}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <section className="pl-2 pt-4">
        <div className="flex flex-row items-center mb-4 space-x-3">
          <h2 className="font-bold text-3xl">Inbox</h2>
          <div className="text-xs border text-red-400 border-red-400 bg-red-100 rounded-full px-2 py-1 font-bold">
            4 new
          </div>
        </div>
        {user && <div className="m-4">{user.name}</div>}
        <div>
          {chatList.length !== 0 &&
            chatList.map((item) => (
              <ChatCard
                key={item._id}
                data={item}
                loadChat={onLoadChatById}
                user={user}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
