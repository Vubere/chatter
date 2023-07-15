import {NextResponse} from 'next/server'

/* models */
import BlogPostModel from "@/app/api/blogs/schema"
import UserModel from "../../schema"





export default async function GET(req:Request, {params}:{params:{user:string}}) {
  try{

    const {user:id} = params
    const res = await UserModel.find({_id: id})
    const user = res[0]._doc
    const {bookmarks} = user
    const res2 = await BlogPostModel.where()
    

    const data:any[] = []

    return NextResponse.json({
      status: 200,
      error: false,
      data: data
    })
  }catch(err:any){
    return NextResponse.json({
      status: 500,
      error: true,
      details: err
    })
  }
  


}