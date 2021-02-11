import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../context";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import "../style/nav.css";

export function NavBar() {
  const { setIsAdmin, setUser, setIsLoggedin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/v1/user/logout");
      if (res.status === 200) {
        history.push("/login");
        setUser(null);
        setIsLoggedin(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <header className="md:hidden">
        {!isOpen ? (
          <svg
            onClick={() => setIsOpen(true)}
            className="cursor-pointer w-6 h-6 absolute top-2 right-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setIsOpen(false)}
            className="cursor-pointer w-6 h-6 absolute top-2 right-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </header>
      <nav
        style={{ backgroundColor: "#050646", minHeight: "400px" }}
        className={`z-50 fixed ${isOpen ? "left-2" : "-left-20"}
        md:h-auto md:static flex-none flex py-8 rounded-xl shadow-md w-16 flex-col justify-between items-center`}
      >
        <div className="flex flex-col space-y-8">
          <NavLink to="/messages">
            <div className="mx-auto w-6 h-6 rounded-md text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="text-center text-xs mt-1 text-gray-200">Home</div>
          </NavLink>
          {/* Calender */}
          {/* <div>
          <div className="mx-auto w-6 h-6 rounded-md text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-center text-xs mt-1 text-gray-200">calender</div>
        </div> */}
          {/* end Calender */}
          {/* Messages */}
          {/* <div>
          <div className="mx-auto w-6 h-6 rounded-md text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <div className="text-center text-xs mt-1 text-gray-200">messages</div>
        </div> */}
          {/* end Messages */}
          <NavLink to="/setting">
            <div className="mx-auto w-6 h-6 rounded-md text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-center text-xs mt-1 text-gray-200">
              Setting
            </div>
          </NavLink>
        </div>
        <div>
          <div
            className="cursor-pointer hover:bg-blue-900"
            onClick={(e) => onLogout(e)}
          >
            <div className="mx-auto w-6 h-6 rounded-md text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-center text-xs mt-1  text-gray-200">
              logout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
