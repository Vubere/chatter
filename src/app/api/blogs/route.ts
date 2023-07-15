import { NextResponse } from "next/server";
import BlogPostModel from "./schema";
import UserModel from "../users/schema";
import { ObjectId } from "mongodb";

/* GET REQUEST */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id != null) {
    return await getBlog(id);
  } else {
    return await getAllBlogs();
  }
}

async function getBlog(blogId: string) {
  try {
    const res = await BlogPostModel.findById(blogId);
    if (!res) {
      return NextResponse.json({
        error: true,
        message: "Could not find blog with ID " + blogId,
        status: 200,
      });
    } else {
      return NextResponse.json({
        blog: res,
        status: 200,
        error: false,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
async function getAllBlogs() {
  try {
    const res = await BlogPostModel.find();

    if (res) {
      return NextResponse.json({
        status: 200,
        error: false,
        blogs: res,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
        data: res,
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

export async function POST(req: Request) {
  const res = await req.json();
  const {  title, content, coverImage, author, state, excerpt, tags, method } =
    res;
  if (method == undefined || method == "POST") {
    const blog = new BlogPostModel({
      title,
      content,
      coverImage,
      author,
      state,
      excerpt: excerpt || "",
      tags: tags || [],
      minRead: Math.ceil(content.split(" ").length / 200),
    });
    try {
      await UserModel.findByIdAndUpdate(author, {
        $push: { posts: blog._id },
      });
      const result = await blog.save();
      return NextResponse.json({
        status: 200,
        error: false,
        message: "Blog created successfully",
        data: result,
      });
    } catch (err) {
      return NextResponse.json({
        status: 500,
        error: true,
        message: "Internal Server Error",
        err: err,
      });
    }
  } else if (method == "PUT") {
    const { id } = res;
    try {
      const result = await BlogPostModel.findByIdAndUpdate(id, {
        title,
        content,
        coverImage,
        author,
        state,
        excerpt: excerpt || "",
        tags: tags || [],
        minRead: Math.ceil(content.split(" ").length / 200),
      });
      return NextResponse.json({
        status: 200,
        error: false,
        message: "Blog updated successfully",
        data: result,
      });
    } catch (err) {
      return NextResponse.json({
        status: 500,
        error: true,
        message: "Internal Server Error",
        err: err,
      });
    }
  }else {
    return NextResponse.json({
      status: 400,
      error: true,
      message: "Bad Request",
    });
  }
}
