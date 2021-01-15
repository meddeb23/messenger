import io from "socket.io-client";

class Socket_client {
  constructor(ENDPOINT) {
    this.ENDPOINT = ENDPOINT;
    this.socket = undefined;
  }

  ioConnection = (_id) => {
    this.socket = io(ENDPOINT);
    this.socket.on("auth", () => {
      this.socket.emit("login", _id);
    });
    console.log("io connection");
  };
  // update when the chat update
  onReceiveMsg = (chat, setChat, chatList, setChatList) => {
    console.log("onReceiveMsg");

    if (this.socket) {
      this.socket.on("message", (msg) => {
        console.log("receiving msg");
        // display the msg in the active chat
        if (chat && chat._id === msg.chat) {
          setChat({ ...chat, messages: [...chat.messages, msg] });
        }
        // display the recent chat in the top of the chat history
        const newChatList = chatList.filter((item) => item._id !== msg.chat);
        const activeChat = chatList.find((item) => item._id === msg.chat);
        activeChat.lastMsg = msg;
        newChatList.unshift(activeChat);
        setChatList(newChatList);
        console.log("upadate the status");
        this.socket.emit("update_msg_status", { msg, status: "delivered" });
      });
      this.socket.on("msg_status_updated", ({ status, msg }) => {
        console.log(msg);
        console.log(`is ${status}`);
      });
    }
  };
}
const ENDPOINT = "http://localhost:5005";
const socket_client = new Socket_client(ENDPOINT);
export default socket_client;
