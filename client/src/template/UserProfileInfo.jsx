import React from "react";
import { HiX } from "react-icons/hi";
import Heading from "../components/Heading";

export default function UserProfileInfo({ receiver }) {
  return (
    <div className="hidden xl:block absolute right-0 top-0 shadow-2xl xl:static rounded-md xl:shadow-none w-full md:w-80">
      {/* <!-- profile header --> */}
      <div className="h-16 py-2 px-4 flex justify-between items-center header_box">
        <Heading size={"1.25em"}>Profile</Heading>
        <div className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center dark:text-gray-100">
          <HiX size={16} />
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
          <Heading size={"1em"}>{receiver.name}</Heading>
        </div>
        <div className="text-blue-700">{receiver.email}</div>
        <div className="text-sm text-gray-400">{receiver.phone}</div>
        <div className="mt-1 text-sm text-gray-400">{receiver.location}</div>

        {/* <!-- end profile info --> */}
      </div>
    </div>
  );
}
