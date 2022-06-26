import React from "react";

export default function Heading({ children, size, className }) {
  return (
    <h2
      style={{ fontSize: size || "1rem" }}
      className={`font-bold text-gray-600 dark:text-gray-100 text-lg ${className}`}
    >
      {children}
    </h2>
  );
}
