"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import useBookSearch from "@/hooks/useBookSearch";
import Books from "@/components/Books";
import { Book } from "@/app/types/Book.types";

interface ClientSearchResultsProps {
  initialBookData: Book[];
  query: string;
}

const ClientSearchResults: React.FC<ClientSearchResultsProps> = ({
  initialBookData,
  query,
}) => {
  const [bookData, setBookData] = useState<Book[]>(initialBookData);
  const [page, setPage] = useState(1); // start from page 1 since initial data is considered page 0
  const { fetchBooks, loading, hasMore } = useBookSearch(
    query,
    page,
    setPage,
    setBookData
  );

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      fetchBooks();
    }
  }, [inView, loading, hasMore, fetchBooks]);

  return (
    <main className="bg-gray-300">
      <Link href="/" className="mx-auto">
        <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 m-6">
          Back to Search
        </button>
      </Link>

      <Books bookData={bookData} />

      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="mr-3">Loading...</p>
            <div className="loader border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && <p>No more books to load</p>}
      </div>
    </main>
  );
};

export default ClientSearchResults;
