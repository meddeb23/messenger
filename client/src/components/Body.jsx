import React from "react";

export function Body({ children }) {
  return (
    <main className="bg-gray-100">
      <div className="relative flex p-3 md:space-x-2 min-h-screen">
        {children}
      </div>
    </main>
  );
}
