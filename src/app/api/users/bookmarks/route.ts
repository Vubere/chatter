import { NextResponse } from "next/server";


export async function GET() {
  return NextResponse.json({
    status: 400,
    message: "Bad request, failed to pass user id",
    error: true,
  });
}