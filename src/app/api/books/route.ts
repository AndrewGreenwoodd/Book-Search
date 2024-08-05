import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const key = process.env.GOOGLE_API;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&"key=${key}"&maxResults=40`
    );
    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
