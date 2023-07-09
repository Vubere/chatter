import { NextResponse } from "next/server";
import UserModel from "../schema";




export async function POST(req: Request) {
  const body = await req.json();
  const { email, password} = body;

  if (!email || !password ) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const user = await UserModel.findOne({email})
    if(user&& user.password === password){
      return NextResponse.json({
        status: 200,
        message: "Login successful",
        error: false,
        user: user
      })
    }else{
      return NextResponse.json({
        status: 500,
        message: "Failed to authenticate user",
        error: true,
      })
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}