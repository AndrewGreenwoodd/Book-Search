import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Book } from "@/app/types/Book.types";

const useBookSearch = (query: string, language: string) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

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
        }&maxResults=20&langRestrict=${language}`
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
        // If you scroll to fast, Books API will throw an error, so we wait 2 seconds to limit requests
        setTimeout(() => fetchBooks(), 2000);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, [query, apiKey, page, bookData, language]);

  return { bookData, fetchBooks, loading, hasMore, setPage };
};

export default useBookSearch;
