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
      className="flex flex-row items-center py-2 px-3 header_box dark:bg-accentdarkgray"
    >
      <button type="submit" className="cursor-pointer outline-none">
        <SearchIcon styleClasses="w-5 flex-none text-gray-400 " />
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={defaultValue}
        className="bg-transparent outline-none ml-2 text-sm w-full dark:text-white"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchbox(true)}
      />
    </form>
  );
}
