import React from "react";

export default function UserSearchResultCart({ item, handler }) {
  return (
    <li
      onClick={() => handler(item._id)}
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 py-2 px-3 flex flex-row items-center gap-2"
    >
      {item.profile_img && (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={item.profile_img}
            alt={`${item.name} profile`}
            className="w-10 h-10 object-cover"
          />
        </div>
      )}
      <div>
        <div className="text-gray-600 dark:text-gray-100">{item.name}</div>
        <div className="text-sm text-gray-400 dark:text-gray-300">
          {item.email}
        </div>
      </div>
    </li>
  );
}
