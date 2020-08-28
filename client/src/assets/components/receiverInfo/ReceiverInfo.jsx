import React from "react";
import { useDispatch } from "react-redux";
import { createChat } from "../../flux/actions/chatAction";

export default function ReceiverInfo({ receiver }) {
  return (
    <div className="receiver-info">
      <h3>{`${receiver.first_name} ${receiver.last_name}`}</h3>
      <div className="add-btn">
        <i className="fa fa-plus"></i>
      </div>
    </div>
  );
}
