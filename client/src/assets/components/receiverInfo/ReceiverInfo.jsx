import React from "react";
import { useDispatch } from "react-redux";
import { createChat } from "../../flux/actions/chatAction";

export default function ReceiverInfo(props) {
  const dispatch = useDispatch();
  console.log(props.receiver._id);
  return (
    <div className="receiver-info">
      <h3>{props.receiver.name}</h3>
      <div
        className="add-btn"
        onClick={() => dispatch(createChat(props.receiver._id))}
      >
        <i className="fa fa-plus"></i>
      </div>
    </div>
  );
}
