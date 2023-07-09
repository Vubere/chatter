import { NextResponse } from "next/server";
import UserModel from "./schema";

/* GET */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id != null) {
    return await getUser(id);
  } else {
    return await getAllUsers();
  }
}

async function getUser(id: string | number) {
  try {
    const res = await UserModel.findById(id);
    if (!res) {
      return NextResponse.json({
        status: 200,
        error: true,
        message: "Could not find user with ID " + id,
      });
    } else {
      return NextResponse.json({
        status: 200,
        error: false,
        user: res,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      err: err,
    });
  }
}
async function getAllUsers() {
  try {
    const res = await UserModel.find();
    if (!res) {
      return NextResponse.json({
        status: 200,
        error: true,
        message: "Could not find users",
      });
    } else {
      return NextResponse.json({
        status: 200,
        error: false,
        users: res,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      err: err,
    });
  }
}

/* post */
export async function POST(req: Request, { params }: { params: any }) {
  return NextResponse.json(params);
}
