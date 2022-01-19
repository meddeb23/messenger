import React from "react";
import { SearchIcon } from "./icons/index";

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
        <SearchIcon style="w-5 flex-none text-gray-400 " />
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
