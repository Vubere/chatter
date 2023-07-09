import { NextResponse } from "next/server";
import BlogPostModel from "./schema";

/* GET REQUEST */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")
 
  if (id!=null) {
    return await getBlog(id);
  } else {
    return await getAllBlogs();
  }
}

async function getBlog(userId:string) {
   try {
     const res = await BlogPostModel.findById(userId);
     if (!res) {
       return NextResponse.json({
         error: true,
         message: "Could not find blog with ID " + userId,
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
          blogs: res
        });
      }else{
        return NextResponse.json({
          status: 500,
          message: "Internal Server Error",
          data: res
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
        err: err
      });
    }
}
