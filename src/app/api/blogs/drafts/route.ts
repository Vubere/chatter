import UserModel from "../../users/schema";
import BlogPostModel from "../schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");
  try {
    if (id != null) {
      return await getDraft(id);
    } else if (user_id != null) {
      return await getAllUserDrafts(user_id);
    } else {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
        data: "No id or user_id provided",
      });
    }
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
}
async function getDraft(id: string) {
  const res = await BlogPostModel.findById(id);
  if (!res) {
    return NextResponse.json({
      error: true,
      message: "Could not find blog with ID " + id,
      status: 200,
    });
  } else {
    return NextResponse.json({
      blog: res,
      status: 200,
      error: false,
    });
  }
}
async function getAllUserDrafts(user_id: string) {
  let res = await BlogPostModel.find({ state: "draft", author: user_id });
  let author: any = user_id;
  let user = await UserModel.findById(user_id);
  if (user) {
    author = {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      _id: user._id,
      profession: user.profession,
    };
  }
  if (res) {
    res.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    res = res.map((blog) => {
      return {...blog._doc, author}
    });
    return NextResponse.json({
      status: 200,
      error: false,
      blogs: res,
    });
  } else {
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch drafts",
      data: res,
    });
  }
}
