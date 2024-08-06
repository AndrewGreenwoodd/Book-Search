"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Book } from "@/app/types/Book.types";
import noImage from "@/assets/No_Image_Available.jpg";
import DOMPurify from "dompurify";
import Link from "next/link";

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (book) {
      setIsLoading(false);
    }
  }, [book]);

  const handleBack = () => {
    window.history.back();
  };

  const sanitizedDescription = book.volumeInfo.description
    ? DOMPurify.sanitize(book.volumeInfo.description)
    : "No description available"; // Secure HTML code

  const thumbnail =
    book.volumeInfo.imageLinks?.large ||
    book.volumeInfo.imageLinks?.thumbnail ||
    noImage;

  return (
    <>
      <button
        className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 mb-4"
        onClick={handleBack}
      >
        Back to selection
      </button>
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="mr-3">Loading...</p>
          <div className="loader border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="book-details flex flex-col  lg:flex-row gap-4 items-center lg:items-start">
          <Image
            src={thumbnail}
            alt={book.volumeInfo.title}
            width={400}
            height={600}
            className="rounded shadow-lg h-[50vh]"
            priority={true}
          />

          <div className="lg:ml-6 mt-4 lg:mt-0 text-center lg:text-left flex flex-col gap-6 ">
            <h1 className="text-4xl text-center font-bold mb-2">
              {book.volumeInfo.title}
            </h1>
            <h2 className="text-2xl text-gray-700 mb-4 text-center">
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : ""}
            </h2>
            <p
              className="text-gray-800 text-center"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
            <Link href={book.volumeInfo.previewLink} target="_blank">
              <p className="text-center text-blue-500"> Preview of this book</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
