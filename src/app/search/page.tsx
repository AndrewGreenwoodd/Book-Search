"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import useBookSearch from "@/hooks/useBookSearch";
import Card from "@/components/Card";

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { bookData, fetchBooks, loading, hasMore } = useBookSearch(query);
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
