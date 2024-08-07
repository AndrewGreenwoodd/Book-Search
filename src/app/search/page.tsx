import React from "react";
import BookSearchWrapper from "@/components/BookSearch";
import { Suspense } from "react";

export const generateMetadata = ({ searchParams }: any) => {
  const query = searchParams.query || "";

  return {
    title: `Search Results for "${query}"`,
    description: `Search for your favourite books, like ${query}`,
  };
};

const SearchResultsPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookSearchWrapper />;
    </Suspense>
  );
};

export default SearchResultsPage;
