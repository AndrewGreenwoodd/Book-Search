import axios from "axios";
import { Book } from "@/app/types/Book.types";

export const fetchBookById = async (id: string): Promise<Book> => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  return response.data;
};
