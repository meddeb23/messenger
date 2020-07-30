import React from "react";
import { useForm } from "../../utility";
import { search } from "../../flux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";
let socket;

export default function SearchBar() {
  const ENDPOINT = "http://localhost:5005";
  socket = io(ENDPOINT);

  const dispatch = useDispatch();

  const [values, setValues] = useForm({ search: "" });
  const resualt = useSelector((state) => state.user.search);
  const user = useSelector((state) => state.user.user);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(search(values));
  };

  const startChat = (e, id) => {
    socket.emit("start_chat", { sender: user._id, reciever: id });
  };

  return (
    <form onSubmit={(e) => onSubmitForm(e)}>
      <div className="form-group">
        <input
          onChange={(e) => setValues(e)}
          type="text"
          name="search"
          className="form-control"
          id="search"
          placeholder="Search"
        />
      </div>
      <button>Search</button>
      {resualt && (
        <ul>
          {resualt.map((user) => (
            <li key={user._id} onClick={(e) => startChat(e, user._id)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
