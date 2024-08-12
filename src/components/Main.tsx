"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import backgroundImage from "@/assets/book.jpg";

const Main: React.FC = () => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("en");
  const [displayError, setDisplayError] = useState(false);

  const handleSearch = () => {
    if (search.length < 1) {
      setDisplayError(true);
      return;
    }
    document.location.href = `/search?query=${search}&lang=${language}`;
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDisplayError(false);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="header">
      <div className="row2 p-4 ">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Find Your Book
        </h2>
        <div className="search flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-center md:space-x-4 ">
          <input
            type="text"
            placeholder="Enter Your Book Name"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="p-2 border border-gray-300 rounded shadow"
          />
          <label>Book language: </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300  shadow w-full md:w-auto"
          >
            <option value="en">English</option>
            <option value="uk">Ukrainian</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-slate-400 p-2 hover:bg-slate-500 text-black hover:text-white rounded shadow "
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
