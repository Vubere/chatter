import { NextResponse } from "next/server";
import UserModel from "../../../users/schema";
import BlogPostModel from "../../schema";
import { feedT } from "@/types";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const id = params.user_id;
  try {
    if (id) {
      const user = await UserModel.findById(id).exec();
      if (user) {
        const interest = user.interest;
        const blog_array: feedT[] = [];
        for (let i = 0; i < interest.length; i++) {
          const blogs = await BlogPostModel.find({ interest: interest[i] })
            .sort({ createdAt: -1 })
            .limit(50)
            .exec();
          blog_array.concat(blogs);
        }
        if (blog_array.length == 0) {
          const blogs = await BlogPostModel.find({}).exec();
          return NextResponse.json({
            error: false,
            blogs,
            message: "Follow more interest to see personalized feed",
          });
        }

        return NextResponse.json({
          error: false,
          blogs: blog_array,
          status: 200,
          message: "Successfully fetched personalized feed",
        });
      } else {
        return NextResponse.json({
          error: true,
          message: "Could not find user with ID " + id,
          status: 404,
        });
      }
    } else {
      return NextResponse.json({
        error: true,
        message: "Bad request, invalid User Id",
        status: 400,
      });
    }
  } catch (err) {
    return NextResponse.json({
      error: true,
      message: "Internal Server Error",
      status: 500,
    });
  }
}
