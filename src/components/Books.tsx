"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/app/types/Book.types";
import noImage from "@/assets/No_Image_Available.jpg";
import { useState } from "react";

interface CardProps {
  bookData: Book[];
}

const Books: React.FC<CardProps> = ({ bookData }) => {
  return (
    <div className="w-5/6 m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-4 ">
      {bookData ? (
        bookData.map((item) => {
          const thumbnail = item.volumeInfo.imageLinks?.thumbnail
            ? item.volumeInfo.imageLinks?.thumbnail
            : noImage;
          return (
            <div
              className="card group relative p-4 bg-gray-100 shadow rounded cursor-pointer h-13 flex flex-col align-middle justify-center"
              key={item.id + item.accessInfo.country}
            >
              <Link href={`/book/${item.id}`}>
                <div className="relative">
                  <Image
                    src={thumbnail}
                    alt=""
                    width={500}
                    height={500}
                    className="rounded h-80 w-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                    <span className="text-white text-lg mb-4 bg-black bg-opacity-80 p-1">
                      Show more
                    </span>
                  </div>
                </div>
              </Link>
              <div className="mt-4 flex-1">
                <Title title={item.volumeInfo.title} />
              </div>
            </div>
          );
        })
      ) : (
        <p className=" col-start-3">No books with such query found</p>
      )}
    </div>
  );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault(); //because all card is inside link, and we don't want a redirect
    setIsExpanded(!isExpanded);
  };
  let titleBlock = title ? (
    title.length > 50 ? (
      <p
        className="text-lg font-semibold line-clamp-2 overflow-hidden"
        onClick={toggleExpand}
      >
        {title.slice(0, 50)}
        {" ..."}
      </p>
    ) : (
      <p className="text-lg font-semibold line-clamp-2 overflow-hidden">
        {title}
      </p>
    )
  ) : (
    <p className="text-lg font-semibold">No title</p>
  );

  return (
    <div>
      {isExpanded ? (
        <p className="text-lg font-semibold" onClick={toggleExpand}>
          {title}{" "}
        </p>
      ) : (
        titleBlock
      )}
    </div>
  );
};

export default Books;
