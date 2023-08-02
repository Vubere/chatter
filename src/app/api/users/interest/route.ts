import UserModel from "../schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await UserModel.updateOne(
      { _id: body._id },
      { interest: body.interest }
    );

    if (res) {
      return NextResponse.json({
        message: "Successfully updated user interest.",
        status: 200,
        error: false,
      });
    } else {
      return NextResponse.json({
        message: "Failed to update user",
        status: 400,
        error: true
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 503,
      error: true,
      details: err
    })
  }
}
