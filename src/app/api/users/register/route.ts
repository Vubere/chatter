import { NextResponse } from "next/server";
import UserModel from "../schema";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await UserModel.create(body);
    if (res) {
      return NextResponse.json({
        status: 200,
        error: false,
        message: "User created successfully",
        user: res,
      });
    } else {
      return NextResponse.json({
        status: 500,
        error: true,
        message: "Failed to create user",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      error: true,
      message: "Internal Server Error",
      err: err,
    });
  }
}
