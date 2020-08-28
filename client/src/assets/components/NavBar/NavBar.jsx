import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navBar">
      <ul>
        <NavLink className="active" to="/home">
          <li>
            <i className="fa fa-comment"></i>
          </li>
        </NavLink>
        <NavLink to="/profile">
          <li>
            <i className="fa fa-user"></i>
          </li>
        </NavLink>
        <NavLink to="/group">
          <li>
            <i className="fa fa-users"></i>
          </li>
        </NavLink>
        <NavLink to="/params">
          <li>
            <i className="fa fa-cog"></i>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
