"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Book } from "../types/Book.types";
import Link from "next/link";

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [bookData, setBookData] = useState<Book[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

  useEffect(() => {
    if (query) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=20`
        )
        .then((res) => setBookData(res.data.items))
        .catch((err) => console.log(err));
    }
  }, [query, apiKey]);

  return (
    <>
      <Link href="/" className="mx-auto">
        <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 m-6">
          Back to Search
        </button>
      </Link>

      <Card bookData={bookData} />
    </>
  );
};

export default SearchResults;
