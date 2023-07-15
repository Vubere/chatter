import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user: string } }
) {
  if (!params) {
    return NextResponse.json({
      status: 403,
      message: "Bad request, missing user id path",
      error: true,
    });
  }
  const { user } = params;

  return NextResponse.json({
    status: 200,
    message: "",
  });
}
