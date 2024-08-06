"use server";

import { fetchBookById } from "@/lib/fetchBook";
import { notFound } from "next/navigation";
import BookDetails from "@/components/BookDetails";

export async function generateMetadata({ params }: any) {
  const { id } = params;

  try {
    const book = await fetchBookById(id);
    console.log(book);
    if (!book) {
      notFound();
    }

    return {
      title: book.volumeInfo.title,
      description: book.volumeInfo.description || "No description available",
    };
  } catch (error) {
    notFound();
  }
}

export default async function Book({ params }: any) {
  const { id } = params;
  const book = await fetchBookById(id);

  if (!book) {
    return <div className="text-center mt-28 h-screen">Loading...</div>;
  }

  return (
    <main className="bg-gray-300">
      <div className="flex justify-center items-center min-h-screen">
        <div className="container mx-auto p-4">
          <BookDetails book={book} />
        </div>
      </div>
    </main>
  );
}
