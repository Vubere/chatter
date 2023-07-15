import {NextResponse} from 'next/server'
import BlogPostModel from '../schema'
import UserModel from '../../users/schema'


export async function GET(req:Request,{params}:{params:{blog:string}}){
  const blogDetails = await BlogPostModel.findOne({_id:params.blog})
  if(!blogDetails) return NextResponse.json({status:404,message:"Blog not found"})
  const author = await UserModel.findOne({_id:blogDetails.author})
  
  
  return NextResponse.json({
    status: 200,
    message: "Hello World",
    data: {...blogDetails._doc, author:{
      name: author.name,
      email: author.email,
      _id: author._id,
      profession: author.profession,
      avatar: author.avatar
    }}
  })
}