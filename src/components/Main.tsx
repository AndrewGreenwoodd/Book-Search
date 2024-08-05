"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import backgroundImage from "@/assets/book.jpg";

const Main: React.FC = () => {
  const [search, setSearch] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const handleSearch = () => {
    if (search.length < 1) {
      setDisplayError(true);
      return;
    }
    document.location.href = `/search?query=${search}`;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDisplayError(false);
  };

  return (
    <div className="header">
      <div className="row2 p-4 ">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Find Your Book
        </h2>
        <div className="search flex items-center justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter Your Book Name"
            value={search}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="p-2 border border-gray-300 rounded shadow"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {displayError && (
          <p className="text-red-500 text-center mt-1">
            Your search field must not be empty
          </p>
        )}
        <Image
          src={backgroundImage}
          alt="book"
          className="mt-4 h-2/4 w-auto"
          priority
          width={500}
        />
      </div>
    </div>
  );
};

export default Main;
