import React from "react";
import BookSearch from "@/components/BookSearch";

export const generateMetadata = ({ searchParams }: any) => {
  const query = searchParams.query || "";

  return {
    title: `Search Results for "${query}"`,
    description: `Search for your favourite books, like ${query}`,
  };
};

const SearchResultsPage: React.FC = () => {
  return <BookSearch />;
};

export default SearchResultsPage;
