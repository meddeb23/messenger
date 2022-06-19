import React from "react";
import H2 from "../components/H2";

export default function UserProfileInfo({ receiver }) {
  return (
    <div className="hidden xl:block absolute right-0 top-0 shadow-2xl xl:static rounded-md xl:shadow-none w-full md:w-80">
      {/* <!-- profile header --> */}
      <div className="h-16 py-2 px-4 flex justify-between items-center header_box">
        <H2>Profile</H2>
        <div className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center">
          <svg
            className="w-4 text-gray-200"
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
        </div>
      </div>
      {/* <!-- end profile header --> */}
      {/* <!-- profile info --> */}
      <div className="flex flex-col items-center pt-8">
        <div className="w-32 h-32 shadow-xl rounded-full overflow-hidden">
          <img
            src={receiver.profile_img}
            className="object-cover h-32 w-32"
            alt=""
          />
        </div>
        <div className="font-bold text-xl text-gray-600 pt-4">
          {receiver.name}
        </div>
        <div className="text-blue-700">{receiver.email}</div>
        <div className="text-sm text-gray-400">{receiver.phone}</div>
        <div className="mt-1 text-sm text-gray-400">{receiver.location}</div>

        {/* <!-- end profile info --> */}
      </div>
    </div>
  );
}
