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
        className="bg-slate-400 p-3 hover:bg-slate-500 rounded shadow  mb-4"
        onClick={handleBack}
      >
        &larr; Back To Selection
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
            <h2 className="text-2xl text-gray-700 text-center">
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.length === 1
                  ? "Author: " + book.volumeInfo.authors.join(", ")
                  : "Authors: " + book.volumeInfo.authors.join(", ")
                : ""}
            </h2>
            <p
              className="text-gray-800 text-center"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
            <div className="actions flex self-center gap-5">
              <Link
                href={book.volumeInfo.previewLink}
                target="_blank"
                className="bg-slate-400 p-3 hover:bg-slate-500 "
              >
                <p className="text-center text-black hover:text-white">
                  {" "}
                  Preview of this book
                </p>
              </Link>
              <Link
                href={book.volumeInfo.infoLink}
                target="_blank"
                className="bg-slate-400 p-3 hover:bg-slate-500 "
              >
                <p className="text-center text-black hover:text-white">
                  {" "}
                  This book in store
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
