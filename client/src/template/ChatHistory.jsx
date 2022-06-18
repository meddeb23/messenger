import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { ChatCard } from "../components";
import SearchBar from "../components/SearchBar";
import UserSearchResultCart from "../components/UserSearchResultCart";
import { ChatContext, UserContext } from "../context";

export function ChatHistory() {
  const { setChat, setChatList, setReceiver, chatList, chat } =
    useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchBox, setSearchbox] = useState(false);
  const [countNewMessages, setCountNewMessages] = useState(0);
  const [resualt, setResulat] = useState([]);
  const [userSeggestions, setUserSuggestion] = useState([]);
  const [chatPage, setChatPage] = useState(0);

  const onLoadChatHistory = async () => {
    try {
      const res = await axios.get(`/api/v1/chat?page=${chatPage}`);
      if (res.status === 200) {
        setChatList(res.data);
        setChatPage((value) => value + 1);
        // set the first chat as active chat
        if (res.data.length !== 0 && window.innerWidth >= 768) {
          onLoadChatById(res.data[0]._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onLoadUserSeggestions = async () => {
    try {
      const res = await axios.get(`/api/v1/user/suggestion`);
      if (res.status === 200) {
        setUserSuggestion(res.data.users);
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
        console.log(res.data);
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
        setReceiver(res.data.receiver);
        setResulat([]);
      }
      setResulat([]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCountNewMessages = () => {
    let counter = 0;
    chatList.forEach((chat) => {
      if (chat.lastMsg.status !== "seen") counter++;
    });
    return counter;
  };

  useEffect(() => {
    setCountNewMessages(getCountNewMessages());
  }, [chatList]);

  useEffect(() => {
    onLoadChatHistory();
    onLoadUserSeggestions();

    return () => {};
  }, []);

  return (
    <>
      {searchBox && (
        <div
          className="absolute  top-0 left-0 z-40 h-full w-full"
          style={{ background: "#00000033", marginLeft: 0 }}
          onClick={() => {
            setSearchbox(false);
            setResulat([]);
            setSearch("");
          }}
        ></div>
      )}
      <div
        className="mt-8 md:mt-0 w-full md:w-72 h-full overflow-auto flex-none"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        <div className="relative mx-2 z-40">
          <SearchBar
            defaultValue={search}
            setSearch={setSearch}
            onSearch={onSearch}
            setSearchbox={setSearchbox}
          />
          {searchBox && (
            <ul
              className=" bg-white border-2 border-gray-200  rounded-md shadow-lg absolute w-full mt-1 overflow-y-auto"
              style={{ maxHeight: "200px" }}
            >
              {resualt.length !== 0
                ? resualt.map((item) => (
                    <UserSearchResultCart
                      key={`searchResult${item._id}`}
                      item={item}
                      handler={(_id) => {
                        setSearchbox(false);
                        onLoadChatByUser(item._id);
                      }}
                    />
                  ))
                : userSeggestions && (
                    <>
                      <li className="font-bold text-gray-900 text-sm pb-1 border-b-2 border-gray-600 py-2 px-3 ">
                        <div className="text-gray-600">suggestions</div>
                      </li>
                      {userSeggestions.map((item) => (
                        <UserSearchResultCart
                          key={`userSuggestion${item._id}`}
                          item={item}
                          handler={(_id) => {
                            setSearchbox(false);
                            onLoadChatByUser(item._id);
                          }}
                        />
                      ))}
                    </>
                  )}
            </ul>
          )}
        </div>
        <section className="pl-2 pt-4">
          <div className="flex flex-row items-center mb-4 space-x-3">
            <h2 className="font-bold text-3xl">Inbox</h2>
            {countNewMessages !== 0 && (
              <div className="text-xs border text-red-400 border-red-400 bg-red-100 rounded-full px-2 py-1 font-bold">
                {countNewMessages} new
              </div>
            )}
          </div>
          <div>
            {chatList.length !== 0 &&
              chatList.map((item) => (
                <ChatCard
                  isActive={chat && chat._id == item._id}
                  key={`chatHistory${item._id}`}
                  data={item}
                  loadChat={onLoadChatById}
                  user={user}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
