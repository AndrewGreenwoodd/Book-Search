"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Book } from "@/app/types/Book.types";
import noImage from "@/assets/No_Image_Available.jpg";
import DOMPurify from "dompurify";

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((res) => setBook(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  if (!book) {
    return <div className="text-center mt-28">Loading...</div>;
  }

  console.log(book);
  const sanitizedDescription = book.volumeInfo.description
    ? DOMPurify.sanitize(book.volumeInfo.description)
    : "No description"; //to secure html code we get from backend

  const thumbnail = book.volumeInfo.imageLinks?.large || noImage;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <button
          className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 mb-4"
          onClick={handleBack}
        >
          Back to selection
        </button>
        <div className="book-details flex flex-col lg:flex-row gap-4 items-center lg:items-start">
          <Image
            src={thumbnail}
            alt={book.volumeInfo.title}
            width={400}
            height={600}
            className="rounded shadow-lg h-[50vh]"
            priority
          />

          <div className="lg:ml-6 mt-4 lg:mt-0 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-2 text-center">
              {book.volumeInfo.title}
            </h1>
            <h2 className="text-2xl text-gray-700 mb-4 text-center">
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : ""}
            </h2>
            <p
              className="text-gray-800"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
