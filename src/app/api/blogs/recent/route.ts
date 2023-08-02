import { NextResponse } from "next/server";
import BlogPostModel from "../schema";

export async function GET(req: Request) {
  try {
    const blogs = await BlogPostModel.find({ state: "published" })
      .sort({ createdAt: -1 })
      .limit(1000)
      .exec();
    if (blogs) {
      return NextResponse.json({
        status: 200,
        message: "",
        blogs,
        error: false,
      });
    }else{
      return NextResponse.json({
        status: 400,
        message: 'Failed to fetch blogs',
        error: true
      })
    }
  } catch (err: any) {
    return NextResponse.json({
      status: 503,
      message: "Internal server error",
      error: true,
    });
  }
}
