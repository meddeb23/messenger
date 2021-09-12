import React from "react";

export default function SearchBar({
  onSearch,
  setSearch,
  setSearchbox,
  defaultValue,
}) {
  return (
    <form
      onSubmit={(e) => onSearch(e)}
      className="flex flex-row items-center bg-white border-2 border-gray-200 py-2 px-3  rounded-md"
    >
      <button type="submit" className="cursor-pointer outline-none">
        <svg
          className="w-5 flex-none text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={defaultValue}
        className="bg-transparent outline-none ml-2 text-sm w-full"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchbox(true)}
      />
    </form>
  );
}
