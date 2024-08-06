"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Card from "@/components/Card";
import { Book } from "../types/Book.types";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [bookData, setBookData] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const filterDuplicates = (books: Book[], newBooks: Book[]): Book[] => {
    //sometimes Books API sends duplicate books
    const existingIds = new Set(books.map((book) => book.id));
    return newBooks.filter((book) => !existingIds.has(book.id));
  };

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&startIndex=${
          page * 20
        }&maxResults=20`
      );
      const newBooks = response.data.items || [];
      if (newBooks.length < 20) {
        setHasMore(false);
      }
      const uniqueBooks = filterDuplicates(bookData, newBooks);
      setBookData((prevData) => [...prevData, ...uniqueBooks]);
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.log("Rate limit exceeded, retrying in 2 seconds...");
        setTimeout(() => fetchBooks(), 2000); // If you scroll to fast, Books API will throw an error, so we wait 2 seconds to limit requests
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, [query, apiKey, page, bookData]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      fetchBooks();
    }
  }, [inView, loading, hasMore, fetchBooks]);

  return (
    <>
      <Link href="/" className="mx-auto">
        <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 m-6">
          Back to Search
        </button>
      </Link>

      <Card bookData={bookData} />

      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {loading && <p>Loading more books...</p>}
        {!hasMore && <p>No more books to load</p>}
      </div>
    </>
  );
};

export default SearchResults;
