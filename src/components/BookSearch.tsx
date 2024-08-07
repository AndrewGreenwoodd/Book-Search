"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import useBookSearch from "@/hooks/useBookSearch";
import BooksGrid from "@/components/BooksGrid";

interface BookSearchProps {
  query: string;
  language: string;
}

const BookSearchWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const language = searchParams.get("lang") || "";

  return <BookSearch query={query} language={language}></BookSearch>;
};

const BookSearch: React.FC<BookSearchProps> = ({ query, language }) => {
  const { bookData, fetchBooks, loading, hasMore } = useBookSearch(
    query,
    language
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
    <main className="bg-gray-300 min-h-[100vh]">
      <Link href="/" className="mx-auto">
        <button className="p-2 bg-slate-400  hover:bg-slate-500 text-black hover:text-white rounded shadow  m-6">
          &larr; Back to Search
        </button>
      </Link>

      <BooksGrid bookData={bookData} />

      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="flex justify-center items-center">
            <p className="mr-3">Loading...</p>
            <div className="loader border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && <p>No more books to load</p>}
      </div>
    </main>
  );
};

export default BookSearchWrapper;
