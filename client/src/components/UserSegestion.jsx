import React from "react";

export default function UserSeggestion({ userSeggestions, onLoadChatByUser }) {
  return (
    userSeggestions.length !== 0 && (
      <div>
        <h1 className="font-bold mb-4 text-gray-900 text-sm pb-1 border-b-2 border-gray-600">
          suggestions
        </h1>
        {userSeggestions.map((item) => (
          <div
            key={`userSeggestions${item._id}`}
            onClick={() => onLoadChatByUser(item._id)}
            className="flex flex-row items-center cursor-pointer hover:bg-gray-200 p-2 transition-colors space-x-2 my-1"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={item.profile_img}
                alt={`${item.name} profile picture`}
                className="w-8 h-8 object-cover"
              />
            </div>
            <div>
              <div className="text-gray-600">{item.name}</div>
              <div className="text-sm text-gray-400">{item.email}</div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
