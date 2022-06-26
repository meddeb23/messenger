import React from "react";

export default function InputField({
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}) {
  return (
    <div>
      <label className="dark:text-white block">{label}</label>
      <input
        className="bg-white border-2 border-gray-200 dark:bg-accentdarkgray dark:border-accentdarkgray dark:text-white mt-1 py-2 px-3 mb-1 rounded-md
              w-56 bg-transparent outline-none text-sm"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}
