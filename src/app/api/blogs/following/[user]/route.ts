import UserModel from "@/app/api/users/schema";
import BlogPostModel from "../../schema";
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
  try {
    if (typeof user != "string") {
      return NextResponse.json({
        status: 403,
        message: "Bad request, invalid user id",
        error: true,
      });
    } else {
      const userDetails = await UserModel.findOne({ _id: user }).exec();
      if (!userDetails) {
        return NextResponse.json({
          status: 404,
          message: "User not found",
          error: true,
        });
      } else {
        if (userDetails.following.length > 0) {
          const blogs = await BlogPostModel.find({})
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
          } else {
            return NextResponse.json({
              status: 400,
              message: "Failed to fetch blogs",
              error: true,
            });
          }
        } else {
          return NextResponse.json({
            status: 200,
            message: "follow more users to see their blogs",
            blogs: [],
            error: false,
          });
        }
      }
    }
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: "internal server error",

      error: true,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "",
  });
}
