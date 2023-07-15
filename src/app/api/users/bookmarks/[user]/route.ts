import { NextResponse } from "next/server";

/* models */
import BlogPostModel from "@/app/api/blogs/schema";
import UserModel from "../../schema";

export default async function GET(
  req: Request,
  { params }: { params: { user: string; limit: number; offset: number } }
) {
  try {
    const { user: id, limit, offset } = params;
    let l = limit || 20;
    let ofs = offset || 0;
    const res = await UserModel.find({ _id: id });
    const user = res[0]._doc;
    const { bookmarks }: { bookmarks: string[] } = user;
    const len = bookmarks.length;
    if (l + ofs > len) {
      return NextResponse.json({
        status: 403,
        message:
          "Bad Request, data only has " +
          bookmarks.length +
          " data sets. Offset, limit or the sum of both exceeds this",
      });
    }
    const data: any[] = [];

    bookmarks.slice(ofs, ofs + l).forEach(async (bm) => {
      data.push((await BlogPostModel.findById(bm))[0]._doc);
    });

    return NextResponse.json({
      status: 200,
      error: false,
      data: data,
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      error: true,
      details: err,
    });
  }
}
